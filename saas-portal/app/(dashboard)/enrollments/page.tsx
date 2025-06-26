import type { Metadata } from "next"
import SidebarNav from "@/components/sidebar-nav"
import EnrollmentTable from "@/components/enrollments/enrollment-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NewEnrollmentForm from "@/components/enrollments/new-enrollment-form"
import ReEnrollmentForm from "@/components/enrollments/re-enrollment-form"

export const metadata: Metadata = {
  title: "Inscriptions | UniServices",
  description: "Gestion des inscriptions et réinscriptions",
}

export default function EnrollmentsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Inscriptions</h2>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Liste des inscriptions</TabsTrigger>
            <TabsTrigger value="new">Nouvelle inscription</TabsTrigger>
            <TabsTrigger value="renew">Réinscription</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Liste des inscriptions</CardTitle>
                <CardDescription>
                  Consultez et gérez toutes les inscriptions pour l'année académique en cours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnrollmentTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle inscription</CardTitle>
                <CardDescription>Inscrivez un nouvel étudiant pour l'année académique en cours.</CardDescription>
              </CardHeader>
              <CardContent>
                <NewEnrollmentForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="renew" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Réinscription</CardTitle>
                <CardDescription>Réinscrivez un étudiant existant pour l'année académique en cours.</CardDescription>
              </CardHeader>
              <CardContent>
                <ReEnrollmentForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
