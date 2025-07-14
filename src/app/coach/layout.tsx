import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ConversationSidebar } from "./components/conversation-sidebar";

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
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
