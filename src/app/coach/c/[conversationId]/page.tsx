
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
import { Bot } from 'lucide-react';

function getActivePersona(
  user: any,
  personas: CoachPersona[]
): CoachPersona | undefined {
  // Find a preset (system or custom) that matches the user's active settings
  const matchedPreset = [...personas, ...(user.coachPresets || [])].find(
    (p) =>
      p.settings &&
      user.coachSettings &&
      JSON.stringify(p.settings) === JSON.stringify(user.coachSettings)
  );

  if (matchedPreset) {
    return matchedPreset;
  }

  // If no preset matches, it's a custom unsaved configuration
  // You might want to represent this differently in the UI
  // For now, we return a generic object or the first system preset as a fallback.
  return {
      id: 'custom-unsaved',
      name: 'Custom Coach',
      description: 'Your custom settings are active.',
      isSystemPreset: false,
      settings: user.coachSettings,
      strength: 'Tailored to you',
      bestFor: 'Your specific needs'
  };
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
  const allPersonas = [...personas.filter(p => p.isSystemPreset), ...(user.coachPresets || [])];


  return (
    <Card className="flex h-full flex-col border-0 shadow-none rounded-none">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-card p-4">
        <div className="flex items-center gap-4">
          <h3 className="truncate text-lg font-semibold">
            {conversation.title}
          </h3>
          {activePersona && <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="max-w-[200px] truncate rounded-full">
                    <Bot className="mr-2 h-4 w-4" />
                    <span className="truncate">{activePersona.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {allPersonas.map((p) => (
                <DropdownMenuItem key={p.id}>{p.name}</DropdownMenuItem>
              ))}
               <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                 <Link href="/coach/settings">Customize Coach</Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
           <span className="text-sm text-muted-foreground">Balanced, reflective, supportive</span>
        </div>
        <div className="flex items-center gap-2">
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
      <CardFooter className="border-t p-4 bg-card">
        <ChatInput conversationId={conversation.id} />
      </CardFooter>
    </Card>
  );
}
