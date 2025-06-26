"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Hommes", value: 6500 },
  { name: "Femmes", value: 5800 },
  { name: "Autre", value: 243 },
]

const COLORS = ["#0088FE", "#FF8042", "#00C49F"]

export default function GenderDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} étudiants`, "Nombre"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
