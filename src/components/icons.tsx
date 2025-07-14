import { Bot } from 'lucide-react';

export const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <div className="flex items-center gap-2 text-foreground">
        <Bot className="h-6 w-6" />
        <h1 className="text-lg font-bold font-headline">AdaptAI Coach</h1>
    </div>
  ),
};
