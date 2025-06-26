"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CourseTable } from "@/components/courses/course-table"
import { AddCourseDialog } from "@/components/courses/add-course-dialog"
import { EditCourseDialog } from "@/components/courses/edit-course-dialog"
import { DeleteCourseDialog } from "@/components/courses/delete-course-dialog"

// Sample data for courses
const initialCourses = [
  {
    id: "1",
    code: "MATH101",
    name: "Introduction to Mathematics",
    credits: 3,
    department: "Mathematics",
    program: "Bachelor of Science",
    semester: "Fall 2023",
    instructor: "Dr. John Smith",
    description: "Fundamental concepts of mathematics including algebra, geometry, and calculus.",
  },
  {
    id: "2",
    code: "CS201",
    name: "Data Structures",
    credits: 4,
    department: "Computer Science",
    program: "Bachelor of Computer Science",
    semester: "Spring 2023",
    instructor: "Prof. Jane Doe",
    description: "Study of data structures and algorithms for efficient data manipulation.",
  },
  {
    id: "3",
    code: "BIO150",
    name: "Cell Biology",
    credits: 3,
    department: "Biology",
    program: "Bachelor of Science",
    semester: "Fall 2023",
    instructor: "Dr. Michael Brown",
    description: "Introduction to the structure and function of cells.",
  },
  {
    id: "4",
    code: "ENG102",
    name: "Academic Writing",
    credits: 2,
    department: "English",
    program: "General Education",
    semester: "Spring 2023",
    instructor: "Prof. Sarah Wilson",
    description: "Development of academic writing skills and critical thinking.",
  },
  {
    id: "5",
    code: "PHYS201",
    name: "Classical Mechanics",
    credits: 4,
    department: "Physics",
    program: "Bachelor of Science",
    semester: "Fall 2023",
    instructor: "Dr. Robert Johnson",
    description: "Study of motion and forces in classical physics.",
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  const handleAddCourse = (course: any) => {
    const newCourse = {
      ...course,
      id: (courses.length + 1).toString(),
    }
    setCourses([...courses, newCourse])
    setIsAddDialogOpen(false)
  }

  const handleEditCourse = (course: any) => {
    setCourses(courses.map((c) => (c.id === course.id ? course : c)))
    setIsEditDialogOpen(false)
    setSelectedCourse(null)
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
    setIsDeleteDialogOpen(false)
    setSelectedCourse(null)
  }

  const openEditDialog = (course: any) => {
    setSelectedCourse(course)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (course: any) => {
    setSelectedCourse(course)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="container mx-auto max-w-full overflow-hidden">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground">Manage course offerings, details, and assignments.</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>

        <Separator />

        <CourseTable courses={courses} onEdit={openEditDialog} onDelete={openDeleteDialog} />

        <AddCourseDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddCourse} />

        {selectedCourse && (
          <EditCourseDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            course={selectedCourse}
            onEdit={handleEditCourse}
          />
        )}

        {selectedCourse && (
          <DeleteCourseDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            course={selectedCourse}
            onDelete={() => handleDeleteCourse(selectedCourse.id)}
          />
        )}
      </div>
    </div>
  )
}
