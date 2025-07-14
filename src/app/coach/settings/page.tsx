import { getCoachPersonas, getCoachSettings } from "@/lib/data";
import { PersonaSettingsForm } from "./components/persona-settings-form";
import { PersonaPreview } from "./components/persona-preview";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function SettingsPage() {
  const personas = await getCoachPersonas();
  const currentSettings = await getCoachSettings();

  return (
    <div className="flex h-full flex-col">
       <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl font-headline">
            Coach Settings
          </h1>
        </header>
      <main className="flex-1 overflow-auto">
        <div className="grid h-full gap-8 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PersonaSettingsForm
              personas={personas}
              currentSettings={currentSettings}
            />
          </div>
          <div className="hidden lg:block">
            <PersonaPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
