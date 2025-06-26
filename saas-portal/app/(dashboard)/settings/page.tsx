import type { Metadata } from "next"
import { UniversitySettings } from "@/components/settings/university-settings"

export const metadata: Metadata = {
  title: "Paramètres de l'université",
  description: "Gérez les paramètres de votre université",
}

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Paramètres de l'université</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <UniversitySettings />
      </div>
    </div>
  )
}
