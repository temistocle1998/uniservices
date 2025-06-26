"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ClipboardCheck, Plus } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { AttendanceSession } from "@/lib/attendance-data"
import { courses } from "@/lib/data"
import AddAttendanceSessionDialog from "./add-attendance-session-dialog"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

export default function AttendanceSessionsTable() {
  const router = useRouter()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [courseFilter, setCourseFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [sessions, setSessions] = useState<AttendanceSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Simulate data loading
  useEffect(() => {
    import("@/lib/attendance-data").then(({ attendanceSessions }) => {
      setSessions(attendanceSessions)
      setIsLoading(false)
    })
  }, [])

  // Apply filters
  const filteredSessions = sessions.filter((session) => {
    if (courseFilter && courseFilter !== "all" && session.courseId !== courseFilter) return false
    if (dateFilter && session.date !== format(dateFilter, "yyyy-MM-dd")) return false
    if (statusFilter && statusFilter !== "all" && session.status !== statusFilter) return false
    return true
  })

  // Pagination logic
  const totalItems = filteredSessions.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const currentItems = filteredSessions.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [courseFilter, dateFilter, statusFilter])

  const handleRecordAttendance = (sessionId: string) => {
    router.push(`/attendance/sessions/${sessionId}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sessions de Cours</CardTitle>
            <CardDescription>Gérez les sessions de cours et enregistrez les présences</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Session
          </Button>
        </div>
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
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "PPP", { locale: fr }) : <span>Filtrer par date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="scheduled">Programmée</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(dateFilter || courseFilter || statusFilter) && (
            <Button
              variant="ghost"
              onClick={() => {
                setDateFilter(undefined)
                setCourseFilter("")
                setStatusFilter("")
              }}
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Chargement des sessions...</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground mb-4">Aucune session trouvée avec les filtres actuels</p>
            {(dateFilter || courseFilter || statusFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setDateFilter(undefined)
                  setCourseFilter("")
                  setStatusFilter("")
                }}
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cours</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Horaire</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.courseName}</TableCell>
                      <TableCell>{format(new Date(session.date), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        {session.startTime} - {session.endTime}
                      </TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>
                        <span
                          className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
                            "bg-yellow-100 text-yellow-800": session.status === "scheduled",
                            "bg-blue-100 text-blue-800": session.status === "in-progress",
                            "bg-green-100 text-green-800": session.status === "completed",
                            "bg-red-100 text-red-800": session.status === "cancelled",
                          })}
                        >
                          {session.status === "scheduled" && "Programmée"}
                          {session.status === "in-progress" && "En cours"}
                          {session.status === "completed" && "Terminée"}
                          {session.status === "cancelled" && "Annulée"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRecordAttendance(session.id)}
                          disabled={session.status === "cancelled"}
                        >
                          <ClipboardCheck className="mr-2 h-4 w-4" />
                          {session.status === "completed" ? "Voir présences" : "Enregistrer présences"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination component */}
            {totalItems > 0 && (
              <div className="mt-4">
                <DataTablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={totalItems}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
      <AddAttendanceSessionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSessionAdded={(newSession) => {
          setSessions([...sessions, newSession])
        }}
      />
    </Card>
  )
}
