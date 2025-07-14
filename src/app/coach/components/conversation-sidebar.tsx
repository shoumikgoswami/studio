import { getConversations, getUser } from "@/lib/data";
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
import { UserAvatar } from "./user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function ConversationSidebar() {
  const conversations = await getConversations();
  const user = await getUser();

  return (
    <>
      <SidebarHeader>
         <CardHeader className="flex w-full flex-row items-center justify-between p-0">
             <CardTitle className="text-base font-semibold">Your Conversations</CardTitle>
             <Button variant="ghost" size="icon" asChild>
                <Link href="/coach/new" aria-label="New Conversation">
                    <PlusCircle />
                </Link>
             </Button>
         </CardHeader>
      </SidebarHeader>
      <SidebarContent className="flex-1">
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
            <UserAvatar name={user.name || 'User'} avatarUrl={user.avatarUrl} className="h-9 w-9" />
            <div className="flex flex-col text-sm">
                <span className="font-medium">{user.name || 'User'}</span>
                <span className="text-muted-foreground">{user.email || 'user@email.com'}</span>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
