
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGoals, getSuggestedTopics } from "@/lib/data";
import { TopicStarter } from "./components/topic-starter";
import { createNewConversation } from "@/lib/actions";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function NewConversationPage() {
  const goals = await getGoals();
  const topics = await getSuggestedTopics();
  // Shuffle and limit to 6 as per PRD
  const initialTopics = topics.sort(() => 0.5 - Math.random()).slice(0, 6);


  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Start New Coaching Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createNewConversation} className="mb-6">
                <input type="hidden" name="title" value="Open Coaching Session" />
                <Button type="submit" size="lg" className="w-full">
                    Just Go: Start an Open Coaching Session
                </Button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or choose a setup option
                </span>
              </div>
            </div>

            <Tabs defaultValue="inspire">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inspire">Inspire Me</TabsTrigger>
                <TabsTrigger value="setup">Set it Up Manually</TabsTrigger>
              </TabsList>
              <TabsContent value="inspire" className="pt-4">
                <TopicStarter initialTopics={initialTopics}/>
              </TabsContent>
              <TabsContent value="setup" className="pt-4">
                <form action={createNewConversation} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Conversation Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., 'Preparing for my promotion'"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="focusArea">Focus Area (Optional)</Label>
                    <Input
                      id="focusArea"
                      name="focusArea"
                      placeholder="e.g., 'Leadership Skills'"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relatedGoal">
                      Related Goal (Optional)
                    </Label>
                    <Select name="relatedGoalId">
                      <SelectTrigger id="relatedGoal">
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {goals.map((goal) => (
                          <SelectItem key={goal.id} value={goal.id}>
                            {goal.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Start Conversation
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
    </div>
  );
}
