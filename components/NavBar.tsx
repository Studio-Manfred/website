import { Button } from "@/components/ds";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-business-blue)] border-b border-white/20">
      <div
        className="mx-auto px-6 md:px-12 h-16 flex items-center justify-end"
        style={{ maxWidth: "var(--size-container-2xl)" }}
      >
        <Button variant="inverse" size="sm" asChild>
          <a href="mailto:hello@studiomanfred.com">Get in touch</a>
        </Button>
      </div>
    </header>
  );
}
