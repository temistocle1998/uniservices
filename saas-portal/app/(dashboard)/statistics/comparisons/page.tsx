import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SidebarNav from "@/components/sidebar-nav"
import EnrollmentComparisonChart from "@/components/statistics/enrollment-comparison-chart"
import DepartmentComparisonChart from "@/components/statistics/department-comparison-chart"
import SuccessRateComparisonChart from "@/components/statistics/success-rate-comparison-chart"

export const metadata: Metadata = {
  title: "Comparaisons Annuelles | Gestion Universitaire",
  description: "Comparaison des statistiques entre différentes années académiques",
}

export default function ComparisonsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Comparaisons Annuelles</h2>
        </div>

        <Tabs defaultValue="enrollments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="enrollments">Inscriptions</TabsTrigger>
            <TabsTrigger value="departments">Départements</TabsTrigger>
            <TabsTrigger value="success">Taux de réussite</TabsTrigger>
            <TabsTrigger value="courses">Cours</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <EnrollmentComparisonChart />
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DepartmentComparisonChart />
            </div>
          </TabsContent>

          <TabsContent value="success" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <SuccessRateComparisonChart />
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Ajouter ici d'autres graphiques de comparaison pour les cours */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
