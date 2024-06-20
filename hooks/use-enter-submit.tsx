import React from "react";

export function usseEnterSubmit(): {
  formRef: React.RefObject<HTMLFormElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
} {
  const formRef = React.useRef<HTMLFormElement>(null);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      console.log("Enter key pressed");
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }
  return { formRef, onKeyDown };
}
