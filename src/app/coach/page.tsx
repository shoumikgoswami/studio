import { getConversation } from "@/lib/data";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from '@/components/ui/card';
import { ChatMessages } from "./c/[conversationId]/components/chat-messages";
import { ChatInput } from "./c/[conversationId]/components/chat-input";

// This page can now act as a shell or redirect to the first conversation.
// For now, we'll show the UI for the first conversation found.
export default async function CoachPage() {
    // A default view when no conversation is selected
    // Or you can redirect to the latest conversation
    return (
        <Card className="flex h-full flex-col border-0 shadow-none rounded-none">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-card p-4">
                <div className="flex items-center gap-4">
                    <h3 className="truncate text-lg font-semibold">
                        Select a Conversation
                    </h3>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                 <ChatMessages messages={[]} conversationId={""} />
            </CardContent>
             <CardFooter className="border-t p-4 bg-card">
                 {/* Empty chat input or disabled */}
             </CardFooter>
        </Card>
    )
}
