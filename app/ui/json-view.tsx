"use client";
import data from "@/lib/data.json";
import JsonView from "react18-json-view";
import { Card } from "@nextui-org/react";
export default function JsonViewer() {
  return (
    // wrap and style the json view very nicely with a card
    <JsonView
      src={data}
      theme="vscode"
      collapsed={1}
      enableClipboard={false}
      className="ring-1 break-words"
    />
  );
}
