import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "wouter";
import RegionDropdown from "./RegionDropdown";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold">Defense News</span>
          </Button>
        </Link>

        <NavigationMenu className="ml-6">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/articles">
                <Button variant="ghost">Articles</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <RegionDropdown />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}