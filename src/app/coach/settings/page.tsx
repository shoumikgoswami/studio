import { getCoachPersonas, getUser } from '@/lib/data';
import { PersonaSettingsForm } from './components/persona-settings-form';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function SettingsPage() {
  const personas = await getCoachPersonas();
  const user = await getUser();

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-lg font-semibold md:text-xl">
          Coach Settings
        </h1>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
            <PersonaSettingsForm personas={personas} user={user} />
        </div>
      </main>
    </div>
  );
}
