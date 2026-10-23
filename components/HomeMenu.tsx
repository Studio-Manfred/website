"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Icon,
  Logo,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ds";
import { GetInTouchLink } from "@/components/GetInTouchLink";
import { contact } from "@/lib/contact";
import { menuGutter } from "@/lib/menu-layout";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";
import { fontSize } from "@/lib/typography";

const links = [
  { title: "Home", href: "/", line: "Back to the top." },
  { title: "Writing", href: "/writing", line: "Texts and thoughts from the team." },
  {
    title: "Training & Courses",
    href: "/training-and-courses",
    line: "Training and courses we offer.",
  },
  { title: "Cases", href: "/cases", line: "Projects we are proud of." },
];

export function HomeMenu() {
  const [open, setOpen] = useState(false);

  // Next's Link prevents the default click on a client-side navigation, and
  // Radix's SheetClose skips prevented clicks. So the panel closes from our
  // own state, not from SheetClose, on every link.
  const close = () => setOpen(false);
  const goToTop = () => {
    close();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="fixed top-3 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white md:top-[36.5px] md:h-14 md:w-14"
          style={{ right: menuGutter }}
        >
          <Icon name="menu" size="lg" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        aria-describedby={undefined}
        className="inset-0 h-dvh w-screen max-w-none gap-0 overflow-y-auto border-0 bg-[var(--color-business-blue)] p-0 shadow-none"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div
          className="flex h-[72px] shrink-0 items-center justify-between md:h-[129px]"
          style={{ paddingInline: menuGutter }}
        >
          <Link href="/" onClick={goToTop}>
            <Logo variant="wordmark" color="white" height={44} aria-label="Manfred home" />
          </Link>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--color-business-blue)] md:h-14 md:w-14"
            >
              <Icon name="x" size="lg" />
            </button>
          </SheetClose>
        </div>
        <nav aria-label="Primary" style={{ paddingInline: menuGutter }}>
          <ul>
            {links.map(({ title, href, line }) => (
              <li key={href} className="border-b border-white/20">
                <Link
                  href={href}
                  onClick={href === "/" ? goToTop : close}
                  className="flex items-center justify-between py-5 text-white md:py-9"
                >
                  <span className="flex flex-col gap-1.5 md:gap-3">
                    <span
                      className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                      style={{ fontSize: fontSize.menuLink }}
                    >
                      {title}
                    </span>
                    <span className="text-[15px] font-light text-[var(--color-text-on-brand-muted)] md:text-xl">
                      {line}
                    </span>
                  </span>
                  <Icon name="arrow-right" size="lg" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="mt-auto flex flex-col items-center gap-5 pb-10 pt-6 md:flex-row md:justify-between md:pb-[100px] md:pt-12"
          style={{ paddingInline: menuGutter }}
        >
          <Button variant="inverse" size="lg" asChild className="w-full md:w-auto">
            <GetInTouchLink location="menu" />
          </Button>
          <div className="flex flex-col items-center gap-1 text-white md:items-end">
            <a href={`mailto:${contact.email}`} className="font-bold">
              {contact.email}
            </a>
            <span className="font-light text-[var(--color-text-on-brand-muted)]">
              {contact.phone}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
