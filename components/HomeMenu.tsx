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
          className="fixed top-[12px] z-40 flex h-[48px] w-[48px] items-center justify-center rounded-full text-white md:top-[36.5px] md:h-[56px] md:w-[56px]"
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
          <Link href="/" onClick={goToTop} className="flex items-center">
            <span className="leading-[0] md:hidden">
              <Logo variant="wordmark" color="white" height={44} aria-label="Manfred home" />
            </span>
            <span className="leading-[0] max-md:hidden">
              <Logo variant="wordmark" color="white" height={73} aria-label="Manfred home" />
            </span>
          </Link>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close menu"
              className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white text-[var(--color-business-blue)] md:h-[56px] md:w-[56px]"
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
                  className="flex items-center justify-between py-[20px] text-white md:py-[clamp(12px,2.2vh,36px)]"
                >
                  <span className="flex flex-col gap-[6px] md:gap-[12px]">
                    <span
                      className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                      style={{ fontSize: fontSize.menuLink }}
                    >
                      {title}
                    </span>
                    <span className="text-[15px] font-light text-[var(--color-text-on-brand-muted)] md:text-[20px]">
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
          className="mt-auto flex items-center justify-between gap-[20px] pb-[40px] pt-[24px] max-md:flex-col md:pb-[clamp(24px,4vh,100px)] md:pt-[clamp(16px,2.7vh,48px)]"
          style={{ paddingInline: menuGutter }}
        >
          <Button variant="inverse" size="lg" asChild className="max-md:w-full">
            <GetInTouchLink location="menu" />
          </Button>
          <div className="flex flex-col gap-1 text-white max-md:items-center md:items-end">
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
