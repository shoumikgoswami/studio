'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitMessage } from "@/lib/actions";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
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

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await submitMessage(conversationId, formData);
        formRef.current?.reset();
      }}
      className="flex w-full items-start gap-4"
    >
      <Textarea
        name="message"
        placeholder="Type your message here..."
        className="flex-1 resize-none"
        rows={1}
        onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
            }
        }}
      />
       <div className="flex flex-col gap-2">
        <SubmitButton />
        <Button type="button" variant="outline" size="icon">
            <Mic />
            <span className="sr-only">Start Listening</span>
        </Button>
       </div>
    </form>
  );
}
