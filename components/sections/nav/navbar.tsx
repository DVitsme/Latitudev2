import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

type NavigationItem = {
  title: string;
  href: string;
};

const Navbar = () => {
  const navigationData: NavigationItem[] = [
    {
      title: "About",
      href: "/#about",
    },
    {
      title: "Postions",
      href: "/jobs",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6">
        <Link href="/">
          <Image
            src="/images/logos/logo-light.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>

        <div className="text-muted-foreground flex items-center gap-6 font-medium max-md:hidden">
          {navigationData.map((item, index) => (
            <Link key={index} href={item.href} className="hover:text-primary">
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          
            <Link href="/getting-started" className="border-b-2 border-primary hover:border-secondary max-md:hidden">Get Started</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden" asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {navigationData.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="bg-transparent!">
                  <Button className="grow" asChild>
                    <Link href="/getting-started">Get Started</Link>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
