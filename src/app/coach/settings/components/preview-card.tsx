'use client';
// This is a placeholder for a real implementation
// For now, it will just show a static preview.

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { saveCoachSettings } from '@/lib/actions';
import type { CoachPersona, CoachPersonaSettings, User } from '@/lib/types';
import { Bot, Edit, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

type PreviewCardProps = {
    personas: CoachPersona[];
    user: User;
};

// Dummy settings state management for preview
// In a real app, this would come from a global state manager (Zustand, Redux, etc.)
// or passed down from the parent component.
// We'll simulate it here for demonstration.
const useSimulatedSettings = (initialSettings: CoachPersonaSettings) => {
  const [settings, setSettings] = useState(initialSettings);
  
  useEffect(() => {
    // A fake event listener to update settings from the other component
    const handleSettingsChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSettings(customEvent.detail);
    };

    window.addEventListener('settings-change', handleSettingsChange);
    return () => {
      window.removeEventListener('settings-change', handleSettingsChange);
    };
  }, []);

  return settings;
};


export function PreviewCard({ personas, user }: PreviewCardProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // This is a simulated hook. In a real app, state would be shared.
    const currentSettings = useSimulatedSettings(user.coachSettings || personas[0].settings);

    const getActivePersonaName = () => {
        const allPersonas = [...personas, ...(user.coachPresets || [])];
        const matchedPreset = allPersonas.find(
          (p) =>
            p.settings &&
            JSON.stringify(p.settings) === JSON.stringify(currentSettings)
        );
        return matchedPreset ? matchedPreset.name : 'Your Custom Coach';
    }

    const handleSaveAndReturn = () => {
        startTransition(async () => {
            await saveCoachSettings(currentSettings);
            router.push('/coach');
        });
    };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>See how your coach will communicate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{getActivePersonaName()}</p>
              <p className="text-sm text-muted-foreground">
                I think we should discuss your approach to this challenge. I
                think you can handle this challenge. Think of this challenge like
                navigating a river – sometimes you need to paddle hard, other
                times you can let the current carry you. Setbacks are a normal
                part of the process. I once worked with a leader who faced a
                similar situation. They found that breaking the problem into
                smaller parts made it more manageable. Take your time to reflect
                on these suggestions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
            <p className="text-sm font-medium mb-2">Using custom settings</p>
            <div className="flex items-center justify-between rounded-lg border bg-background p-3">
                <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Personalized Configuration</span>
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSaveAndReturn} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save & Return to Coach
        </Button>
      </CardFooter>
    </Card>
  );
}
