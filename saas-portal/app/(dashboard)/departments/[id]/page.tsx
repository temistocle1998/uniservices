import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProgramTable from "@/components/departments/program-table"
import AddProgramDialog from "@/components/departments/add-program-dialog"
import { ArrowLeft, Building2, GraduationCap, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Détails du département | UniServices",
  description: "Informations détaillées sur le département",
}

// Fonction pour récupérer les données du département (simulée)
function getDepartmentData(id: string) {
  // Simuler des données de département
  const departments = [
    {
      id: "1",
      name: "Sciences",
      description: "Département des sciences fondamentales et appliquées",
      director: "Dr. Test Dpt",
      createdAt: "2020-09-01",
      professorCount: 45,
      studentCount: 1250,
      programCount: 8,
    },
    {
      id: "2",
      name: "Lettres",
      description: "Département des lettres, langues et sciences humaines",
      director: "Dr. Test Diop",
      createdAt: "2019-07-15",
      professorCount: 38,
      studentCount: 980,
      programCount: 6,
    },
    {
      id: "3",
      name: "Droit",
      description: "Département de droit et sciences politiques",
      director: "Dr. Test Dpt",
      createdAt: "2018-10-05",
      professorCount: 32,
      studentCount: 1100,
      programCount: 5,
    },
    {
      id: "4",
      name: "Économie",
      description: "Département d'économie et gestion",
      director: "Dr. Lamine Seck",
      createdAt: "2021-01-10",
      professorCount: 28,
      studentCount: 950,
      programCount: 7,
    },
  ]

  const department = departments.find((dept) => dept.id === id)
  return department
}

export default function DepartmentDetailPage({ params }: { params: { id: string } }) {
  const department = getDepartmentData(params.id)

  if (!department) {
    notFound()
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Link href="/departments">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Département {department.name}</h2>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Étudiants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{department.studentCount}</div>
                <p className="text-xs text-muted-foreground">
                  {department.studentCount > 1000 ? "Grand département" : "Département de taille moyenne"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Professeurs</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{department.professorCount}</div>
                <p className="text-xs text-muted-foreground">
                  Ratio: {(department.studentCount / department.professorCount).toFixed(1)} étudiants/prof
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Filières</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{department.programCount}</div>
                <p className="text-xs text-muted-foreground">Créé le {department.createdAt}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations du département</CardTitle>
              <CardDescription>Détails et description du département</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Nom</h4>
                  <p className="text-base">{department.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Directeur</h4>
                  <p className="text-base">{department.director}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                  <p className="text-base">{department.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="programs" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="programs">Filières</TabsTrigger>
                <TabsTrigger value="professors">Professeurs</TabsTrigger>
                <TabsTrigger value="students">Étudiants</TabsTrigger>
              </TabsList>
              <AddProgramDialog departmentId={department.id} departmentName={department.name} />
            </div>
            <TabsContent value="programs" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Filières du département</CardTitle>
                  <CardDescription>Liste des filières proposées par le département {department.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgramTable departmentId={department.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="professors" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Professeurs du département</CardTitle>
                  <CardDescription>Liste des professeurs rattachés au département {department.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cette section affichera la liste des professeurs du département.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="students" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Étudiants du département</CardTitle>
                  <CardDescription>Liste des étudiants inscrits au département {department.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cette section affichera la liste des étudiants du département.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
