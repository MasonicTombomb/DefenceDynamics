import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import logo from "@/assets/LogoSW.png";
import { Link } from "wouter";
import RegionDropdown from "./RegionDropdown";

export default function Navbar() {
  return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          {/* Logo on the far left */}
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="Defense News Logo"
                    className="h-6 w-6"
                />
                <span className="font-bold">Defense News</span>
              </Button>
            </Link>
          </div>

          {/* Centered menu items */}
          <div className="flex-grow flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                  <Link href="/articles">
                    <Button variant="ghost">Articles</Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/timeline">
                    <Button variant="ghost">Timeline</Button>
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
          </div>

          {/* Region dropdown on the far right */}
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <RegionDropdown />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
  );
}
