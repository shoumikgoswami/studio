
'use client';

import type { CoachingConversation } from "@/lib/types";
import { usePathname } from "next/navigation";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { MoreVertical, Edit, Trash2, Archive } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

type ConversationItemProps = {
  conversation: CoachingConversation;
};

export function ConversationItem({ conversation }: ConversationItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/coach/c/${conversation.id}`;
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // This will only run on the client, preventing hydration mismatch
    setLastUpdated(format(new Date(conversation.updatedAt), "MMM d"));
  }, [conversation.updatedAt]);


  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={`/coach/c/${conversation.id}`}>
          <div className="flex flex-col items-start gap-1 truncate">
            <span className="truncate font-medium">{conversation.title}</span>
            <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
              <span className="truncate">
                {lastUpdated}
              </span>
              {conversation.focusArea && (
                <Badge variant="outline" className="hidden group-hover/menu-item:block">
                  {conversation.focusArea}
                </Badge>
              )}
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreVertical />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive className="mr-2 h-4 w-4" />
            <span>Archive</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
