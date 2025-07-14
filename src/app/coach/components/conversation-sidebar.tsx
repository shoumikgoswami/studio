import { getConversations } from "@/lib/data";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";
import { ConversationItem } from "./conversation-item";
import { Icons } from "@/components/icons";
import { UserAvatar } from "./user-avatar";

export async function ConversationSidebar() {
  const conversations = await getConversations();

  return (
    <>
      <SidebarHeader>
        <div className="flex w-full items-center justify-between">
          <Icons.logo />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/coach/new" aria-label="New Conversation">
              <PlusCircle />
            </Link>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full px-2">
          {conversations.length > 0 ? (
            <SidebarMenu>
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                />
              ))}
            </SidebarMenu>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-sidebar-foreground/70">
              <MessageSquare className="h-10 w-10" />
              <h3 className="font-medium">No conversations yet</h3>
              <Button asChild>
                <Link href="/coach/new">Start coaching session</Link>
              </Button>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-2">
            <UserAvatar name="Adapt AI" avatarUrl="https://placehold.co/40x40.png" />
            <div className="flex flex-col text-sm">
                <span className="font-medium">User</span>
                <span className="text-muted-foreground">user@email.com</span>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
