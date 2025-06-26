import type { Metadata } from "next"
import { ProfileSettings } from "@/components/profile/profile-settings"

export const metadata: Metadata = {
  title: "Mon Profil",
  description: "Gérez vos informations personnelles et paramètres de compte",
}

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mon Profil</h2>
      </div>
      <ProfileSettings />
    </div>
  )
}
