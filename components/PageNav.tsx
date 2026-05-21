import Link from "next/link";
import { Logo, Button } from "@/components/ds";
import { GetInTouchLink } from "@/components/GetInTouchLink";

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
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "960px" }}>
        <Link href="/">
          <Logo variant="wordmark" color={isBlue ? "white" : "blue"} height={56} />
        </Link>
        {isBlue ? (
          <Button variant="inverse" size="sm" asChild>
            <GetInTouchLink location="nav" />
          </Button>
        ) : (
          <Button variant="brand" size="sm" asChild>
            <GetInTouchLink location="nav" />
          </Button>
        )}
      </div>
    </nav>
  );
}
