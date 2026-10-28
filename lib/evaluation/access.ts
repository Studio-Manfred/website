import { timingSafeEqual } from "node:crypto";

// The evaluation service has no login. It lives at an unlisted address,
// /evaluation/<token>, where the token is only in the EVAL_LINK_TOKEN
// environment variable (the repo is public, so it can't be in the code).
// Without the variable, every address is a 404.

export const MIN_TOKEN_LENGTH = 16;

export function isEvalToken(candidate: string | null | undefined, secret = process.env.EVAL_LINK_TOKEN): boolean {
  if (!secret || secret.length < MIN_TOKEN_LENGTH || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}
