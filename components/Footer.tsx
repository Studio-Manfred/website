import { Logo, Typography } from "@/components/ds";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border-default)] py-14 px-6 md:px-12">
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--size-container-2xl)" }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <Logo variant="wordmark" color="blue" height={22} />
            <Typography variant="bodySmall" color="muted" as="p" className="mt-4 leading-relaxed">
              Studio Manfred AB<br />
              Stockholm, Sweden<br />
              Org. nr 559419-6171
            </Typography>
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="label" color="muted" as="p" className="uppercase tracking-wide mb-1">
              Contact
            </Typography>
            <a href="mailto:hello@studiomanfred.com" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              hello@studiomanfred.com
            </a>
            <a href="tel:+46793362910" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              079 — 336 29 10
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="label" color="muted" as="p" className="uppercase tracking-wide mb-1">
              Part of SeventyOne Group
            </Typography>
            <Typography variant="bodySmall" color="muted" as="span">SeventyOne Consulting</Typography>
            <Typography variant="bodySmall" color="muted" as="span">Mather Studio</Typography>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border-default)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Typography variant="caption" color="muted">
            © {new Date().getFullYear()} Studio Manfred AB. All rights reserved.
          </Typography>
          <a href="/privacy" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
