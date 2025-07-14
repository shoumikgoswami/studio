'use client';

import { useState } from 'react';
import type { CoachPersonaSettings } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type PersonaSettingsFormProps = {
  personas: CoachPersonaSettings[];
  currentSettings: CoachPersonaSettings;
};

export function PersonaSettingsForm({
  personas,
  currentSettings,
}: PersonaSettingsFormProps) {
  const systemPresets = personas.filter((p) => p.isSystemPreset);
  const customPresets = personas.filter((p) => !p.isSystemPreset);

  const [formality, setFormality] = useState(currentSettings.formality);
  const [tone, setTone] = useState(currentSettings.tone);
  const [humor, setHumor] = useState(currentSettings.humor);
  const [pace, setPace] = useState(currentSettings.pace);

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="font-headline">Customize Your Coach</CardTitle>
        <CardDescription>
          Adjust the sliders to fine-tune your AI coach's personality to your liking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">My Custom Presets</TabsTrigger>
          </TabsList>
          <TabsContent value="presets" className="pt-6">
            <RadioGroup defaultValue={systemPresets[0].id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemPresets.map((preset) => (
                <Label key={preset.id} htmlFor={preset.id} className="block cursor-pointer rounded-lg border p-4 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary">
                  <RadioGroupItem value={preset.id} id={preset.id} className="sr-only" />
                  <h3 className="font-semibold">{preset.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">A brief description of this coach persona.</p>
                </Label>
              ))}
            </RadioGroup>
          </TabsContent>
          <TabsContent value="custom" className="pt-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="formality">Formality</Label>
                <span className="text-sm font-medium">{formality}</span>
              </div>
              <Slider id="formality" value={[formality]} onValueChange={(v) => setFormality(v[0])} min={1} max={10} step={1} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="tone">Tone (Direct to Encouraging)</Label>
                <span className="text-sm font-medium">{tone}</span>
              </div>
              <Slider id="tone" value={[tone]} onValueChange={(v) => setTone(v[0])} min={1} max={10} step={1} />
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                <Label htmlFor="humor">Humor</Label>
                <span className="text-sm font-medium">{humor}</span>
              </div>
              <Slider id="humor" value={[humor]} onValueChange={(v) => setHumor(v[0])} min={1} max={10} step={1} />
            </div>
             <div className="space-y-4">
               <div className="flex justify-between items-center">
                <Label htmlFor="pace">Pace (Reflective to Dynamic)</Label>
                <span className="text-sm font-medium">{pace}</span>
              </div>
              <Slider id="pace" value={[pace]} onValueChange={(v) => setPace(v[0])} min={1} max={10} step={1} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button>Save & Return to Coach</Button>
      </CardFooter>
    </Card>
  );
}
