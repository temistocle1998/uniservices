import type { Metadata } from "next"
import { getUniversities } from "@/lib/admin-data"
import { UniversityTable } from "@/components/admin/universities/university-table"

export const metadata: Metadata = {
  title: "Gestion des universités",
  description: "Gérez les universités sur la plateforme",
}

export default async function UniversitiesPage() {
  const universities = await getUniversities()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des universités</h2>
      </div>
      <div className="space-y-4">
        <UniversityTable data={universities} />
      </div>
    </div>
  )
}
