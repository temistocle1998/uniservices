"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { YearSelector } from "./year-selector"

// Données fictives pour la répartition par département et par année
const departmentData = {
  "2023-2024": [
    { name: "Informatique", etudiants: 3500 },
    { name: "Mathématiques", etudiants: 2800 },
    { name: "Physique", etudiants: 2200 },
    { name: "Économie", etudiants: 2000 },
    { name: "Langues", etudiants: 2043 },
  ],
  "2022-2023": [
    { name: "Informatique", etudiants: 3200 },
    { name: "Mathématiques", etudiants: 2600 },
    { name: "Physique", etudiants: 2100 },
    { name: "Économie", etudiants: 1900 },
    { name: "Langues", etudiants: 1950 },
  ],
  "2021-2022": [
    { name: "Informatique", etudiants: 2900 },
    { name: "Mathématiques", etudiants: 2400 },
    { name: "Physique", etudiants: 2000 },
    { name: "Économie", etudiants: 1800 },
    { name: "Langues", etudiants: 1850 },
  ],
}

// Fonction pour transformer les données pour la comparaison
const transformDataForComparison = (selectedYears: string[]) => {
  const departments = ["Informatique", "Mathématiques", "Physique", "Économie", "Langues"]

  return departments.map((dept) => {
    const result: any = { name: dept }

    selectedYears.forEach((year) => {
      const yearData = departmentData[year as keyof typeof departmentData]
      if (yearData) {
        const deptData = yearData.find((d) => d.name === dept)
        if (deptData) {
          result[year] = deptData.etudiants
        }
      }
    })

    return result
  })
}

// Couleurs pour les différentes années
const yearColors = {
  "2023-2024": "#8884d8",
  "2022-2023": "#82ca9d",
  "2021-2022": "#ffc658",
}

export default function DepartmentComparisonChart() {
  const [selectedYears, setSelectedYears] = useState<string[]>(["2023-2024", "2022-2023"])

  const handleYearChange = (years: string) => {
    setSelectedYears(years.split(","))
  }

  const data = transformDataForComparison(selectedYears)

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Comparaison des départements par année</CardTitle>
          <CardDescription>Évolution du nombre d'étudiants par département</CardDescription>
        </div>
        <YearSelector onYearChange={handleYearChange} multiple={true} />
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} étudiants`, "Nombre d'étudiants"]} />
            <Legend />
            {selectedYears.map((year) => (
              <Bar
                key={year}
                dataKey={year}
                name={`Année ${year}`}
                fill={yearColors[year as keyof typeof yearColors] || "#8884d8"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
