"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GlassSurface from "./GlassSurface";
import "./GlassSurface.css";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

export type CustomHHeaderNavItem = { label: string; href: string };

export type CustomHHeaderProps = {
  items: CustomHHeaderNavItem[];
  glassProps?: React.ComponentProps<typeof GlassSurface>;
};

export const CustomHHeader = ({ items, glassProps }: CustomHHeaderProps) => {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 flex w-full justify-center py-4"
      data-slot="custom-header"
    >
      <div className="flex w-full justify-center px-2">
        <GlassSurface {...glassProps}>
          <NavigationMenu viewport={false} className="flex justify-center">
            <NavigationMenuList className="flex flex-row items-center justify-center gap-2">
              {items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <NavigationMenuItem key={item.href}>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className={cn(
                        "h-10 w-auto rounded-full border-black bg-transparent px-4 text-sm text-black shadow-none hover:bg-black/5 hover:text-black active:bg-black/10 sm:h-12 sm:px-8 sm:text-base",
                        "dark:border-white dark:text-white dark:hover:bg-white/10 dark:hover:text-white dark:active:bg-white/20",
                        isActive && "bg-black/10 dark:bg-white/20"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </GlassSurface>
      </div>
    </header>
  );
};
