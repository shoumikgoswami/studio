
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
import { mockPersonas } from '@/lib/data';
import { CoachPersona } from '@/lib/types';

function getActivePersona(
  user: any,
  personas: CoachPersona[]
): CoachPersona | undefined {
  if (!user.coachSettings) return personas.find((p) => p.isSystemPreset);
  const custom = user.coachPresets.find(
    (p: any) => JSON.stringify(p.settings) === JSON.stringify(user.coachSettings)
  );
  if (custom) return custom;
  return personas.find(
    (p) => JSON.stringify(p.settings) === JSON.stringify(user.coachSettings)
  );
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

  const activePersona = getActivePersona(user, personas) || mockPersonas[0];

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
              <Button variant="outline" size="sm" className="max-w-[200px] truncate">
                <Badge className="mr-2 bg-primary/20 text-primary">
                  {activePersona.name.split(' ')[0].substring(0, 4).toUpperCase()}
                </Badge>
                <span className="truncate">{activePersona.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {personas.map((p) => (
                <DropdownMenuItem key={p.id}>{p.name}</DropdownMenuItem>
              ))}
              {user.coachPresets && user.coachPresets.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  {user.coachPresets.map((p) => (
                    <DropdownMenuItem key={p.id}>{p.name}</DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

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

          <Button variant="outline" size="icon" asChild>
            <Link href="/coach/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Coach Settings</span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ChatMessages messages={conversation.messages} conversationId={conversation.id} />
      </CardContent>
      <CardFooter className="border-t p-4">
        <ChatInput conversationId={conversation.id} />
      </CardFooter>
    </div>
  );
}
