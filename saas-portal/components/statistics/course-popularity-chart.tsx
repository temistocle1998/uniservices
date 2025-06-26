"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "INFO101", etudiants: 320 },
  { name: "MATH101", etudiants: 280 },
  { name: "ECON101", etudiants: 250 },
  { name: "PHYS101", etudiants: 220 },
  { name: "INFO102", etudiants: 210 },
]

export default function CoursePopularityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} étudiants`, "Nombre d'inscriptions"]} />
        <Legend />
        <Bar dataKey="etudiants" fill="#8884d8" name="Nombre d'étudiants" />
      </BarChart>
    </ResponsiveContainer>
  )
}
