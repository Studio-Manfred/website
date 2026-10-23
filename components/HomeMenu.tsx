"use client";

import Link from "next/link";
import {
  Icon,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ds";
import { menuGutter } from "@/lib/menu-layout";
import { fontSize } from "@/lib/typography";

const links = [
  { title: "Home", href: "/" },
  { title: "Writing", href: "/writing" },
  { title: "Training & Courses", href: "/training-and-courses" },
  { title: "Cases", href: "/cases" },
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
        <nav aria-label="Primary" style={{ paddingInline: menuGutter }}>
          <ul>
            {links.map(({ title, href }) => (
              <li key={href} className="border-b border-white/20">
                <Link
                  href={href}
                  className="flex items-center justify-between py-5 text-white md:py-9"
                >
                  <span
                    className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                    style={{ fontSize: fontSize.menuLink }}
                  >
                    {title}
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
