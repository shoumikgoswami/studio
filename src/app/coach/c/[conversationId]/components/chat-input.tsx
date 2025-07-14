'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitMessage } from "@/lib/actions";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";
import { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" className="shrink-0" disabled={pending}>
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Send />
      )}
      <span className="sr-only">Send Message</span>
    </Button>
  );
}

export function ChatInput({ conversationId }: { conversationId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="relative">
      <form
        ref={formRef}
        action={async (formData) => {
          await submitMessage(conversationId, formData);
          formRef.current?.reset();
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height after submit
          }
        }}
        className="flex w-full items-start gap-4"
      >
        <Textarea
          ref={textareaRef}
          name="message"
          placeholder="Type your message..."
          className="max-h-[200px] flex-1 resize-none overflow-y-auto border-0 shadow-none focus-visible:ring-0"
          rows={1}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center self-center">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
