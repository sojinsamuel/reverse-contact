"use client";

import React, { useEffect } from "react";
import { Avatar, Badge } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/cn";

export type MessageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string;
  message?: string;
  messageClassName?: string;
  onMessageCopy?: (content: string | string[]) => void;
  children?: React.ReactNode;
};

const MessageCard = React.forwardRef<HTMLDivElement, MessageCardProps>(
  (
    {
      avatar,
      message,
      onMessageCopy,
      className,
      messageClassName,
      children,
      ...props
    },
    ref
  ) => {
    const messageRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (messageRef.current) {
        messageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, [message]);

    return (
      <div {...props} ref={ref} className={cn("flex gap-3", className)}>
        <div className="relative flex-none">
          <Avatar src={avatar} />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div
            className={cn(
              "relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600",
              messageClassName
            )}
          >
            <div ref={messageRef} className={"pr-20 text-small "}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default MessageCard;

MessageCard.displayName = "MessageCard";
