"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EnrollmentChart from "./enrollment-chart"
import DepartmentDistributionChart from "./department-distribution-chart"
import CoursePopularityChart from "./course-popularity-chart"
import RegistrationStatusChart from "./registration-status-chart"
import GenderDistributionChart from "./gender-distribution-chart"

export default function StatsDashboard() {
  const [selectedYear, setSelectedYear] = useState("2023-2024")

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
  }

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="students">Étudiants</TabsTrigger>
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="enrollments">Inscriptions</TabsTrigger>
        </TabsList>

        <select
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
        >
          <option value="2023-2024">Année académique 2023-2024</option>
          <option value="2022-2023">Année académique 2022-2023</option>
          <option value="all">Toutes les années</option>
        </select>
      </div>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Étudiants Inscrits</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-xs text-muted-foreground">+15% par rapport à l'année précédente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cours Actifs</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M15 6H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12" />
                <path d="m17 16 4-4-4-4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">458</div>
              <p className="text-xs text-muted-foreground">+12 nouveaux cours ce semestre</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+2.5% par rapport à l'année précédente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus des Inscriptions</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">+18% par rapport à l'année précédente</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Évolution des Inscriptions</CardTitle>
              <CardDescription>Nombre d'inscriptions et réinscriptions par mois</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <EnrollmentChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Répartition par Département</CardTitle>
              <CardDescription>Distribution des étudiants par département</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <DepartmentDistributionChart />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="students" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Évolution des Inscriptions</CardTitle>
              <CardDescription>Nombre d'inscriptions par mois</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <EnrollmentChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Répartition par Genre</CardTitle>
              <CardDescription>Distribution des étudiants par genre</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <GenderDistributionChart />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="courses" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Popularité des Cours</CardTitle>
              <CardDescription>Les cours les plus populaires par nombre d'inscriptions</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <CoursePopularityChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Statut des Inscriptions</CardTitle>
              <CardDescription>Répartition des inscriptions par statut</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <RegistrationStatusChart />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="enrollments" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Évolution des Inscriptions</CardTitle>
              <CardDescription>Nombre d'inscriptions par mois</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <EnrollmentChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Statut des Inscriptions</CardTitle>
              <CardDescription>Répartition des inscriptions par statut</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <RegistrationStatusChart />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
