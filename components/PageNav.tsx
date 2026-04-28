import Link from "next/link";
import { Logo, Button } from "@/components/ds";

export function PageNav() {
  return (
    <nav className="bg-white border-b border-[var(--color-border-default)] px-6 md:px-12 py-5">
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "960px" }}>
        <Link href="/">
          <Logo variant="wordmark" color="blue" height={36} />
        </Link>
        <Button variant="brand" size="sm" asChild>
          <a href="mailto:hello@studiomanfred.com">Get in touch</a>
        </Button>
      </div>
    </nav>
  );
}
