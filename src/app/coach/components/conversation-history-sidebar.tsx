import { getConversations } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ConversationItem } from "./conversation-item";

export async function ConversationHistorySidebar() {
  const conversations = await getConversations();

  return (
    <aside className="h-full w-[300px] shrink-0 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center justify-between border-b px-4">
          <h2 className="text-lg font-semibold">Your Conversations</h2>
          <Button asChild variant="ghost" size="icon">
            <Link href="/coach/new">
              <PlusCircle className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.map((conv) => (
              <ConversationItem key={conv.id} conversation={conv} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
