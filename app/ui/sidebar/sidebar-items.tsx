import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { type SidebarItem, SidebarItemType } from "./sidebar";
import TeamAvatar from "./team-avatar";
import NotificationMenu from "../NotificationMenu";

export const sectionLongList: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "chatbot",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Chatbot",
      },
    ],
  },
];
