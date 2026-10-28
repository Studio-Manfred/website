// The evaluation service has no login and is open at /evaluation. Each run
// costs an AI call, so the API only answers requests sent from the site's own
// page: the browser's Origin header must match the host it was sent to. This
// stops other sites from using it and keeps out casual bots; it is no defence
// against someone who writes their own client, which is fine for a prototype.

export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
