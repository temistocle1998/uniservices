import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"
import StatsDashboard from "@/components/statistics/stats-dashboard"

export const metadata: Metadata = {
  title: "Statistiques | Gestion Universitaire",
  description: "Statistiques et visualisations de données",
}

export default function StatisticsPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Statistiques</h2>
        <div className="flex items-center space-x-4">
          <Link href="/statistics/comparisons">
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Comparaisons Annuelles
            </Button>
          </Link>
          <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
            <option>Année académique 2023-2024</option>
            <option>Année académique 2022-2023</option>
            <option>Toutes les années</option>
          </select>
        </div>
      </div>
      <StatsDashboard />
    </div>
  )
}
