
import { getCoachPersonas, getConversation, getUser } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Settings } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ChatMessages } from './components/chat-messages';
import { ChatInput } from './components/chat-input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { CoachPersona } from '@/lib/types';

function getActivePersona(
  user: any,
  personas: CoachPersona[]
): CoachPersona | undefined {
  if (!user.coachSettings) return personas.find((p) => p.isSystemPreset);
  const custom = (user.coachPresets || []).find(
    (p: any) => JSON.stringify(p.settings) === JSON.stringify(user.coachSettings)
  );
  if (custom) return custom;
  return personas.find(
    (p) => p.settings && user.coachSettings && JSON.stringify(p.settings) === JSON.stringify(user.coachSettings)
  ) || personas[0];
}

export default async function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversation = await getConversation(params.conversationId);
  const personas = await getCoachPersonas();
  const user = await getUser();

  if (!conversation) {
    notFound();
  }

  const activePersona = getActivePersona(user, personas);

  return (
    <Card className="flex h-full flex-col border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-card p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h3 className="truncate text-lg font-semibold">
            {conversation.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {activePersona && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="max-w-[200px] truncate">
                <span className="truncate">{activePersona.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {personas.map((p) => (
                <DropdownMenuItem key={p.id}>{p.name}</DropdownMenuItem>
              ))}
              {(user.coachPresets || []).length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  {user.coachPresets.map((p: CoachPersona) => (
                    <DropdownMenuItem key={p.id}>{p.name}</DropdownMenuItem>
                  ))}
                </>
              )}
               <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                 <Link href="/coach/settings">Customize Coach</Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ChatMessages messages={conversation.messages} conversationId={conversation.id} />
      </CardContent>
      <CardFooter className="border-t p-4">
        <ChatInput conversationId={conversation.id} />
      </CardFooter>
    </Card>
  );
}
