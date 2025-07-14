import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ConversationSidebar } from "./components/conversation-sidebar";
import { Button } from "@/components/ui/button";
import { BookOpen, Settings, Target } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "./components/user-avatar";
import { getUser } from "@/lib/data";

export default async function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <Sidebar>
        <ConversationSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-svh flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-6">
            <div>
               <h1 className="text-xl font-semibold">Welcome, {user.name?.split(' ')[0]}</h1>
               <p className="text-sm text-muted-foreground">Track your adaptability progress and insights</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Assessments
                </Button>
                <Button>
                    <Target className="mr-2 h-4 w-4" />
                    Set New Goals
                </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-background p-6">
             {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
