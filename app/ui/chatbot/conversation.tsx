import React from "react";

import MessageCard from "./message-card";
import type { UIState } from "@/app/actions";

interface MessagesI {
  messages: UIState;
}

export default function Conversation({ messages }: { messages: UIState }) {
  if (messages?.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 px-1">
      {messages.map(({ role, display }, index) => (
        <MessageCard
          key={index}
          avatar={
            role === "assistant"
              ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
          }
          message={JSON.stringify(display)}
          messageClassName={
            role === "user" ? "bg-content3 text-content3-foreground" : ""
          }
        >
          {display}
        </MessageCard>
      ))}
    </div>
  );
}
