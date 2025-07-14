'use client';

import { useState, useTransition } from 'react';
import {
  Card,
  CardTitle,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { createNewConversation, getSuggestedTopicsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { SuggestedCoachingTopic } from '@/lib/types';


export function TopicStarter({ initialTopics }: { initialTopics: SuggestedCoachingTopic[] }) {
  const { toast } = useToast();
  const [topics, setTopics] = useState(initialTopics);
  const [isRefreshing, startRefreshTransition] = useTransition();

  const fetchTopics = async () => {
    startRefreshTransition(async () => {
      try {
        const suggestedTopics = await getSuggestedTopicsAction();
        // Shuffle and limit to 6 as per PRD
        const shuffled = suggestedTopics.sort(() => 0.5 - Math.random());
        setTopics(shuffled.slice(0, 6));
        toast({ title: 'New ideas refreshed!' });
      } catch (error) {
        toast({
          title: 'Error fetching topics',
          description: 'Could not load suggestions. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };
  
  if (!topics) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-10 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={fetchTopics} disabled={isRefreshing} variant="outline">
          <RefreshCw
            className={cn('mr-2 h-4 w-4', isRefreshing && 'animate-spin')}
          />
          Refresh Ideas
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {topics.map((topic, index) => (
          <form key={index} action={createNewConversation}>
             <input type="hidden" name="title" value={topic.title} />
             <input type="hidden" name="focusArea" value={topic.title} />
            <button
              type="submit"
              className="h-full w-full text-left"
              disabled={isRefreshing}
            >
              <Card className="h-full p-4 transition-colors hover:bg-accent hover:text-accent-foreground">
                <CardHeader className="p-0">
                  <CardTitle className="text-base font-semibold">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
