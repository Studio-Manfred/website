import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// Fetches the page to evaluate. The address comes from the person using the
// tool, so the server must not be talked into fetching its own network:
// only http(s) on the standard ports, no credentials, no private or local
// addresses (checked after DNS and again on every redirect), a time limit and
// a size limit. A DNS answer that changes between the check and the fetch is
// not covered; acceptable for an unlisted prototype.

export const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 8000;

export class FetchPageError extends Error {}

function v4ToInt(ip: string): number {
  return ip.split(".").reduce((n, part) => (n << 8) + Number(part), 0) >>> 0;
}

const V4_BLOCKED: [string, number][] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

export function isPrivateIp(ip: string): boolean {
  if (isIP(ip) === 4) {
    const n = v4ToInt(ip);
    return V4_BLOCKED.some(([base, bits]) => {
      const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
      return (n & mask) === (v4ToInt(base) & mask);
    });
  }
  if (isIP(ip) === 6) {
    const v6 = ip.toLowerCase();
    const mapped = v6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIp(mapped[1]);
    return v6 === "::" || v6 === "::1" || /^f[cd]/.test(v6) || /^fe[89ab]/.test(v6) || v6.startsWith("ff");
  }
  return true;
}

/** The address as a URL if it is one we may fetch, else an error saying why. */
export function parseTarget(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new FetchPageError("That is not a web address.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new FetchPageError("Only http and https addresses work.");
  if (url.username || url.password) throw new FetchPageError("Addresses with a user name or password are not allowed.");
  if (url.port && url.port !== "80" && url.port !== "443") throw new FetchPageError("Only the standard web ports work.");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new FetchPageError("Local addresses are not allowed.");
  }
  if (isIP(host) && isPrivateIp(host)) throw new FetchPageError("Private addresses are not allowed.");
  return url;
}

type Resolver = (host: string) => Promise<string[]>;
const resolveAll: Resolver = async (host) => (await lookup(host, { all: true })).map((a) => a.address);

async function assertPublic(url: URL, resolve: Resolver) {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const ips = isIP(host) ? [host] : await resolve(host).catch(() => {
    throw new FetchPageError("The address could not be found.");
  });
  if (ips.length === 0 || ips.some(isPrivateIp)) throw new FetchPageError("That address points to a private network.");
}

export type FetchedPage = { url: string; html: string };

export async function fetchPage(raw: string, opts: { fetchImpl?: typeof fetch; resolve?: Resolver } = {}): Promise<FetchedPage> {
  const doFetch = opts.fetchImpl ?? fetch;
  const resolve = opts.resolve ?? resolveAll;
  let url = parseTarget(raw);

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublic(url, resolve);
    let res: Response;
    try {
      res = await doFetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": "StudioManfredEvaluation/0.1 (+https://studiomanfred.com)", accept: "text/html" },
      });
    } catch {
      throw new FetchPageError("The page did not answer in time.");
    }
    if (res.status >= 300 && res.status < 400) {
      const next = res.headers.get("location");
      if (!next) throw new FetchPageError("The page redirected without saying where.");
      url = parseTarget(new URL(next, url).toString());
      continue;
    }
    if (!res.ok) throw new FetchPageError(`The page answered with status ${res.status}.`);
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("text/html")) throw new FetchPageError("That address is not a web page.");
    return { url: url.toString(), html: await readCapped(res) };
  }
  throw new FetchPageError("Too many redirects.");
}

async function readCapped(res: Response): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (size < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.byteLength;
  }
  await reader.cancel().catch(() => {});
  const all = new Uint8Array(Math.min(size, MAX_BYTES));
  let at = 0;
  for (const c of chunks) {
    const part = c.subarray(0, Math.min(c.byteLength, all.length - at));
    all.set(part, at);
    at += part.byteLength;
    if (at >= all.length) break;
  }
  return new TextDecoder().decode(all);
}
