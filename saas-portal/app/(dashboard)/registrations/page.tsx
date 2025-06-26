import type { Metadata } from "next"
import SidebarNav from "@/components/sidebar-nav"
import RegistrationTable from "@/components/registrations/registration-table"
import NewRegistrationButton from "@/components/registrations/new-registration-button"
import ReenrollmentButton from "@/components/registrations/reenrollment-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Inscriptions | UniServices",
  description: "Gestion des inscriptions et réinscriptions",
}

export default function RegistrationsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Inscriptions</h2>
          <div className="flex items-center gap-2">
            <ReenrollmentButton />
            <NewRegistrationButton />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des inscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,250</div>
              <p className="text-xs text-muted-foreground">Pour l'année académique 2023-2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nouvelles inscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">845</div>
              <p className="text-xs text-muted-foreground">+12% par rapport à l'année précédente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réinscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,405</div>
              <p className="text-xs text-muted-foreground">78% de rétention des étudiants</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Toutes les inscriptions</TabsTrigger>
            <TabsTrigger value="new">Nouvelles inscriptions</TabsTrigger>
            <TabsTrigger value="reenrollment">Réinscriptions</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <RegistrationTable filter="all" />
          </TabsContent>
          <TabsContent value="new" className="mt-4">
            <RegistrationTable filter="new" />
          </TabsContent>
          <TabsContent value="reenrollment" className="mt-4">
            <RegistrationTable filter="reenrollment" />
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <RegistrationTable filter="pending" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
