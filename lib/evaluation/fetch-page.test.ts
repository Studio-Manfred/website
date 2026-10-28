import { describe, expect, it } from "vitest";
import { FetchPageError, MAX_BYTES, PageUnreachableError, fetchPage, isPrivateIp, parseTarget } from "./fetch-page";

const publicDns = async () => ["93.184.216.34"];
const html = (body: string, init: ResponseInit = {}) =>
  new Response(body, { status: 200, headers: { "content-type": "text/html; charset=utf-8" }, ...init });

describe("isPrivateIp", () => {
  it("blocks loopback, private, link-local and metadata addresses", () => {
    for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.169.254", "0.0.0.0", "100.64.0.1", "::1", "fc00::1", "fe80::1", "::ffff:127.0.0.1"]) {
      expect(isPrivateIp(ip), ip).toBe(true);
    }
  });
  it("lets public addresses through", () => {
    for (const ip of ["93.184.216.34", "172.32.0.1", "8.8.8.8", "2606:4700::1111"]) expect(isPrivateIp(ip), ip).toBe(false);
  });
  it("treats anything that isn't an IP as blocked", () => {
    expect(isPrivateIp("example.com")).toBe(true);
  });
});

describe("parseTarget", () => {
  it("accepts http and https on standard ports", () => {
    expect(parseTarget("https://example.com/page").hostname).toBe("example.com");
    expect(parseTarget(" http://example.com:80/ ").hostname).toBe("example.com");
  });
  it("refuses other schemes, credentials, odd ports, local names and private IPs", () => {
    for (const raw of ["ftp://example.com", "file:///etc/passwd", "javascript:alert(1)", "https://user:pw@example.com", "https://example.com:8080", "http://localhost", "http://app.localhost", "http://127.0.0.1", "http://[::1]/", "http://169.254.169.254/latest", "not a url"]) {
      expect(() => parseTarget(raw), raw).toThrow(FetchPageError);
    }
  });
});

describe("fetchPage", () => {
  it("returns the page's html", async () => {
    const page = await fetchPage("https://example.com", { resolve: publicDns, fetchImpl: async () => html("<h1>Hi</h1>") });
    expect(page).toEqual({ url: "https://example.com/", html: "<h1>Hi</h1>" });
  });

  it("refuses a name that resolves to a private address", async () => {
    await expect(fetchPage("https://intranet.example.com", { resolve: async () => ["10.0.0.5"], fetchImpl: async () => html("x") })).rejects.toThrow(/private network/);
  });

  it("checks every redirect, and refuses one into a private network", async () => {
    const fetchImpl = async () => new Response(null, { status: 302, headers: { location: "http://127.0.0.1/admin" } });
    await expect(fetchPage("https://example.com", { resolve: publicDns, fetchImpl })).rejects.toThrow(FetchPageError);
  });

  it("follows a public redirect", async () => {
    let calls = 0;
    const fetchImpl = async () => (calls++ === 0 ? new Response(null, { status: 301, headers: { location: "/new" } }) : html("moved"));
    const page = await fetchPage("https://example.com/old", { resolve: publicDns, fetchImpl });
    expect(page.url).toBe("https://example.com/new");
  });

  it("stops after too many redirects", async () => {
    const fetchImpl = async () => new Response(null, { status: 302, headers: { location: "/again" } });
    await expect(fetchPage("https://example.com", { resolve: publicDns, fetchImpl })).rejects.toThrow(/Too many redirects/);
  });

  it("refuses non-html and error answers", async () => {
    await expect(fetchPage("https://example.com", { resolve: publicDns, fetchImpl: async () => new Response("{}", { headers: { "content-type": "application/json" } }) })).rejects.toThrow(/not a web page/);
    await expect(fetchPage("https://example.com", { resolve: publicDns, fetchImpl: async () => html("no", { status: 404 }) })).rejects.toThrow(/404/);
  });

  it("cuts a huge page at the size limit", async () => {
    const page = await fetchPage("https://example.com", { resolve: publicDns, fetchImpl: async () => html("a".repeat(MAX_BYTES + 5000)) });
    expect(page.html.length).toBe(MAX_BYTES);
  });

  it("says so when the name can't be found", async () => {
    await expect(fetchPage("https://nowhere.example", { resolve: async () => { throw new Error("ENOTFOUND"); }, fetchImpl: async () => html("x") })).rejects.toThrow(/could not be found/);
  });

  it("tells a slow page from one that can't be reached, and both are unreachable", async () => {
    const timeout = async () => { throw new DOMException("timed out", "TimeoutError"); };
    const slow = fetchPage("https://slow.example", { resolve: publicDns, fetchImpl: timeout });
    await expect(slow).rejects.toThrow(/did not answer within 20 seconds/);
    await expect(slow).rejects.toBeInstanceOf(PageUnreachableError);
    const refused = fetchPage("https://down.example", { resolve: publicDns, fetchImpl: async () => { throw new TypeError("fetch failed"); } });
    await expect(refused).rejects.toThrow(/could not connect/);
    await expect(refused).rejects.toBeInstanceOf(PageUnreachableError);
  });

  it("names itself honestly to the site", async () => {
    let ua = "";
    await fetchPage("https://example.com", { resolve: publicDns, fetchImpl: async (_u, init) => { ua = new Headers(init?.headers).get("user-agent") ?? ""; return html("<h1>x</h1>"); } });
    expect(ua).toMatch(/^Mozilla\/5\.0 \(compatible; StudioManfredEvaluation/);
  });
});
