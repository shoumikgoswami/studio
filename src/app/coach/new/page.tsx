
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
import { getGoals } from "@/lib/data";
import { TopicStarter } from "./components/topic-starter";
import { createNewConversation } from "@/lib/actions";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function NewConversationPage() {
  const goals = await getGoals();

  return (
    <div className="flex h-full flex-col">
       <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl font-headline">
            Start New Coaching Session
          </h1>
        </header>
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-2xl border-0 shadow-none">
          <CardHeader>
            <form action={createNewConversation}>
                <input type="hidden" name="title" value="Open Coaching Session" />
                <Button type="submit" size="lg" className="w-full">
                    Just Go: Start an Open Coaching Session
                </Button>
            </form>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="inspire">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inspire">Inspire Me</TabsTrigger>
                <TabsTrigger value="setup">Set it Up Manually</TabsTrigger>
              </TabsList>
              <TabsContent value="inspire" className="pt-4">
                <TopicStarter />
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
      </main>
    </div>
  );
}
