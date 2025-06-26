import type { Metadata } from "next"
import DepartmentTable from "@/components/departments/department-table"
import AddDepartmentDialog from "@/components/departments/add-department-dialog"

export const metadata: Metadata = {
  title: "Départements | UniServices",
  description: "Gestion des départements universitaires",
}

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Départements</h2>
        <AddDepartmentDialog />
      </div>
      <div className="space-y-4">
        <div className="rounded-md border">
          <DepartmentTable />
        </div>
      </div>
    </div>
  )
}
