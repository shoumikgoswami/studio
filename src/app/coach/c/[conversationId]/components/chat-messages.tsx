'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, useTransition } from 'react';
import { UserAvatar } from '../../../components/user-avatar';
import { Button } from '@/components/ui/button';
import { Edit, Save, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { editMessage } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <ScrollArea className="h-full" ref={scrollAreaRef} viewportRef={viewportRef}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'group relative flex items-start gap-3',
                message.role === 'user' && 'flex-row-reverse'
              )}
            >
              <UserAvatar
                name={message.role === 'user' ? 'You' : 'AdaptAI'}
                avatarUrl={message.avatarUrl}
                className="h-10 w-10"
              />
              <div
                className={cn(
                  'max-w-[75%] rounded-lg p-3 text-sm',
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
              {message.role === 'user' && !editingMessageId && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100',
                    message.role === 'user'
                      ? 'left-0 -translate-x-full'
                      : 'right-0 translate-x-full'
                  )}
                  onClick={() => handleEdit(message)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
