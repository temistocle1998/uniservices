"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { AttendanceRecord } from "@/lib/attendance-data"
import { courses } from "@/lib/data"

interface StudentAttendanceTableProps {
  studentId: string
}

export default function StudentAttendanceTable({ studentId }: StudentAttendanceTableProps) {
  const [courseFilter, setCourseFilter] = useState<string>("")
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would be an API call
        const { getAttendanceRecords } = await import("@/lib/attendance-data")
        const studentRecords = await getAttendanceRecords(undefined, studentId, courseFilter || undefined)
        setRecords(studentRecords)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading attendance records:", error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [studentId, courseFilter])

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "present":
        return "Présent"
      case "absent":
        return "Absent"
      case "excused":
        return "Excusé"
      case "late":
        return "En retard"
      default:
        return status
    }
  }

  const getStatusClass = (status: string) => {
    return cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
      "bg-green-100 text-green-800": status === "present",
      "bg-red-100 text-red-800": status === "absent",
      "bg-yellow-100 text-yellow-800": status === "excused",
      "bg-blue-100 text-blue-800": status === "late",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des présences</CardTitle>
        <CardDescription>Consultez l'historique des présences de l'étudiant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
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
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Chargement des données...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground">
              Aucun enregistrement de présence trouvé
              {courseFilter && " pour ce cours"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => {
                  const course = courses.find((c) => c.id === record.courseId)
                  return (
                    <TableRow key={record.id}>
                      <TableCell>{format(new Date(record.sessionDate), "PPP", { locale: fr })}</TableCell>
                      <TableCell>{course ? `${course.code} - {course.name}` : record.courseId}</TableCell>
                      <TableCell>
                        <span className={getStatusClass(record.status)}>{getStatusLabel(record.status)}</span>
                      </TableCell>
                      <TableCell>{record.notes || "-"}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
