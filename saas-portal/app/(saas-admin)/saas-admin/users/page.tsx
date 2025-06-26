import type { Metadata } from "next"
import { getUsers } from "@/lib/admin-data"
import { SaasUserTable } from "@/components/admin/saas-users/saas-user-table"

export const metadata: Metadata = {
  title: "Gestion des utilisateurs SaaS",
  description: "Gérez les utilisateurs de la plateforme SaaS",
}

export default async function SaasUsersPage() {
  // Récupérer tous les utilisateurs (sans filtrer par université)
  const users = await getUsers()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs SaaS</h2>
      </div>
      <div className="space-y-4">
        <SaasUserTable data={users} />
      </div>
    </div>
  )
}
