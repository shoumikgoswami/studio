import { getCoachPersonas, getUser } from '@/lib/data';
import { PersonaSettingsForm } from './components/persona-settings-form';
import { PreviewCard } from './components/preview-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function SettingsPage() {
  const personas = await getCoachPersonas();
  const user = await getUser();

  return (
    <div className="h-full overflow-y-auto bg-muted/40 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/coach">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Return to Coach
                </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Coach Personality Settings</h1>
            <p className="text-muted-foreground">Customize your coaching experience</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PersonaSettingsForm personas={personas} user={user} />
          </div>
          <div className="lg:col-span-1">
             <PreviewCard personas={personas} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
