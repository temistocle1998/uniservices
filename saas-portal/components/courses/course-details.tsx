"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EditCourseDialog } from "./edit-course-dialog"
import { DeleteCourseDialog } from "./delete-course-dialog"

interface CourseDetailsProps {
  course: any
}

export function CourseDetails({ course }: CourseDetailsProps) {
  const router = useRouter()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState(course)

  const handleEditCourse = (updatedCourse: any) => {
    setCurrentCourse(updatedCourse)
    setIsEditDialogOpen(false)
  }

  const handleDeleteCourse = () => {
    router.push("/courses")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Course
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Course
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {currentCourse.code}: {currentCourse.name}
              </CardTitle>
              <CardDescription>
                {currentCourse.department} • {currentCourse.program}
              </CardDescription>
            </div>
            <Badge>{currentCourse.credits} Credits</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="mt-2 text-muted-foreground">{currentCourse.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold">Course Details</h3>
              <dl className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Instructor:</dt>
                  <dd>{currentCourse.instructor}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Semester:</dt>
                  <dd>{currentCourse.semester}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Department:</dt>
                  <dd>{currentCourse.department}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Program:</dt>
                  <dd>{currentCourse.program}</dd>
                </div>
              </dl>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Schedule information will be available soon.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <EditCourseDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        course={currentCourse}
        onEdit={handleEditCourse}
      />

      <DeleteCourseDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        course={currentCourse}
        onDelete={handleDeleteCourse}
      />
    </div>
  )
}
