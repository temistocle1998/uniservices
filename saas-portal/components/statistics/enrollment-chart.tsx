"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", inscriptions: 120, reinscriptions: 65 },
  { name: "Fév", inscriptions: 110, reinscriptions: 68 },
  { name: "Mar", inscriptions: 130, reinscriptions: 70 },
  { name: "Avr", inscriptions: 100, reinscriptions: 72 },
  { name: "Mai", inscriptions: 80, reinscriptions: 75 },
  { name: "Juin", inscriptions: 70, reinscriptions: 78 },
  { name: "Juil", inscriptions: 180, reinscriptions: 82 },
  { name: "Août", inscriptions: 220, reinscriptions: 85 },
  { name: "Sep", inscriptions: 270, reinscriptions: 90 },
  { name: "Oct", inscriptions: 250, reinscriptions: 95 },
  { name: "Nov", inscriptions: 210, reinscriptions: 100 },
  { name: "Déc", inscriptions: 150, reinscriptions: 110 },
]

export default function EnrollmentChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="inscriptions" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="reinscriptions" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}
