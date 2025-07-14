'use client';

import { UserAvatar } from "../../components/user-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PersonaPreview() {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="font-headline">Preview</CardTitle>
        <CardDescription>See how your coach will communicate.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Badge>Selected Preset: MOTI The Motivator</Badge>
          <div className="flex items-start gap-3 rounded-lg border p-4">
            <UserAvatar name="AdaptAI" avatarUrl="https://placehold.co/40x40.png" />
            <div className="flex-1 space-y-1">
              <p className="font-semibold">AdaptAI Coach</p>
              <p className="text-sm text-muted-foreground">
                "That's a fantastic goal! Breaking it down into smaller, manageable steps can make it feel less daunting. What's one small thing you could do this week to move closer to that?"
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
