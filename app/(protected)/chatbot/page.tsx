import React from "react";
import ChatbotMain from "@/app/ui/chatbot/chatbot-main";
import analytics from "@/lib/analyticsInstance";
import { auth } from "@clerk/nextjs/server";
export default async function Chatbot() {
  const { userId } = auth();

  analytics.page({
    userId: userId || "Not found",
    name: "Chatbot",
    timestamp: new Date().toISOString(),
  });
  return <ChatbotMain />;
}
