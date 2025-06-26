"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getProgram, getStudents, getCourses } from "@/lib/data"
import { getAttendanceRecords } from "@/lib/attendance-data"

interface ProgramAttendanceReportProps {
  programId: string
  fromDate?: Date
  toDate?: Date
}

interface CourseAttendance {
  courseId: string
  courseName: string
  courseCode: string
  present: number
  absent: number
  excused: number
  late: number
  total: number
  attendanceRate: number
}

export default function ProgramAttendanceReport({ programId, fromDate, toDate }: ProgramAttendanceReportProps) {
  const [program, setProgram] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [courseAttendances, setCourseAttendances] = useState<CourseAttendance[]>([])
  const [overallStats, setOverallStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, these would be API calls
        const programData = await getProgram(programId)
        setProgram(programData)

        const programStudents = await getStudents(programId)
        setStudents(programStudents)

        const programCourses = await getCourses(programId)

        // Calculate attendance for each course
        const courseStats: CourseAttendance[] = []
        let totalPresent = 0
        let totalAbsent = 0
        let totalExcused = 0
        let totalLate = 0
        let totalRecords = 0

        for (const course of programCourses) {
          let coursePresent = 0
          let courseAbsent = 0
          let courseExcused = 0
          let courseLate = 0
          let courseTotal = 0

          for (const student of programStudents) {
            const records = await getAttendanceRecords(
              undefined,
              student.id,
              course.id,
              fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
              toDate ? format(toDate, "yyyy-MM-dd") : undefined,
            )

            coursePresent += records.filter((r) => r.status === "present").length
            courseAbsent += records.filter((r) => r.status === "absent").length
            courseExcused += records.filter((r) => r.status === "excused").length
            courseLate += records.filter((r) => r.status === "late").length
            courseTotal += records.length
          }

          totalPresent += coursePresent
          totalAbsent += courseAbsent
          totalExcused += courseExcused
          totalLate += courseLate
          totalRecords += courseTotal

          courseStats.push({
            courseId: course.id,
            courseName: course.name,
            courseCode: course.code,
            present: coursePresent,
            absent: courseAbsent,
            excused: courseExcused,
            late: courseLate,
            total: courseTotal,
            attendanceRate: courseTotal > 0 ? Math.round((coursePresent / courseTotal) * 100) : 0,
          })
        }

        setCourseAttendances(courseStats)

        setOverallStats({
          present: totalPresent,
          absent: totalAbsent,
          excused: totalExcused,
          late: totalLate,
          total: totalRecords,
          attendanceRate: totalRecords > 0 ? Math.round((totalPresent / totalRecords) * 100) : 0,
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading program attendance data:", error)
        setIsLoading(false)
      }
    }

    if (programId) {
      loadData()
    }
  }, [programId, fromDate, toDate])

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Chargement des données...</p>
        </div>
      ) : !program ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground">Filière non trouvée</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium">{program.name}</h3>
            <p className="text-sm text-muted-foreground">
              {students.length} étudiants, {courseAttendances.length} cours
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

          {overallStats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Taux de présence global</p>
                <p className="text-2xl font-bold">{overallStats.attendanceRate}%</p>
                <Progress value={overallStats.attendanceRate} className="h-2 mt-2" />
              </div>
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Présences</p>
                <p className="text-2xl font-bold">{overallStats.present}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((overallStats.present / overallStats.total) * 100).toFixed(1)}% du total
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Absences</p>
                <p className="text-2xl font-bold">{overallStats.absent}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((overallStats.absent / overallStats.total) * 100).toFixed(1)}% du total
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1">Retards</p>
                <p className="text-2xl font-bold">{overallStats.late}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((overallStats.late / overallStats.total) * 100).toFixed(1)}% du total
                </p>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cours</TableHead>
                  <TableHead className="text-right">Présences</TableHead>
                  <TableHead className="text-right">Absences</TableHead>
                  <TableHead className="text-right">Excusés</TableHead>
                  <TableHead className="text-right">Retards</TableHead>
                  <TableHead className="text-right">Taux</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseAttendances.map((course) => (
                  <TableRow key={course.courseId}>
                    <TableCell className="font-medium">
                      {course.courseCode} - {course.courseName}
                    </TableCell>
                    <TableCell className="text-right">{course.present}</TableCell>
                    <TableCell className="text-right">{course.absent}</TableCell>
                    <TableCell className="text-right">{course.excused}</TableCell>
                    <TableCell className="text-right">{course.late}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
                          "bg-green-100 text-green-800": course.attendanceRate >= 90,
                          "bg-yellow-100 text-yellow-800": course.attendanceRate >= 75 && course.attendanceRate < 90,
                          "bg-red-100 text-red-800": course.attendanceRate < 75,
                        })}
                      >
                        {course.attendanceRate}%
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
