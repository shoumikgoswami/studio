import { getCoachPersonas, getConversation } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChatMessages } from "./components/chat-messages";
import { ChatInput } from "./components/chat-input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversation = await getConversation(params.conversationId);
  const personas = await getCoachPersonas();

  if (!conversation) {
    notFound();
  }

  return (
    <div className="flex h-full max-h-screen flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-card p-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="truncate font-headline text-lg font-semibold">
            {conversation.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Badge className="mr-2 bg-primary/20 text-primary">
                  MOTI
                </Badge>
                MOTI The Motivator
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {personas.map((p) => (
                <DropdownMenuItem key={p.id}>{p.name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" asChild>
            <Link href="/coach/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Coach Settings</span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ChatMessages messages={conversation.messages} />
      </CardContent>
      <CardFooter className="border-t p-4">
        <ChatInput conversationId={conversation.id} />
      </CardFooter>
    </div>
  );
}
