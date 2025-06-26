import { courses, students } from "./data"

// Types
export type AttendanceStatus = "present" | "absent" | "excused" | "late"

export type AttendanceRecord = {
  id: string
  studentId: string
  courseId: string
  sessionDate: string
  status: AttendanceStatus
  notes?: string
  recordedBy: string
  recordedAt: string
}

export type AttendanceSession = {
  id: string
  courseId: string
  courseName: string
  date: string
  startTime: string
  endTime: string
  location: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  createdBy: string
}

// Mock data for attendance sessions
export const attendanceSessions: AttendanceSession[] = [
  {
    id: "1",
    courseId: "1",
    courseName: "Introduction à l'informatique",
    date: "2023-10-05",
    startTime: "08:00",
    endTime: "10:00",
    location: "Salle A101",
    status: "completed",
    createdBy: "Prof. Martin",
  },
  {
    id: "2",
    courseId: "1",
    courseName: "Introduction à l'informatique",
    date: "2023-10-12",
    startTime: "08:00",
    endTime: "10:00",
    location: "Salle A101",
    status: "completed",
    createdBy: "Prof. Martin",
  },
  {
    id: "3",
    courseId: "2",
    courseName: "Programmation en Python",
    date: "2023-10-06",
    startTime: "14:00",
    endTime: "16:00",
    location: "Salle B202",
    status: "completed",
    createdBy: "Prof. Dubois",
  },
  {
    id: "4",
    courseId: "2",
    courseName: "Programmation en Python",
    date: "2023-10-13",
    startTime: "14:00",
    endTime: "16:00",
    location: "Salle B202",
    status: "completed",
    createdBy: "Prof. Dubois",
  },
  {
    id: "5",
    courseId: "3",
    courseName: "Structures de données",
    date: "2023-10-09",
    startTime: "10:00",
    endTime: "12:00",
    location: "Salle C303",
    status: "completed",
    createdBy: "Prof. Leroy",
  },
  {
    id: "6",
    courseId: "1",
    courseName: "Introduction à l'informatique",
    date: "2023-10-19",
    startTime: "08:00",
    endTime: "10:00",
    location: "Salle A101",
    status: "scheduled",
    createdBy: "Prof. Martin",
  },
  {
    id: "7",
    courseId: "2",
    courseName: "Programmation en Python",
    date: "2023-10-20",
    startTime: "14:00",
    endTime: "16:00",
    location: "Salle B202",
    status: "scheduled",
    createdBy: "Prof. Dubois",
  },
]

// Generate mock attendance records
export const attendanceRecords: AttendanceRecord[] = []

// Helper function to generate random attendance status
function getRandomStatus(): AttendanceStatus {
  const statuses: AttendanceStatus[] = ["present", "absent", "excused", "late"]
  const weights = [0.8, 0.1, 0.05, 0.05] // 80% present, 10% absent, 5% excused, 5% late
  const random = Math.random()
  let sum = 0
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i]
    if (random < sum) return statuses[i]
  }
  return "present"
}

// Generate attendance records for completed sessions
attendanceSessions
  .filter((session) => session.status === "completed")
  .forEach((session) => {
    // Get students for the course's program
    const course = courses.find((c) => c.id === session.courseId)
    if (!course) return

    const programStudents = students.filter((s) => s.programId === course.programId)

    programStudents.forEach((student) => {
      const status = getRandomStatus()
      attendanceRecords.push({
        id: `${session.id}-${student.id}`,
        studentId: student.id,
        courseId: session.courseId,
        sessionDate: session.date,
        status,
        notes: status !== "present" ? `${status.charAt(0).toUpperCase() + status.slice(1)} pour ce cours` : undefined,
        recordedBy: session.createdBy,
        recordedAt: new Date(new Date(session.date).getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours after start time
      })
    })
  })

// Helper functions
export async function getAttendanceSessions(courseId?: string, fromDate?: string, toDate?: string) {
  let filtered = attendanceSessions

  if (courseId) {
    filtered = filtered.filter((session) => session.courseId === courseId)
  }

  if (fromDate) {
    filtered = filtered.filter((session) => session.date >= fromDate)
  }

  if (toDate) {
    filtered = filtered.filter((session) => session.date <= toDate)
  }

  return filtered
}

export async function getAttendanceSession(id: string) {
  return attendanceSessions.find((session) => session.id === id)
}

export async function getAttendanceRecords(
  sessionId?: string,
  studentId?: string,
  courseId?: string,
  fromDate?: string,
  toDate?: string,
) {
  let filtered = attendanceRecords

  if (sessionId) {
    filtered = filtered.filter((record) => record.id.startsWith(sessionId))
  }

  if (studentId) {
    filtered = filtered.filter((record) => record.studentId === studentId)
  }

  if (courseId) {
    filtered = filtered.filter((record) => record.courseId === courseId)
  }

  if (fromDate) {
    filtered = filtered.filter((record) => record.sessionDate >= fromDate)
  }

  if (toDate) {
    filtered = filtered.filter((record) => record.sessionDate <= toDate)
  }

  return filtered
}

export async function getStudentAttendanceStats(studentId: string, courseId?: string) {
  const records = await getAttendanceRecords(undefined, studentId, courseId)

  const total = records.length
  const present = records.filter((r) => r.status === "present").length
  const absent = records.filter((r) => r.status === "absent").length
  const excused = records.filter((r) => r.status === "excused").length
  const late = records.filter((r) => r.status === "late").length

  const attendanceRate = total > 0 ? (present / total) * 100 : 0

  return {
    total,
    present,
    absent,
    excused,
    late,
    attendanceRate: Math.round(attendanceRate * 10) / 10, // Round to 1 decimal place
  }
}

export async function getCourseAttendanceStats(courseId: string) {
  const records = await getAttendanceRecords(undefined, undefined, courseId)

  const total = records.length
  const present = records.filter((r) => r.status === "present").length
  const absent = records.filter((r) => r.status === "absent").length
  const excused = records.filter((r) => r.status === "excused").length
  const late = records.filter((r) => r.status === "late").length

  const attendanceRate = total > 0 ? (present / total) * 100 : 0

  return {
    total,
    present,
    absent,
    excused,
    late,
    attendanceRate: Math.round(attendanceRate * 10) / 10, // Round to 1 decimal place
  }
}
