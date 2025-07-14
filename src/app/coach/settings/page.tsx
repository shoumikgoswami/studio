import { getCoachPersonas, getUser } from '@/lib/data';
import { PersonaSettingsForm } from './components/persona-settings-form';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function SettingsPage() {
  const personas = await getCoachPersonas();
  const user = await getUser();

  return (
    <div className="mx-auto max-w-4xl">
        <PersonaSettingsForm personas={personas} user={user} />
    </div>
  );
}
