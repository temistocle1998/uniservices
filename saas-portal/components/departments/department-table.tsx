"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, ArrowUpDown } from "lucide-react"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import EditDepartmentDialog from "./edit-department-dialog"
import DeleteDepartmentDialog from "./delete-department-dialog"

// Type pour un département
interface Department {
  id: string
  name: string
  director: string
  professorCount: number
  studentCount: number
  programCount: number
  createdAt: string
}

export default function DepartmentTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Department>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // États de pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Données simulées des départements (ajoutons plus de données)
  const departments: Department[] = [
    {
      id: "1",
      name: "Sciences",
      director: "Dr. Test Dept",
      professorCount: 45,
      studentCount: 1250,
      programCount: 8,
      createdAt: "2020-09-01",
    },
    {
      id: "2",
      name: "Lettres",
      director: "Dr. Test Dept",
      professorCount: 38,
      studentCount: 980,
      programCount: 6,
      createdAt: "2019-07-15",
    },
    {
      id: "3",
      name: "Droit",
      director: "Dr. Test Dept",
      professorCount: 32,
      studentCount: 1100,
      programCount: 5,
      createdAt: "2018-10-05",
    },
    {
      id: "4",
      name: "Économie",
      director: "Dr. Lamine Seck",
      professorCount: 28,
      studentCount: 950,
      programCount: 7,
      createdAt: "2021-01-10",
    },
    // Ajoutons plus de départements pour tester la pagination
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 5}`,
      name: `Département ${i + 5}`,
      director: `Dr. Directeur ${i + 5}`,
      professorCount: Math.floor(Math.random() * 50) + 20,
      studentCount: Math.floor(Math.random() * 1000) + 500,
      programCount: Math.floor(Math.random() * 10) + 3,
      createdAt: `202${Math.floor(Math.random() * 4)}-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    })),
  ]

  // Fonction pour trier les départements
  const sortedDepartments = [...departments].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  // Fonction pour filtrer les départements
  const filteredDepartments = sortedDepartments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.director.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredDepartments.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedDepartments = filteredDepartments.slice(startIndex, endIndex)

  // Fonction pour changer le tri
  const toggleSort = (column: keyof Department) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un département..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("name")}>
                  <span>Nom</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("director")}>
                  <span>Directeur</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div
                  className="flex items-center justify-end gap-1 cursor-pointer"
                  onClick={() => toggleSort("professorCount")}
                >
                  <span>Professeurs</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div
                  className="flex items-center justify-end gap-1 cursor-pointer"
                  onClick={() => toggleSort("studentCount")}
                >
                  <span>Étudiants</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div
                  className="flex items-center justify-end gap-1 cursor-pointer"
                  onClick={() => toggleSort("programCount")}
                >
                  <span>Filières</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDepartments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Aucun département trouvé.
                </TableCell>
              </TableRow>
            ) : (
              paginatedDepartments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">
                    <Link href={`/departments/${department.id}`} className="hover:underline">
                      {department.name}
                    </Link>
                  </TableCell>
                  <TableCell>{department.director}</TableCell>
                  <TableCell className="text-right">{department.professorCount}</TableCell>
                  <TableCell className="text-right">{department.studentCount}</TableCell>
                  <TableCell className="text-right">{department.programCount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/departments/${department.id}`)}>
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <EditDepartmentDialog department={department} />
                        <DeleteDepartmentDialog department={department} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredDepartments.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  )
}
