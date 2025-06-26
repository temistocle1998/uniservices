"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Approuvées", value: 8500 },
  { name: "En attente", value: 2800 },
  { name: "Rejetées", value: 1200 },
  { name: "Annulées", value: 500 },
]

const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#9E9E9E"]

export default function RegistrationStatusChart() {
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
        <Tooltip formatter={(value) => [`${value} inscriptions`, "Nombre"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
