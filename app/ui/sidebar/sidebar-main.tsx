"use client";

import React from "react";
import {
  Avatar,
  Button,
  ScrollShadow,
  Spacer,
  Input,
  Link,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { AcmeIcon } from "@/icons/social";
import { sectionLongList } from "./sidebar-items";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import NotificationMenu from "../NotificationMenu";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function SidebarMain() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1];
  return (
    <div className="">
      <div className="relative flex h-full w-60 flex-1 flex-col border-r-small border-divider p-3 ">
        <ScrollShadow className="-mr-6  py-6 pr-6 ">
          <Sidebar
            defaultSelectedKey="home"
            items={sectionLongList}
            selectedKeys={[currentPath]}
          />
          {/* <NotificationMenu /> */}
        </ScrollShadow>
        <div className="mt-[45vh] flex flex-col ">
          <Button
            fullWidth
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon
                className="text-default-500"
                icon="solar:info-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
          >
            Help & Information
          </Button>
          <Button
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
            as={Link}
            href="/api/auth/logout"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
