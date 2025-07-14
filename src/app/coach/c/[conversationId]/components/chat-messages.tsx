'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, useTransition } from 'react';
import { UserAvatar } from '../../../components/user-avatar';
import { Button } from '@/components/ui/button';
import { Edit, Save, Loader2, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { editMessage } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function ChatMessages({
  messages,
  conversationId,
}: {
  messages: Message[];
  conversationId: string;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (viewportRef.current && !editingMessageId) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, editingMessageId]);

  const handleEdit = (message: Message) => {
    setEditingMessageId(message.id);
    setEditedContent(message.content.replace(' (edited)', ''));
  };

  const handleSave = (messageId: string) => {
    startTransition(async () => {
      const result = await editMessage(conversationId, messageId, editedContent);
      if (result.success) {
        toast({ title: 'Message updated' });
        setEditingMessageId(null);
      } else {
        toast({ title: 'Error updating message', variant: 'destructive' });
      }
    });
  };

  const handleCancel = () => {
    setEditingMessageId(null);
  };

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-center">
        <MessageSquare className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Start the conversation</h3>
        <p className="text-muted-foreground">
          Send a message to your AI coach to begin.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full" ref={scrollAreaRef} viewportRef={viewportRef}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'group relative flex w-full items-start gap-3',
                message.role === 'user' && 'justify-end'
              )}
            >
              {message.role === 'assistant' && (
                 <UserAvatar
                    name="AdaptAI"
                    avatarUrl={message.avatarUrl}
                    className="h-8 w-8 shrink-0"
                 />
              )}
              <div
                className={cn(
                  'flex max-w-[80%] flex-col gap-1',
                   message.role === 'user' && 'items-end'
                )}
              >
                <div
                  className={cn(
                    'rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {editingMessageId === message.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="h-auto min-h-[80px] text-sm"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancel}
                          disabled={isPending}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSave(message.id)}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-4 w-4" />
                          )}
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                    {format(new Date(message.createdAt), 'p')}
                    {message.content.includes('(edited)') && <span className="ml-1 text-muted-foreground/80">(edited)</span>}
                </div>
              </div>
              {message.role === 'user' && (
                 <div className="relative flex h-8 shrink-0 items-center self-center">
                    {!editingMessageId && (
                         <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -left-10 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => handleEdit(message)}
                            >
                            <Edit className="h-4 w-4" />
                        </Button>
                    )}
                    <UserAvatar name="You" className="h-8 w-8"/>
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
