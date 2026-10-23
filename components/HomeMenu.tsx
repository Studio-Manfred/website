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
  {
    title: "Writing",
    href: "/writing",
    line: "Thoughts from the messy middle.",
  },
  {
    title: "Training & Courses",
    href: "/training-and-courses",
    line: "Steal our tricks. We won't mind.",
  },
];

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

// Two sizes, one shown at a time. The line-box reset keeps the wordmark at the
// vertical centre of the panel header.
function MenuWordmark() {
  return (
    <>
      <span className="leading-[0] md:hidden">
        <Logo
          variant="wordmark"
          color="white"
          height={44}
          aria-label="Manfred home"
        />
      </span>
      <span className="leading-[0] max-md:hidden">
        <Logo
          variant="wordmark"
          color="white"
          height={60}
          aria-label="Manfred home"
        />
      </span>
    </>
  );
}

export function HomeMenu() {
  const [open, setOpen] = useState(false);

  // Next's Link prevents the default click on a client-side navigation, and
  // Radix's SheetClose skips prevented clicks. So the panel closes from our
  // own state, not from SheetClose, on every link.
  const close = () => setOpen(false);
  const goToTop = () => {
    close();
    scrollToTop();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="absolute top-[12px] z-40 flex h-[48px] w-[48px] items-center justify-center rounded-full text-white md:top-[24px] md:h-[56px] md:w-[56px]"
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
          className="flex h-[72px] shrink-0 items-center justify-between md:h-[104px]"
          style={{ paddingInline: menuGutter }}
        >
          <Link href="/" onClick={goToTop} className="flex items-center">
            <MenuWordmark />
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
        <nav aria-label="Primary">
          <ul>
            {links.map(({ title, href, line }) => (
              <li key={href} className="relative">
                <Link
                  href={href}
                  onClick={close}
                  className="menu-row group flex items-center justify-between py-[20px] text-white hover:bg-white hover:text-[var(--color-business-blue)] focus-visible:bg-white focus-visible:text-[var(--color-business-blue)] active:bg-white active:text-[var(--color-business-blue)] motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out md:py-[clamp(12px,2.2vh,36px)]"
                  style={{ paddingInline: menuGutter }}
                >
                  <span className="flex flex-col gap-[6px] md:gap-[10px]">
                    <span
                      className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                      style={{ fontSize: fontSize.menuLink }}
                    >
                      {title}
                    </span>
                    <span className="text-[15px] font-light text-[var(--color-text-on-brand-muted)] group-hover:text-[var(--color-text-on-white-muted)] group-focus-visible:text-[var(--color-text-on-white-muted)] group-active:text-[var(--color-text-on-white-muted)] motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out md:text-[18px]">
                      {line}
                    </span>
                  </span>
                  <span className="flex group-hover:translate-x-[8px] group-focus-visible:translate-x-[8px] motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out">
                    <Icon name="arrow-right" size="lg" />
                  </span>
                </Link>
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 h-px bg-white/20"
                  style={{ left: menuGutter, right: menuGutter }}
                />
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
