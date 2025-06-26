"use client"

import React from "react"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { YearSelector } from "./year-selector"

// Données fictives pour les inscriptions par année académique
const enrollmentData = {
  "2023-2024": [
    { month: "Sep", inscriptions: 270, reinscriptions: 90 },
    { month: "Oct", inscriptions: 250, reinscriptions: 95 },
    { month: "Nov", inscriptions: 210, reinscriptions: 100 },
    { month: "Déc", inscriptions: 150, reinscriptions: 110 },
    { month: "Jan", inscriptions: 120, reinscriptions: 65 },
    { month: "Fév", inscriptions: 110, reinscriptions: 68 },
    { month: "Mar", inscriptions: 130, reinscriptions: 70 },
    { month: "Avr", inscriptions: 100, reinscriptions: 72 },
    { month: "Mai", inscriptions: 80, reinscriptions: 75 },
    { month: "Juin", inscriptions: 70, reinscriptions: 78 },
    { month: "Juil", inscriptions: 180, reinscriptions: 82 },
    { month: "Août", inscriptions: 220, reinscriptions: 85 },
  ],
  "2022-2023": [
    { month: "Sep", inscriptions: 250, reinscriptions: 85 },
    { month: "Oct", inscriptions: 230, reinscriptions: 90 },
    { month: "Nov", inscriptions: 200, reinscriptions: 95 },
    { month: "Déc", inscriptions: 140, reinscriptions: 100 },
    { month: "Jan", inscriptions: 110, reinscriptions: 60 },
    { month: "Fév", inscriptions: 100, reinscriptions: 65 },
    { month: "Mar", inscriptions: 120, reinscriptions: 68 },
    { month: "Avr", inscriptions: 90, reinscriptions: 70 },
    { month: "Mai", inscriptions: 75, reinscriptions: 72 },
    { month: "Juin", inscriptions: 65, reinscriptions: 75 },
    { month: "Juil", inscriptions: 170, reinscriptions: 78 },
    { month: "Août", inscriptions: 210, reinscriptions: 80 },
  ],
  "2021-2022": [
    { month: "Sep", inscriptions: 230, reinscriptions: 80 },
    { month: "Oct", inscriptions: 210, reinscriptions: 85 },
    { month: "Nov", inscriptions: 190, reinscriptions: 90 },
    { month: "Déc", inscriptions: 130, reinscriptions: 95 },
    { month: "Jan", inscriptions: 100, reinscriptions: 55 },
    { month: "Fév", inscriptions: 90, reinscriptions: 60 },
    { month: "Mar", inscriptions: 110, reinscriptions: 65 },
    { month: "Avr", inscriptions: 85, reinscriptions: 68 },
    { month: "Mai", inscriptions: 70, reinscriptions: 70 },
    { month: "Juin", inscriptions: 60, reinscriptions: 72 },
    { month: "Juil", inscriptions: 160, reinscriptions: 75 },
    { month: "Août", inscriptions: 200, reinscriptions: 78 },
  ],
}

// Fonction pour transformer les données pour la comparaison
const transformDataForComparison = (selectedYears: string[]) => {
  const months = ["Sep", "Oct", "Nov", "Déc", "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août"]

  return months.map((month) => {
    const result: any = { month }

    selectedYears.forEach((year) => {
      const yearData = enrollmentData[year as keyof typeof enrollmentData]
      if (yearData) {
        const monthData = yearData.find((m) => m.month === month)
        if (monthData) {
          result[`inscriptions_${year}`] = monthData.inscriptions
          result[`reinscriptions_${year}`] = monthData.reinscriptions
        }
      }
    })

    return result
  })
}

// Couleurs pour les différentes années
const yearColors = {
  "2023-2024": { inscriptions: "#8884d8", reinscriptions: "#82ca9d" },
  "2022-2023": { inscriptions: "#ffc658", reinscriptions: "#ff8042" },
  "2021-2022": { inscriptions: "#0088fe", reinscriptions: "#00c49f" },
}

export default function EnrollmentComparisonChart() {
  const [selectedYears, setSelectedYears] = useState<string[]>(["2023-2024", "2022-2023"])
  const [showInscriptions, setShowInscriptions] = useState(true)
  const [showReinscriptions, setShowReinscriptions] = useState(true)

  const handleYearChange = (years: string) => {
    setSelectedYears(years.split(","))
  }

  const data = transformDataForComparison(selectedYears)

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Comparaison des inscriptions par année</CardTitle>
          <CardDescription>Évolution mensuelle des inscriptions et réinscriptions</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <YearSelector onYearChange={handleYearChange} multiple={true} />
          <div className="flex items-center space-x-2 ml-4">
            <label className="flex items-center space-x-1 text-sm">
              <input
                type="checkbox"
                checked={showInscriptions}
                onChange={() => setShowInscriptions(!showInscriptions)}
                className="rounded text-primary"
              />
              <span>Inscriptions</span>
            </label>
            <label className="flex items-center space-x-1 text-sm">
              <input
                type="checkbox"
                checked={showReinscriptions}
                onChange={() => setShowReinscriptions(!showReinscriptions)}
                className="rounded text-primary"
              />
              <span>Réinscriptions</span>
            </label>
          </div>
        </div>
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
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                const parts = name.split("_")
                const type = parts[0]
                const year = parts.slice(1).join("-")
                return [`${value} étudiants`, `${type === "inscriptions" ? "Inscriptions" : "Réinscriptions"} ${year}`]
              }}
            />
            <Legend
              formatter={(value) => {
                const parts = value.split("_")
                const type = parts[0]
                const year = parts.slice(1).join("-")
                return `${type === "inscriptions" ? "Inscriptions" : "Réinscriptions"} ${year}`
              }}
            />
            {selectedYears.map((year) => (
              <React.Fragment key={year}>
                {showInscriptions && (
                  <Bar
                    key={`inscriptions_${year}`}
                    dataKey={`inscriptions_${year}`}
                    name={`inscriptions_${year}`}
                    fill={yearColors[year as keyof typeof yearColors]?.inscriptions || "#8884d8"}
                  />
                )}
                {showReinscriptions && (
                  <Bar
                    key={`reinscriptions_${year}`}
                    dataKey={`reinscriptions_${year}`}
                    name={`reinscriptions_${year}`}
                    fill={yearColors[year as keyof typeof yearColors]?.reinscriptions || "#82ca9d"}
                  />
                )}
              </React.Fragment>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
