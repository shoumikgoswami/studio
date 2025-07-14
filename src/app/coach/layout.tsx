import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ConversationHistorySidebar } from "./components/conversation-history-sidebar";
import { MainCoachSidebar } from "./components/main-coach-sidebar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export default async function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-svh w-full bg-background">
        <MainCoachSidebar />
        <div className="flex h-full flex-1">
          <ConversationHistorySidebar />
          <main className="flex h-full flex-1 flex-col">
            <header className="flex h-20 shrink-0 items-center justify-between border-b bg-card px-6">
              <div>
                <h1 className="text-xl font-semibold">Personalized Coach</h1>
                <p className="text-sm text-muted-foreground">
                  Get adaptive leadership guidance based on your profile
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/coach/settings">
                  <Settings className="mr-2" />
                  Coach Settings
                </Link>
              </Button>
            </header>
            <div className="flex-1 overflow-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
