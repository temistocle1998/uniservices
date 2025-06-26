"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { courses, programs, departments } from "@/lib/data"
import { attendanceRecords } from "@/lib/attendance-data"

export default function AttendanceStats() {
  const [courseId, setCourseId] = useState<string>("")
  const [programId, setProgramId] = useState<string>("")
  const [departmentId, setDepartmentId] = useState<string>("")

  // Sample data for charts
  const statusData = [
    { name: "Présent", value: 0, color: "#22c55e" },
    { name: "Absent", value: 0, color: "#ef4444" },
    { name: "Excusé", value: 0, color: "#eab308" },
    { name: "En retard", value: 0, color: "#3b82f6" },
  ]

  const [pieData, setPieData] = useState(statusData)
  const [barData, setBarData] = useState<any[]>([])

  useEffect(() => {
    // Calculate statistics based on filters
    const calculateStats = () => {
      // Filter records based on selected filters
      let filteredRecords = [...attendanceRecords]

      if (courseId) {
        filteredRecords = filteredRecords.filter((record) => record.courseId === courseId)
      }

      if (programId || departmentId) {
        // Get courses for the selected program or department
        let filteredCourseIds: string[] = []

        if (programId) {
          filteredCourseIds = courses.filter((course) => course.programId === programId).map((course) => course.id)
        } else if (departmentId) {
          const departmentProgramIds = programs
            .filter((program) => program.departmentId === departmentId)
            .map((program) => program.id)

          filteredCourseIds = courses
            .filter((course) => departmentProgramIds.includes(course.programId))
            .map((course) => course.id)
        }

        filteredRecords = filteredRecords.filter((record) => filteredCourseIds.includes(record.courseId))
      }

      // Count by status for pie chart
      const present = filteredRecords.filter((r) => r.status === "present").length
      const absent = filteredRecords.filter((r) => r.status === "absent").length
      const excused = filteredRecords.filter((r) => r.status === "excused").length
      const late = filteredRecords.filter((r) => r.status === "late").length

      setPieData([
        { name: "Présent", value: present, color: "#22c55e" },
        { name: "Absent", value: absent, color: "#ef4444" },
        { name: "Excusé", value: excused, color: "#eab308" },
        { name: "En retard", value: late, color: "#3b82f6" },
      ])

      // Group by month for bar chart
      const recordsByMonth: Record<
        string,
        { month: string; present: number; absent: number; excused: number; late: number }
      > = {}

      filteredRecords.forEach((record) => {
        const date = new Date(record.sessionDate)
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
        const monthName = date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" })

        if (!recordsByMonth[monthKey]) {
          recordsByMonth[monthKey] = {
            month: monthName,
            present: 0,
            absent: 0,
            excused: 0,
            late: 0,
          }
        }

        recordsByMonth[monthKey][record.status]++
      })

      setBarData(Object.values(recordsByMonth))
    }

    calculateStats()
  }, [courseId, programId, departmentId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques d'assiduité</CardTitle>
        <CardDescription>Visualisez les tendances d'assiduité par cours, filière ou département</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <Select value={courseId} onValueChange={setCourseId}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par cours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les cours</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select
              value={programId}
              onValueChange={(value) => {
                setProgramId(value)
                if (value) setDepartmentId("")
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par filière" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les filières</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select
              value={departmentId}
              onValueChange={(value) => {
                setDepartmentId(value)
                if (value) setProgramId("")
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Répartition des statuts</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} enregistrements`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Statistiques globales</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Taux de présence</span>
                      <span className="text-sm font-medium">
                        {pieData[0].value > 0
                          ? ((pieData[0].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        pieData[0].value > 0
                          ? (pieData[0].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Taux d'absence</span>
                      <span className="text-sm font-medium">
                        {pieData[1].value > 0
                          ? ((pieData[1].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        pieData[1].value > 0
                          ? (pieData[1].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100
                          : 0
                      }
                      className="h-2 bg-red-100"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Taux d'excuses</span>
                      <span className="text-sm font-medium">
                        {pieData[2].value > 0
                          ? ((pieData[2].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        pieData[2].value > 0
                          ? (pieData[2].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100
                          : 0
                      }
                      className="h-2 bg-yellow-100"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Taux de retard</span>
                      <span className="text-sm font-medium">
                        {pieData[3].value > 0
                          ? ((pieData[3].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        pieData[3].value > 0
                          ? (pieData[3].value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100
                          : 0
                      }
                      className="h-2 bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <div>
              <h3 className="text-lg font-medium mb-4">Évolution mensuelle</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" name="Présent" fill="#22c55e" />
                    <Bar dataKey="absent" name="Absent" fill="#ef4444" />
                    <Bar dataKey="excused" name="Excusé" fill="#eab308" />
                    <Bar dataKey="late" name="En retard" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
