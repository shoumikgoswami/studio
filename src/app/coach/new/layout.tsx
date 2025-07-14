import { SidebarTrigger } from "@/components/ui/sidebar";

export default function NewConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
