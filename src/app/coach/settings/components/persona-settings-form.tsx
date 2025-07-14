'use client';

import { useEffect, useState, useTransition } from 'react';
import type { CoachPersona, CoachPersonaSettings, User } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  deleteCustomPreset,
  saveCoachSettings,
  saveCustomPreset,
} from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

type PersonaSettingsFormProps = {
  personas: CoachPersona[];
  user: User;
};

export function PersonaSettingsForm({
  personas,
  user,
}: PersonaSettingsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState('presets');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const [settings, setSettings] = useState<CoachPersonaSettings>(
    user.coachSettings || personas.find((p) => p.isSystemPreset)!.settings
  );
  const [newPresetName, setNewPresetName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Find if the current settings match any preset
    const matchedPreset = [...personas, ...(user.coachPresets || [])].find(
      (p) => JSON.stringify(p.settings) === JSON.stringify(settings)
    );
    setSelectedPresetId(matchedPreset ? matchedPreset.id : null);
  }, [settings, user.coachPresets, personas]);

  const handlePresetChange = (presetId: string) => {
    const preset = [...personas, ...(user.coachPresets || [])].find(
      (p) => p.id === presetId
    );
    if (preset) {
      setSettings(preset.settings);
      setSelectedPresetId(preset.id);
    }
  };

  const handleSliderChange = (key: keyof CoachPersonaSettings, value: number | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    startTransition(async () => {
      const result = await saveCoachSettings(settings);
      if (result.success) {
        toast({ title: 'Settings saved!' });
        router.push('/coach');
      } else {
        toast({
          title: 'Error saving settings',
          variant: 'destructive',
        });
      }
    });
  };

  const handleSavePreset = () => {
    if (!newPresetName.trim()) {
      toast({
        title: 'Preset name is required',
        variant: 'destructive',
      });
      return;
    }
    startTransition(async () => {
      const result = await saveCustomPreset(newPresetName, settings);
      if (result.success) {
        toast({ title: 'Custom preset saved!' });
        setNewPresetName('');
        setIsDialogOpen(false);
        // Manually update state until router refresh catches up
        if(user.coachPresets) {
            user.coachPresets.push(result.newPreset!);
        } else {
            user.coachPresets = [result.newPreset!];
        }
      } else {
        toast({
          title: 'Error saving preset',
          description: result.error,
          variant: 'destructive',
        });
      }
    });
  };

  const handleDeletePreset = (presetId: string) => {
    startTransition(async () => {
        const result = await deleteCustomPreset(presetId);
        if (result.success) {
            toast({ title: 'Preset deleted' });
            if (selectedPresetId === presetId) {
                // If the deleted preset was active, revert to a default
                handlePresetChange(personas[0].id);
            }
        } else {
            toast({ title: 'Error deleting preset', variant: 'destructive' });
        }
    });
  };

  const systemPresets = personas.filter((p) => p.isSystemPreset);

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Customize Your Coach</CardTitle>
          <CardDescription>
            Select a preset or fine-tune the settings to create a coach that's
            perfect for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="presets">System Presets</TabsTrigger>
              <TabsTrigger value="custom">My Presets</TabsTrigger>
            </TabsList>
            <TabsContent value="presets" className="pt-6">
              <RadioGroup
                value={selectedPresetId || ''}
                onValueChange={handlePresetChange}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {systemPresets.map((preset) => (
                  <Label
                    key={preset.id}
                    htmlFor={preset.id}
                    className="block cursor-pointer rounded-lg border p-4 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary"
                  >
                    <RadioGroupItem
                      value={preset.id}
                      id={preset.id}
                      className="sr-only"
                    />
                    <h3 className="font-semibold">{preset.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {preset.description}
                    </p>
                  </Label>
                ))}
              </RadioGroup>
            </TabsContent>
            <TabsContent value="custom" className="pt-6">
                <RadioGroup
                    value={selectedPresetId || ''}
                    onValueChange={handlePresetChange}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                    {(user.coachPresets || []).map((preset) => (
                        <div key={preset.id} className="relative">
                            <Label
                                htmlFor={preset.id}
                                className="block cursor-pointer rounded-lg border p-4 pr-10 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary"
                            >
                                <RadioGroupItem
                                value={preset.id}
                                id={preset.id}
                                className="sr-only"
                                />
                                <h3 className="font-semibold">{preset.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                {preset.description}
                                </p>
                            </Label>
                             <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1 text-muted-foreground hover:text-red-500"
                                onClick={() => handleDeletePreset(preset.id)}
                                disabled={isPending}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </RadioGroup>
                 {(user.coachPresets || []).length === 0 && (
                    <p className="text-center text-muted-foreground py-8">You haven't saved any custom presets yet.</p>
                 )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-8">
            {/* Sliders and Toggles */}
            <div className="space-y-4">
              <Label>Personality Traits</Label>
              <div className="space-y-4 rounded-md border p-4">
                <SettingSlider label="Formality" value={settings.formality} onValueChange={(v) => handleSliderChange('formality', v)} />
                <SettingSlider label="Tone (Direct to Encouraging)" value={settings.tone} onValueChange={(v) => handleSliderChange('tone', v)} />
                <SettingSlider label="Humor" value={settings.humor} onValueChange={(v) => handleSliderChange('humor', v)} />
                <SettingSlider label="Pace (Reflective to Dynamic)" value={settings.pace} onValueChange={(v) => handleSliderChange('pace', v)} />
              </div>
            </div>
             <div className="space-y-4">
               <Label>Communication Style</Label>
                <div className="space-y-4 rounded-md border p-4">
                    <SettingToggle label="Use Metaphors & Analogies" checked={settings.useMetaphors} onCheckedChange={(c) => handleSliderChange('useMetaphors', c)} />
                    <SettingToggle label="Include Inspirational Quotes" checked={settings.includeQuotes} onCheckedChange={(c) => handleSliderChange('includeQuotes', c)} />
                    <SettingToggle label="Share Anecdotes & Examples" checked={settings.shareAnecdotes} onCheckedChange={(c) => handleSliderChange('shareAnecdotes', c)} />
                </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-auto bg-card border-t pt-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={isPending}>
                Save as Custom Preset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Custom Preset</DialogTitle>
                <DialogDescription>
                  Give your new coaching persona a name.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="e.g., 'My Weekend Motivator'"
                autoFocus
              />
              <DialogFooter>
                <Button
                  onClick={handleSavePreset}
                  disabled={!newPresetName.trim() || isPending}
                >
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Preset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSaveSettings} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save & Return
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

function SettingSlider({ label, value, onValueChange }: { label: string, value: number, onValueChange: (value: number) => void }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label>{label}</Label>
                <span className="text-sm font-medium">{value}</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => onValueChange(v[0])} min={1} max={10} step={1} />
        </div>
    )
}

function SettingToggle({ label, checked, onCheckedChange }: { label: string, checked: boolean, onCheckedChange: (checked: boolean) => void }) {
    return (
        <div className="flex items-center justify-between">
            <Label htmlFor={label.replace(/\s/g, '')} className="flex-1">
                {label}
            </Label>
            <Switch id={label.replace(/\s/g, '')} checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    );
}
