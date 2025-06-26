import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AttendanceSessionsTable from "@/components/attendance/attendance-sessions-table"
import AttendanceReports from "@/components/attendance/attendance-reports"
import AttendanceStats from "@/components/attendance/attendance-stats"

export const metadata: Metadata = {
  title: "Gestion des Absences | Université",
  description: "Gestion des présences et absences des étudiants",
}

export default function AttendancePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Absences</h1>
        <p className="text-muted-foreground">Gérez les présences et absences des étudiants pour tous les cours</p>
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Sessions de cours</TabsTrigger>
          <TabsTrigger value="reports">Rapports d'assiduité</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <AttendanceSessionsTable />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <AttendanceReports />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <AttendanceStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
