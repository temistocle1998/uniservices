"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getCourse, getStudents } from "@/lib/data"
import { getAttendanceRecords, getAttendanceSessions, getCourseAttendanceStats } from "@/lib/attendance-data"

interface CourseAttendanceReportProps {
  courseId: string
  fromDate?: Date
  toDate?: Date
}

interface StudentAttendance {
  studentId: string
  studentName: string
  present: number
  absent: number
  excused: number
  late: number
  total: number
  attendanceRate: number
}

export default function CourseAttendanceReport({ courseId, fromDate, toDate }: CourseAttendanceReportProps) {
  const [course, setCourse] = useState<any>(null)
  const [sessions, setSessions] = useState<any[]>([])
  const [studentAttendances, setStudentAttendances] = useState<StudentAttendance[]>([])
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, these would be API calls
        const courseData = await getCourse(courseId)
        setCourse(courseData)

        const sessionsData = await getAttendanceSessions(
          courseId,
          fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
          toDate ? format(toDate, "yyyy-MM-dd") : undefined,
        )
        setSessions(sessionsData)

        const courseStats = await getCourseAttendanceStats(courseId)
        setStats(courseStats)

        // Get students for this course's program
        const programStudents = await getStudents(courseData?.programId)

        // Calculate attendance for each student
        const studentStats: StudentAttendance[] = []

        for (const student of programStudents) {
          const records = await getAttendanceRecords(
            undefined,
            student.id,
            courseId,
            fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
            toDate ? format(toDate, "yyyy-MM-dd") : undefined,
          )

          const total = records.length
          const present = records.filter((r) => r.status === "present").length
          const absent = records.filter((r) => r.status === "absent").length
          const excused = records.filter((r) => r.status === "excused").length
          const late = records.filter((r) => r.status === "late").length

          studentStats.push({
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            present,
            absent,
            excused,
            late,
            total,
            attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
          })
        }

        setStudentAttendances(studentStats)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading course attendance data:", error)
        setIsLoading(false)
      }
    }

    if (courseId) {
      loadData()
    }
  }, [courseId, fromDate, toDate])

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Chargement des données...</p>
        </div>
      ) : !course ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground">Cours non trouvé</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium">
              {course.name} ({course.code})
            </h3>
            <p className="text-sm text-muted-foreground">
              {sessions.length} sessions
              {fromDate && toDate && (
                <>
                  {" "}
                  du {format(fromDate, "dd/MM/yyyy")} au {format(toDate, "dd/MM/yyyy")}
                </>
              )}
              {fromDate && !toDate && <> à partir du {format(fromDate, "dd/MM/yyyy")}</>}
              {!fromDate && toDate && <> jusqu'au {format(toDate, "dd/MM/yyyy")}</>}
            </p>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Taux de présence global</p>
                <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
                <Progress value={stats.attendanceRate} className="h-2 mt-2" />
              </div>
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Présences</p>
                <p className="text-2xl font-bold">{stats.present}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats.present / stats.total) * 100).toFixed(1)}% du total
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Absences</p>
                <p className="text-2xl font-bold">{stats.absent}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats.absent / stats.total) * 100).toFixed(1)}% du total
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Retards</p>
                <p className="text-2xl font-bold">{stats.late}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats.late / stats.total) * 100).toFixed(1)}% du total
                </p>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead className="text-right">Présences</TableHead>
                  <TableHead className="text-right">Absences</TableHead>
                  <TableHead className="text-right">Excusés</TableHead>
                  <TableHead className="text-right">Retards</TableHead>
                  <TableHead className="text-right">Taux</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentAttendances.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell className="font-medium">{student.studentName}</TableCell>
                    <TableCell className="text-right">{student.present}</TableCell>
                    <TableCell className="text-right">{student.absent}</TableCell>
                    <TableCell className="text-right">{student.excused}</TableCell>
                    <TableCell className="text-right">{student.late}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
                          "bg-green-100 text-green-800": student.attendanceRate >= 90,
                          "bg-yellow-100 text-yellow-800": student.attendanceRate >= 75 && student.attendanceRate < 90,
                          "bg-red-100 text-red-800": student.attendanceRate < 75,
                        })}
                      >
                        {student.attendanceRate}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}
