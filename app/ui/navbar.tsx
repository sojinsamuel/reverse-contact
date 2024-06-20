"use client";
// import { useUser } from "@auth0/nextjs-auth0/client";
import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import type { NavbarProps } from "@nextui-org/react";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";

import { AcmeIcon } from "@/icons/social";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import NotificationMenu from "./NotificationMenu";
const menuItems = ["Home", "Features", "Customers", "About Us", "Integrations"];

export default function NavigationBar(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // const { user, isLoading, error } = useUser();
  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1];
  // console.log("currentPath", currentPath);
  const home = currentPath === "";
  const { isLoaded, isSignedIn, user } = useUser();

  // if (!home) {
  //   return null;
  // }

  return (
    <Navbar
      {...props}
      isBordered
      classNames={{
        base: cn("border-default-100", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center bg-transparent",
        item: "hidden md:flex",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* <NavbarMenuToggle className="text-default-400 md:hidden" /> */}

      <NavbarBrand>
        <div className="rounded-full bg-blue-400 text-background">
          <AcmeIcon size={34} />
        </div>
        <span className="ml-2 font-medium">Reverse Contact</span>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="ml-2 !flex gap-2">
          <div className="flex items-baseline justify-start">
            <SignedIn>
              <Button
                className="hidden border-small border-primary-500/20 bg-primary-500/10 text-black-800 sm:flex mr-2"
                color="secondary"
                radius="full"
                style={{
                  boxShadow: "inset 0 0 4px #bf97ff70",
                }}
                variant="flat"
                href="/dashboard"
                as={Link}
              >
                Dashboard
              </Button>

              <SignOutButton redirectUrl="/sign-in">
                <Button
                  className="bg-default-100 text-default-700 sm:bg-transparent sm:text-default-500 mr-2"
                  radius="full"
                  variant="light"
                  as={Link}
                >
                  Logout
                </Button>
              </SignOutButton>

              <NotificationMenu />
            </SignedIn>
          </div>
          <SignedOut>
            <Button
              className="bg-default-100 text-default-700 sm:bg-transparent sm:text-default-500"
              radius="full"
              variant="light"
              as={Link}
              href="/sign-in"
            >
              Login
            </Button>
            <Button
              className="hidden border-small border-primary-500/20 bg-primary-500/10 text-black-800 sm:flex"
              color="secondary"
              radius="full"
              style={{
                boxShadow: "inset 0 0 4px #bf97ff70",
              }}
              variant="flat"
              as={Link}
              href="/sign-up"
            >
              Sign up
            </Button>
          </SignedOut>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
