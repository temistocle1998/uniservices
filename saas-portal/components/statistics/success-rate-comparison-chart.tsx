"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { YearSelector } from "./year-selector"

// Données fictives pour les taux de réussite par département et par ann��e
const successRateData = {
  "2023-2024": [
    { name: "Informatique", taux: 78 },
    { name: "Mathématiques", taux: 72 },
    { name: "Physique", taux: 75 },
    { name: "Économie", taux: 80 },
    { name: "Langues", taux: 85 },
  ],
  "2022-2023": [
    { name: "Informatique", taux: 76 },
    { name: "Mathématiques", taux: 70 },
    { name: "Physique", taux: 73 },
    { name: "Économie", taux: 78 },
    { name: "Langues", taux: 83 },
  ],
  "2021-2022": [
    { name: "Informatique", taux: 74 },
    { name: "Mathématiques", taux: 68 },
    { name: "Physique", taux: 71 },
    { name: "Économie", taux: 76 },
    { name: "Langues", taux: 81 },
  ],
}

// Fonction pour transformer les données pour la comparaison
const transformDataForComparison = (selectedYears: string[]) => {
  const departments = ["Informatique", "Mathématiques", "Physique", "Économie", "Langues"]

  return departments.map((dept) => {
    const result: any = { name: dept }

    selectedYears.forEach((year) => {
      const yearData = successRateData[year as keyof typeof successRateData]
      if (yearData) {
        const deptData = yearData.find((d) => d.name === dept)
        if (deptData) {
          result[year] = deptData.taux
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

export default function SuccessRateComparisonChart() {
  const [selectedYears, setSelectedYears] = useState<string[]>(["2023-2024", "2022-2023", "2021-2022"])

  const handleYearChange = (years: string) => {
    setSelectedYears(years.split(","))
  }

  const data = transformDataForComparison(selectedYears)

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Comparaison des taux de réussite</CardTitle>
          <CardDescription>Évolution des taux de réussite par département</CardDescription>
        </div>
        <YearSelector onYearChange={handleYearChange} multiple={true} />
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, "Taux de réussite"]} />
            <Legend />
            {selectedYears.map((year) => (
              <Line
                key={year}
                type="monotone"
                dataKey={year}
                name={`Année ${year}`}
                stroke={yearColors[year as keyof typeof yearColors] || "#8884d8"}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
