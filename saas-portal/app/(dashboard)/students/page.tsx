import type { Metadata } from "next"
import StudentTable from "@/components/students/student-table"
import AddStudentDialog from "@/components/students/add-student-dialog"
import ImportStudentsDialog from "@/components/students/import-students-dialog"

export const metadata: Metadata = {
  title: "Étudiants | UniServices",
  description: "Gestion des étudiants universitaires",
}

export default function StudentsPage() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Étudiants</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <ImportStudentsDialog />
          <AddStudentDialog />
        </div>
      </div>
      <div className="rounded-md border overflow-hidden">
        <StudentTable />
      </div>
    </div>
  )
}
