"use client";

import React, { useEffect, useRef } from "react";
import { ScrollShadow } from "@nextui-org/react";

import Conversation from "./conversation";
import PromptBox from "./prompt-box";
import { useUIState } from "ai/rsc";
import { AI } from "@/app/actions";

export default function ChatbotMain() {
  const [messages, setMessages] = useUIState<typeof AI>();
  // console.log(messages);

  return (
    <div className="flex h-full  flex-col gap-8">
      <ScrollShadow
        className="flex h-[60vh] w-[70vw]  flex-col mt-14"
        isEnabled={false}
      >
        <Conversation messages={messages} />
      </ScrollShadow>

      <div className="flex flex-col gap-2">
        <PromptBox setMessages={setMessages} />
        <p className="px-2 text-tiny text-default-400">
          Chatbot is in active development. Alpha version. Please be patient. 🙏
        </p>
      </div>
    </div>
  );
}
