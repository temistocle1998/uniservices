import DashboardStats from "@/components/dashboard-stats"
import DataTable from "@/components/data-table"
import SidebarNav from "@/components/sidebar-nav"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="flex h-9 items-center justify-center rounded-full bg-primary/10 px-4 text-sm font-medium text-primary">
                Université Iba Der-Thiam
              </div>
            </div>
          </div>
        </div>
        <DashboardStats />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Cours récents</h3>
            <div className="flex items-center space-x-2">
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option>Tous les départements</option>
                <option>Sciences</option>
                <option>Lettres</option>
                <option>Droit</option>
                <option>Économie</option>
              </select>
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option>Semestre en cours</option>
                <option>Semestre précédent</option>
                <option>Année complète</option>
              </select>
            </div>
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  )
}
