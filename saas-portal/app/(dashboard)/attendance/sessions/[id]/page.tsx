import type { Metadata } from "next"
import { getAttendanceSession } from "@/lib/attendance-data"
import { getCourse } from "@/lib/data"
import AttendanceRecordForm from "@/components/attendance/attendance-record-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Enregistrement des Présences | Université",
  description: "Enregistrer les présences des étudiants pour une session de cours",
}

export default async function AttendanceSessionPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getAttendanceSession(params.id)
  const course = session ? await getCourse(session.courseId) : null

  if (!session || !course) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Session non trouvée</h1>
        <Button asChild>
          <Link href="/attendance">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste des sessions
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-2">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/attendance">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Enregistrement des Présences</h1>
      </div>

      <div className="mb-8 space-y-1">
        <p className="text-lg font-medium">
          {course.name} ({course.code})
        </p>
        <p className="text-muted-foreground">
          {new Date(session.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" • "}
          {session.startTime} - {session.endTime}
          {" • "}
          {session.location}
        </p>
      </div>

      <AttendanceRecordForm session={session} />
    </div>
  )
}
