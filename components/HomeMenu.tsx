import { SiteMenu } from "@/components/SiteMenu";
import { menuGutter } from "@/lib/menu-layout";

// The home page has no nav row, so the menu button sits absolute at the top
// right of the hero and scrolls away with the page (no sticky bar).
export function HomeMenu() {
  return (
    <SiteMenu
      tone="white"
      triggerClassName="absolute top-[12px] z-40 md:top-[24px]"
      triggerStyle={{ right: menuGutter }}
      headerClassName="h-[72px] md:h-[104px]"
      headerStyle={{ paddingInline: menuGutter }}
    />
  );
}
