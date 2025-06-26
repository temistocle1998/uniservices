import type { Metadata } from "next"
import { getStudent } from "@/lib/data"
import { getExcuseDocuments, getStudentExcuseStats } from "@/lib/excuse-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import StudentExcuseTable from "@/components/excuses/student-excuse-table"
import SubmitExcuseForm from "@/components/excuses/submit-excuse-form"
import StudentExcuseStats from "@/components/excuses/student-excuse-stats"

export const metadata: Metadata = {
  title: "Justificatifs d'absence | Université",
  description: "Gestion des justificatifs d'absence",
}

export default async function StudentExcusesPage({
  params,
}: {
  params: { id: string }
}) {
  const student = await getStudent(params.id)
  const excuses = await getExcuseDocuments(params.id)
  const stats = await getStudentExcuseStats(params.id)

  if (!student) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Étudiant non trouvé</h1>
        <Button asChild>
          <Link href="/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste des étudiants
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-2">
        <Button variant="ghost" asChild className="mr-4">
          <Link href={`/students/${student.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au profil
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Justificatifs d'absence</h1>
      </div>

      <div className="mb-8">
        <p className="text-lg font-medium">
          {student.firstName} {student.lastName}
        </p>
        <p className="text-muted-foreground">{student.programName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StudentExcuseStats stats={stats} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <SubmitExcuseForm studentId={student.id} />
        <StudentExcuseTable studentId={student.id} excuses={excuses} />
      </div>
    </div>
  )
}
