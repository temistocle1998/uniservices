"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { courses, programs } from "@/lib/data"
import CourseAttendanceReport from "./course-attendance-report"
import ProgramAttendanceReport from "./program-attendance-report"

export default function AttendanceReports() {
  const [reportType, setReportType] = useState<"course" | "program">("course")
  const [courseId, setCourseId] = useState<string>("")
  const [programId, setProgramId] = useState<string>("")
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)

  const handleGenerateReport = () => {
    // In a real app, this would trigger a report generation
    console.log("Generating report with filters:", {
      reportType,
      courseId,
      programId,
      fromDate,
      toDate,
    })
  }

  const handleExportReport = () => {
    // In a real app, this would trigger a report export
    console.log("Exporting report")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rapports d'assiduité</CardTitle>
        <CardDescription>Générez des rapports détaillés sur l'assiduité des étudiants</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={reportType} onValueChange={(value) => setReportType(value as "course" | "program")}>
          <TabsList className="mb-4">
            <TabsTrigger value="course">Par cours</TabsTrigger>
            <TabsTrigger value="program">Par filière</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap gap-4 mb-6">
            {reportType === "course" ? (
              <div className="flex-1 min-w-[200px]">
                <Select value={courseId} onValueChange={setCourseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un cours" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="flex-1 min-w-[200px]">
                <Select value={programId} onValueChange={setProgramId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une filière" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "dd/MM/yyyy") : <span>Date de début</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "dd/MM/yyyy") : <span>Date de fin</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleGenerateReport}>Générer le rapport</Button>
          </div>

          <TabsContent value="course">
            {courseId ? (
              <CourseAttendanceReport courseId={courseId} fromDate={fromDate} toDate={toDate} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-4">Veuillez sélectionner un cours pour générer un rapport</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="program">
            {programId ? (
              <ProgramAttendanceReport programId={programId} fromDate={fromDate} toDate={toDate} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-4">Veuillez sélectionner une filière pour générer un rapport</p>
              </div>
            )}
          </TabsContent>

          {(courseId || programId) && (
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={handleExportReport}>
                <Download className="mr-2 h-4 w-4" />
                Exporter en PDF
              </Button>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
