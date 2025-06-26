import type { Metadata } from "next"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Analytique | Gestion Universitaire",
  description: "Tableau de bord analytique avancé",
}

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytique</h2>
          <div className="flex items-center space-x-2">
            <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
              <option>Année académique 2023-2024</option>
              <option>Année académique 2022-2023</option>
              <option>Toutes les années</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="predictions">Prédictions</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78.5%</div>
                  <p className="text-xs text-muted-foreground">+2.1% par rapport à l'année précédente</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taux de rétention</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.3%</div>
                  <p className="text-xs text-muted-foreground">+1.2% par rapport à l'année précédente</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14.2/20</div>
                  <p className="text-xs text-muted-foreground">+0.3 par rapport à l'année précédente</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taux d'assiduité</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.6%</div>
                  <p className="text-xs text-muted-foreground">-1.4% par rapport à l'année précédente</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Performance par département</CardTitle>
                  <CardDescription>Taux de réussite par département</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <Activity className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Performance par programme</CardTitle>
                  <CardDescription>Taux de réussite par programme</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <Activity className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prévisions d'inscriptions</CardTitle>
                <CardDescription>Prévisions pour les 3 prochaines années académiques</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="flex h-full items-center justify-center">
                  <Activity className="h-16 w-16 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tendances des programmes</CardTitle>
                  <CardDescription>Prévisions de popularité des programmes</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <Activity className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Prévisions budgétaires</CardTitle>
                  <CardDescription>Projections financières basées sur les inscriptions</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <Activity className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports générés</CardTitle>
                <CardDescription>Rapports récemment générés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rapport de performance annuel</p>
                      <p className="text-xs text-muted-foreground">Généré le 15/04/2024</p>
                    </div>
                    <button className="h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground">
                      Télécharger
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rapport d'inscriptions semestriel</p>
                      <p className="text-xs text-muted-foreground">Généré le 10/04/2024</p>
                    </div>
                    <button className="h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground">
                      Télécharger
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rapport financier</p>
                      <p className="text-xs text-muted-foreground">Généré le 05/04/2024</p>
                    </div>
                    <button className="h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground">
                      Télécharger
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rapport de réussite par département</p>
                      <p className="text-xs text-muted-foreground">Généré le 01/04/2024</p>
                    </div>
                    <button className="h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground">
                      Télécharger
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Générer un nouveau rapport</CardTitle>
                <CardDescription>Créer un rapport personnalisé</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="report-type" className="text-sm font-medium">
                      Type de rapport
                    </label>
                    <select
                      id="report-type"
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option>Rapport de performance</option>
                      <option>Rapport d'inscriptions</option>
                      <option>Rapport financier</option>
                      <option>Rapport de réussite</option>
                      <option>Rapport personnalisé</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="period" className="text-sm font-medium">
                      Période
                    </label>
                    <select
                      id="period"
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option>Année académique 2023-2024</option>
                      <option>Année académique 2022-2023</option>
                      <option>Semestre en cours</option>
                      <option>Semestre précédent</option>
                      <option>Personnalisé</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="format" className="text-sm font-medium">
                      Format
                    </label>
                    <select
                      id="format"
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                    </select>
                  </div>
                  <button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                    Générer le rapport
                  </button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
