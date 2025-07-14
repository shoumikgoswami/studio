import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  avatarUrl?: string;
  className?: string;
};

export function UserAvatar({ name, avatarUrl, className }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar className={cn("h-8 w-8", className)}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt={name} data-ai-hint="person" />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
