"use client";

import Link from "next/link";
import {
  Icon,
  Logo,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ds";
import { menuGutter } from "@/lib/menu-layout";
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
  return (
    <Sheet>
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
          <SheetClose asChild>
            <Link href="/">
              <Logo variant="wordmark" color="white" height={44} aria-label="Manfred home" />
            </Link>
          </SheetClose>
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
      </SheetContent>
    </Sheet>
  );
}
