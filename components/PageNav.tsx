import Link from "next/link";
import { Logo, Button } from "@/components/ds";
import { GetInTouchLink } from "@/components/GetInTouchLink";
import { Monogram } from "@/components/Monogram";
import { SiteMenu } from "@/components/SiteMenu";
import { WIDTH_PX, type LayoutWidth } from "@/lib/layout";

interface PageNavProps {
  variant?: "white" | "blue";
  /** Max width of the nav row. Match the page content's width to line up edges. */
  width?: LayoutWidth;
  /** The shared menu. Off on pages that are sent to clients, like the shared CV. */
  menu?: boolean;
}

// The nav row is one height (48 px on a phone, 56 px from md) so the open menu's
// header can copy it: the close button then sits exactly where the menu button was.
const ROW_HEIGHT = "h-[48px] md:h-[56px]";

export function PageNav({
  variant = "white",
  width = "default",
  menu = true,
}: PageNavProps) {
  const isBlue = variant === "blue";
  const logoColor = isBlue ? "white" : "blue";
  const rowStyle = { maxWidth: `${WIDTH_PX[width]}px` };
  return (
    <nav
      className={`px-6 md:px-12 py-5 ${
        isBlue ? "cursor-white bg-[var(--color-business-blue)]" : "bg-white"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between ${ROW_HEIGHT}`}
        style={rowStyle}
      >
        <Link href="/" className="flex items-center">
          {/* Below 340 px the row is too tight for the wordmark: the M takes its place. */}
          <span className="leading-[0] min-[340px]:hidden">
            <Monogram color={logoColor} />
          </span>
          {/* The wordmark's letters sit about 10 % inside its box; pull it out by that much. */}
          <span className="-ml-[9.5px] leading-[0] max-[339px]:hidden md:hidden">
            <Logo
              variant="wordmark"
              color={logoColor}
              height={44}
              aria-label="Manfred home"
            />
          </span>
          <span className="leading-[0] max-md:hidden md:-ml-[12px]">
            <Logo
              variant="wordmark"
              color={logoColor}
              height={56}
              aria-label="Manfred home"
            />
          </span>
        </Link>
        <div className="flex items-center gap-3 md:gap-4">
          <Button variant={isBlue ? "inverse" : "brand"} size="sm" asChild>
            <GetInTouchLink location="nav" />
          </Button>
          {menu && (
            <SiteMenu
              tone={isBlue ? "white" : "blue"}
              headerClassName="px-6 py-5 md:px-12"
              headerInnerClassName={`mx-auto w-full ${ROW_HEIGHT}`}
              headerInnerStyle={rowStyle}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
