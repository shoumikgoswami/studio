'use client';

import { getSuggestedTopics } from "@/lib/actions";
import { type SuggestedCoachingTopic } from "@/ai/flows/suggest-coaching-topics";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createNewConversation } from "@/lib/actions";

export function TopicStarter() {
  const [topics, setTopics] = useState<SuggestedCoachingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      setLoading(true);
      const suggestedTopics = await getSuggestedTopics();
      setTopics(suggestedTopics);
      setLoading(false);
    }
    fetchTopics();
  }, []);

  const handleTopicSelect = (topic: SuggestedCoachingTopic) => {
    const formData = new FormData();
    formData.append('title', topic.title);
    formData.append('focusArea', topic.title);
    createNewConversation(formData);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-10 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic, index) => (
        <form key={index} action={() => handleTopicSelect(topic)}>
          <button type="submit" className="w-full h-full text-left">
            <Card className="p-4 hover:bg-accent hover:text-accent-foreground transition-colors h-full">
              <CardTitle className="text-base font-semibold">{topic.title}</CardTitle>
              <CardDescription className="text-sm mt-1">{topic.description}</CardDescription>
            </Card>
          </button>
        </form>
      ))}
    </div>
  );
}
