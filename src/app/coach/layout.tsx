import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ConversationSidebar } from "./components/conversation-sidebar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <ConversationSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-svh flex-col p-4">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-headline">Personalized Coach</h1>
              <p className="text-muted-foreground">
                Get adaptive leadership guidance based on your profile
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/coach/settings">
                <Settings className="mr-2" />
                Coach Settings
              </Link>
            </Button>
          </header>
          <Card className="flex-1 border-0 shadow-sm">
            {children}
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
