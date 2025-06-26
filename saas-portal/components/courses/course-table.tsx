"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Edit, Trash2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

interface CourseTableProps {
  courses: any[]
  onEdit: (course: any) => void
  onDelete: (course: any) => void
}

export function CourseTable({ courses, onEdit, onDelete }: CourseTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const router = useRouter()

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination logic
  const totalItems = filteredCourses.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const currentItems = filteredCourses.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const viewCourseDetails = (id: string) => {
    router.push(`/courses/${id}`)
  }

  return (
    <div className="w-full max-w-full overflow-hidden space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <Input placeholder="Search courses..." value={searchTerm} onChange={handleSearchChange} className="max-w-sm" />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Code</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[80px]">Credits</TableHead>
                <TableHead className="w-[150px]">Department</TableHead>
                <TableHead className="w-[180px]">Program</TableHead>
                <TableHead className="w-[150px]">Instructor</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No courses found.
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{course.name}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{course.department}</TableCell>
                    <TableCell className="max-w-[180px] truncate">{course.program}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{course.instructor}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => viewCourseDetails(course.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onEdit(course)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(course)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination component */}
      {totalItems > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  )
}
