"use client"

import { useState, useEffect } from "react"
import { CourseDetails } from "@/components/courses/course-details"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch course details
    setTimeout(() => {
      const foundCourse = initialCourses.find((c) => c.id === params.id)
      setCourse(foundCourse || null)
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <p className="text-muted-foreground">The course you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <CourseDetails course={course} />
    </div>
  )
}
