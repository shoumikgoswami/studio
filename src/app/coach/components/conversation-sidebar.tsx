import { getConversations, getUser } from "@/lib/data";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare, PlusCircle, Home, BarChart3, Target, FileText, Bell, CreditCard, Settings, LogOut, Linkedin } from "lucide-react";
import Link from "next/link";
import { ConversationItem } from "./conversation-item";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export async function ConversationSidebar() {
  const conversations = await getConversations();
  const user = await getUser();

  const menuItems = [
      { href: "/coach", label: "Dashboard", icon: <Home /> },
      { href: "#", label: "My Report", icon: <BarChart3 /> },
      { href: "#", label: "My Goals", icon: <Target /> },
      { href: "/coach/new", label: "Difficult Conversations", icon: <MessageSquare /> },
      { href: "/coach/new", label: "Personalized Coach", icon: <MessageSquare />, active: true},
      { href: "#", label: "Development Plan", icon: <Target /> },
      { href: "#", label: "Project Booster", icon: <FileText /> },
      { href: "#", label: "Enhance LinkedIn", icon: <Linkedin /> },
      { href: "#", label: "Micro Tips Setup", icon: <Bell /> },
      { href: "#", label: "Billing", icon: <CreditCard />, comingSoon: true },
  ]

  const bottomMenuItems = [
      { href: "/coach/settings", label: "Customize Menu", icon: <Settings /> },
      { href: "/login", label: "Log out", icon: <LogOut /> },
  ]

  return (
    <>
      <SidebarHeader className="p-4">
         <Icons.logo />
      </SidebarHeader>
      <SidebarContent className="flex-1 px-2">
        <SidebarMenu>
            {menuItems.map(item => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.active}>
                        <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                            {item.comingSoon && <Badge className="ml-auto bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30">Coming Soon</Badge>}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
             {bottomMenuItems.map(item => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                        <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <div className="p-4 border-t border-sidebar-border mt-2">
            <Icons.poweredBy />
        </div>
      </SidebarFooter>
    </>
  );
}
