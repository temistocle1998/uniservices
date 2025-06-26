"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { AttendanceSession, AttendanceStatus } from "@/lib/attendance-data"
import type { students } from "@/lib/data"

interface AttendanceRecordFormProps {
  session: AttendanceSession
}

interface StudentAttendance {
  studentId: string
  studentName: string
  status: AttendanceStatus
  notes: string
}

export default function AttendanceRecordForm({ session }: AttendanceRecordFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [studentAttendances, setStudentAttendances] = useState<StudentAttendance[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter students by the program of the course
  const [courseStudents, setCourseStudents] = useState<typeof students>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would be an API call
        const course = (await import("@/lib/data")).courses.find((c) => c.id === session.courseId)
        if (!course) throw new Error("Course not found")

        const programStudents = (await import("@/lib/data")).students.filter((s) => s.programId === course.programId)
        setCourseStudents(programStudents)

        // Check if attendance records already exist for this session
        const existingRecords = (await import("@/lib/attendance-data")).attendanceRecords.filter(
          (record) => record.courseId === session.courseId && record.sessionDate === session.date,
        )

        if (existingRecords.length > 0) {
          // Map existing records to student attendances
          const attendances = programStudents.map((student) => {
            const record = existingRecords.find((r) => r.studentId === student.id)
            return {
              studentId: student.id,
              studentName: `${student.firstName} ${student.lastName}`,
              status: record?.status || "present",
              notes: record?.notes || "",
            }
          })
          setStudentAttendances(attendances)
        } else {
          // Initialize with all students present
          const attendances = programStudents.map((student) => ({
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            status: "present" as AttendanceStatus,
            notes: "",
          }))
          setStudentAttendances(attendances)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [session])

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStudentAttendances((prev) => prev.map((item) => (item.studentId === studentId ? { ...item, status } : item)))
  }

  const handleNotesChange = (studentId: string, notes: string) => {
    setStudentAttendances((prev) => prev.map((item) => (item.studentId === studentId ? { ...item, notes } : item)))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update session status if it's not already completed
      if (session.status === "scheduled" || session.status === "in-progress") {
        // This would be an API call in a real app
        session.status = "completed"
      }

      // Success notification would go here
      router.push("/attendance")
    } catch (error) {
      console.error("Error submitting attendance:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMarkAll = (status: AttendanceStatus) => {
    setStudentAttendances((prev) => prev.map((item) => ({ ...item, status })))
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-64">
            <p>Chargement des données...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feuille de présence</CardTitle>
        <CardDescription>Enregistrez la présence des étudiants pour cette session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Button variant="outline" onClick={() => handleMarkAll("present")}>
            Tous présents
          </Button>
          <Button variant="outline" onClick={() => handleMarkAll("absent")}>
            Tous absents
          </Button>
        </div>

        {studentAttendances.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun étudiant inscrit à ce cours</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentAttendances.map((attendance) => (
                  <TableRow key={attendance.studentId}>
                    <TableCell className="font-medium">{attendance.studentName}</TableCell>
                    <TableCell>
                      <Select
                        value={attendance.status}
                        onValueChange={(value) => handleStatusChange(attendance.studentId, value as AttendanceStatus)}
                        disabled={session.status === "completed"}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Présent</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="excused">Excusé</SelectItem>
                          <SelectItem value="late">En retard</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="Notes (optionnel)"
                        value={attendance.notes}
                        onChange={(e) => handleNotesChange(attendance.studentId, e.target.value)}
                        className="h-10 min-h-0 resize-none"
                        disabled={session.status === "completed"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/attendance")}>
          Annuler
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || session.status === "completed"}>
          {isSubmitting
            ? "Enregistrement..."
            : session.status === "completed"
              ? "Déjà enregistré"
              : "Enregistrer les présences"}
        </Button>
      </CardFooter>
    </Card>
  )
}
