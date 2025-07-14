'use client';

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar";
  import { Home, Bot } from "lucide-react";
  import Link from "next/link";
  import { Icons } from "@/components/icons";
  import { usePathname } from "next/navigation";
  
  export function MainCoachSidebar() {
    const pathname = usePathname();
  
    const menuItems = [
        { href: "/coach", label: "Dashboard", icon: <Home /> },
        { href: "/coach/c/conv-1", label: "Personalized Coach", icon: <Bot />}, // temporary link to first conversation
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
                      <SidebarMenuButton 
                        asChild 
                        isActive={pathname.startsWith(item.href)} 
                        tooltip={item.label}
                      >
                          <Link href={item.href}>
                              {item.icon}
                              <span>{item.label}</span>
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="p-4">
                <Icons.poweredBy />
            </div>
        </SidebarFooter>
      </Sidebar>
    );
  }
