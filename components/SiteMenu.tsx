"use client";

import { useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Icon,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ds";
import { GetInTouchLink } from "@/components/GetInTouchLink";
import { contact } from "@/lib/contact";
import { menuGutter } from "@/lib/menu-layout";
import { fontSize } from "@/lib/typography";

const links = [
  { title: "Home", href: "/", line: "Back to start." },
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
  { title: "Cases", href: "/cases", line: "Work we're proud of. Mostly." },
];

interface SiteMenuProps {
  /** Colour of the menu button: white on a blue page, blue on a white page. The panel is always blue. */
  tone?: "white" | "blue";
  /** Where the page puts the menu button, for example absolute in the hero or in the nav row. */
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  /** The panel header must have the page's nav geometry, so the close button sits where the menu button was. */
  headerClassName?: string;
  headerStyle?: CSSProperties;
}

const ring =
  "flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border-2 md:h-[56px] md:w-[56px]";
const toneClass = {
  white: "border-white text-white",
  blue: "border-[var(--color-business-blue)] text-[var(--color-business-blue)]",
};

export function SiteMenu({
  tone = "white",
  triggerClassName = "",
  triggerStyle,
  headerClassName = "",
  headerStyle,
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // The link to the page you are on is not shown. An article (/writing/x) is
  // not the list, so Writing stays.
  const visibleLinks = links.filter(({ href }) => href !== pathname);

  // Next's Link prevents the default click on a client-side navigation, and
  // Radix's SheetClose skips prevented clicks. So the panel closes from our
  // own state, not from SheetClose, on every link.
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={`${ring} ${toneClass[tone]} ${triggerClassName}`}
          style={triggerStyle}
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
          className={`flex shrink-0 items-center justify-end ${headerClassName}`}
          style={headerStyle}
        >
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close menu"
              className={`${ring} ${toneClass.white}`}
            >
              <Icon name="x" size="lg" />
            </button>
          </SheetClose>
        </div>
        <nav aria-label="Primary">
          <ul>
            {visibleLinks.map(({ title, href, line }) => (
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
