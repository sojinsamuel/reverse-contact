"use client";

import React, { Dispatch, useEffect } from "react";
import {
  Button,
  Tooltip,
  Textarea,
  type TextAreaProps,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { usseEnterSubmit } from "@/hooks/use-enter-submit";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/app/actions";

export default function PromptBox({ setMessages }: { setMessages: any }) {
  const [prompt, setPrompt] = React.useState<string>("");

  const { formRef, onKeyDown } = usseEnterSubmit();

  // const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt) return;
    setMessages((prev: any) => [
      ...prev,
      { id: Date.now().toString(), role: "user", display: <>{prompt}</> },
    ]);

    try {
      const res = await sendMessage(prompt);

      setMessages((prev: Array<typeof AI>) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          display: <>{res.display}</>,
        },
      ]);
      // setPrompt("");
    } catch (error) {
      console.error(error);
    }

    // window.scrollTo(0, scrollShadowRef.current.scrollHeight);
    // console.log(messages);
  };

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  return (
    <div className="flex w-full flex-col gap-4">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70"
      >
        <PromptInput
          classNames={{
            inputWrapper: "!bg-transparent shadow-none",
            innerWrapper: "relative",
            input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
          }}
          endContent={
            <div className="flex items-end gap-2">
              <Tooltip showArrow content="Send message">
                <Button
                  isIconOnly
                  color={!prompt ? "default" : "primary"}
                  isDisabled={!prompt}
                  radius="lg"
                  size="sm"
                  variant="solid"
                  type="submit"
                >
                  <Icon
                    className={cn(
                      "[&>path]:stroke-[2px]",
                      !prompt ? "text-default-600" : "text-primary-foreground"
                    )}
                    icon="solar:arrow-up-linear"
                    width={20}
                  />
                </Button>
              </Tooltip>
            </div>
          }
          maxRows={3}
          radius="lg"
          value={prompt}
          variant="flat"
          onValueChange={setPrompt}
          // @ts-ignore
          onKeyDown={onKeyDown}
        />
      </form>
    </div>
  );
}

const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ classNames = {}, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        aria-label="Prompt"
        className="min-h-[40px]"
        classNames={{
          ...classNames,
          label: cn("hidden", classNames?.label),
          input: cn("py-0", classNames?.input),
        }}
        minRows={1}
        placeholder="Enter a prompt here"
        radius="lg"
        variant="bordered"
        required
        {...props}
      />
    );
  }
);

PromptInput.displayName = "PromptInput";
