import { getCoachPersonas, getUser } from '@/lib/data';
import { PersonaSettingsForm } from './components/persona-settings-form';

export default async function SettingsPage() {
  const personas = await getCoachPersonas();
  const user = await getUser();

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl">
          <PersonaSettingsForm personas={personas} user={user} />
      </div>
    </div>
  );
}
