import type { Metadata } from "next"
import SidebarNav from "@/components/sidebar-nav"
import DataTable from "@/components/data-table"

export const metadata: Metadata = {
  title: "Démo Tableau | UniServices",
  description: "Démonstration du tableau avec pagination",
}

export default function DemoTablePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Démonstration du Tableau avec Pagination</h2>
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Cette page démontre l'utilisation du composant DataTable avec pagination, filtrage et tri.
          </p>
          <DataTable />
        </div>
      </div>
    </div>
  )
}
