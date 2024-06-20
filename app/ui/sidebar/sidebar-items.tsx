import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { type SidebarItem, SidebarItemType } from "./sidebar";
import TeamAvatar from "./team-avatar";
import NotificationMenu from "../NotificationMenu";

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */

export const sectionLongList: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "dashboard",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "phonevalidate",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Phone Validate",
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "chatbot",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Chatbot",
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      //   {
      //     key: "team",
      //     href: "#",
      //     icon: "solar:users-group-two-rounded-outline",
      //     title: "Team",
      //   },
      //   {
      //     key: "tracker",
      //     href: "#",
      //     icon: "solar:sort-by-time-linear",
      //     title: "Tracker",
      //     endContent: (
      //       <Chip size="sm" variant="flat">
      //         Beta
      //       </Chip>
      //     ),
      //   },
    ],
  },
];
