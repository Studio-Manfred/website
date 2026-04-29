import Link from "next/link";
import { Logo, Button } from "@/components/ds";

interface PageNavProps {
  variant?: "white" | "blue";
}

export function PageNav({ variant = "white" }: PageNavProps) {
  const isBlue = variant === "blue";
  return (
    <nav
      className={`px-6 md:px-12 py-5 ${
        isBlue
          ? "cursor-white bg-[var(--color-business-blue)]"
          : "bg-white border-b border-[var(--color-border-default)]"
      }`}
    >
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "960px" }}>
        <Link href="/">
          <Logo variant="wordmark" color={isBlue ? "white" : "blue"} height={36} />
        </Link>
        {isBlue ? (
          <Button variant="inverse" size="lg" asChild>
            <a href="mailto:hello@studiomanfred.com">Get in touch</a>
          </Button>
        ) : (
          <Button variant="brand" size="sm" asChild>
            <a href="mailto:hello@studiomanfred.com">Get in touch</a>
          </Button>
        )}
      </div>
    </nav>
  );
}
