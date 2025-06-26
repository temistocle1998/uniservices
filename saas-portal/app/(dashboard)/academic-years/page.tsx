import type { Metadata } from "next"
import { getAcademicYears } from "@/lib/data"
import { AcademicYearTable } from "@/components/academic-years/academic-year-table"
import { AddAcademicYearDialog } from "@/components/academic-years/add-academic-year-dialog"

export const metadata: Metadata = {
  title: "Années Académiques",
  description: "Gestion des années académiques",
}

export default async function AcademicYearsPage() {
  const academicYears = await getAcademicYears()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Années Académiques</h1>
          <p className="text-muted-foreground">Gérez les années académiques de votre établissement</p>
        </div>
        <AddAcademicYearDialog />
      </div>
      <AcademicYearTable academicYears={academicYears} />
    </div>
  )
}
