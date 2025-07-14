import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
  } from "@/components/ui/sidebar";
  import { Button } from "@/components/ui/button";
  import { BarChart3, Bell, Briefcase, CreditCard, FileText, Home, MessageSquare, Mic, Settings, Target, Zap, Linkedin, Bot } from "lucide-react";
  import Link from "next/link";
  import { Icons } from "@/components/icons";
  import { Badge } from "@/components/ui/badge";
  import { usePathname } from "next/navigation";
  
  export function MainCoachSidebar() {
  
    const menuItems = [
        { href: "#", label: "Dashboard", icon: <Home /> },
        { href: "#", label: "My Report", icon: <BarChart3 /> },
        { href: "#", label: "My Goals", icon: <Target /> },
        { href: "#", label: "Difficult Conversations", icon: <MessageSquare />},
        { href: "/coach", label: "Personalized Coach", icon: <Bot />, active: true },
        { href: "#", label: "Development Plan", icon: <Zap />},
        { href: "#", label: "Project Booster", icon: <Briefcase /> },
        { href: "#", label: "Enhance LinkedIn", icon: <Linkedin /> },
        { href: "#", label: "Micro Tips Setup", icon: <Mic /> },
        { href: "#", label: "Billing", icon: <CreditCard />, comingSoon: true },
    ]
  
    return (
      <Sidebar>
        <SidebarHeader className="p-4">
           <Icons.logo />
        </SidebarHeader>
        <SidebarContent className="flex-1 px-4">
          <SidebarMenu>
              {menuItems.map(item => (
                  <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={item.active} tooltip={item.label}>
                          <Link href={item.href}>
                              {item.icon}
                              <span>{item.label}</span>
                              {item.comingSoon && <Badge variant="outline" className="ml-auto !bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30 border-none">Coming Soon</Badge>}
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-4 space-y-4">
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Customize Menu">
                        <Link href="#">
                            <Settings />
                            <span>Customize Menu</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <div className="p-4 border-t border-sidebar-border">
                <Icons.poweredBy />
            </div>
        </SidebarFooter>
      </Sidebar>
    );
  }