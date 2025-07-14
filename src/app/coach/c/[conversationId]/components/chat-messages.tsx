'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { UserAvatar } from "../../../components/user-avatar";

export function ChatMessages({ messages }: { messages: Message[] }) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full" ref={scrollAreaRef} viewportRef={viewportRef}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <UserAvatar
                name={message.role === "user" ? "You" : "AdaptAI"}
                avatarUrl={message.avatarUrl}
                className="h-10 w-10"
              />
              <div
                className={cn(
                  "max-w-[75%] rounded-lg p-3 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
