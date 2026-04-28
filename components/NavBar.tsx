import { Logo, Button } from "@/components/ds";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-business-blue)] border-b border-white/20">
      <div
        className="mx-auto px-6 md:px-12 h-16 flex items-center justify-between"
        style={{ maxWidth: "var(--size-container-2xl)" }}
      >
        <a href="/" aria-label="Studio Manfred — home">
          <Logo variant="wordmark" color="white" height={26} />
        </a>
        <Button variant="inverse" size="sm" asChild>
          <a href="mailto:hello@studiomanfred.com">Get in touch</a>
        </Button>
      </div>
    </header>
  );
}
