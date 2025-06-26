import type { Metadata } from "next"
import { getExcuseDocuments } from "@/lib/excuse-data"
import AdminExcuseTable from "@/components/excuses/admin-excuse-table"

export const metadata: Metadata = {
  title: "Gestion des justificatifs | Administration",
  description: "Administration des justificatifs d'absence",
}

export default async function AdminExcusesPage() {
  const excuses = await getExcuseDocuments()

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Gestion des justificatifs d'absence</h1>
      <AdminExcuseTable excuses={excuses} />
    </div>
  )
}
