"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search } from "lucide-react"
import type { AcademicYear } from "@/lib/data"
import EditAcademicYearDialog from "./edit-academic-year-dialog"
import DeleteAcademicYearDialog from "./delete-academic-year-dialog"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

interface AcademicYearTableProps {
  academicYears: AcademicYear[]
}

export function AcademicYearTable({ academicYears }: AcademicYearTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredAcademicYears = academicYears.filter((year) =>
    year.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination logic
  const totalItems = filteredAcademicYears.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const currentItems = filteredAcademicYears.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="outline">À venir</Badge>
      case "active":
        return <Badge variant="success">En cours</Badge>
      case "completed":
        return <Badge variant="secondary">Terminée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Convertir les données pour correspondre à la structure attendue par les composants de dialogue
  const mapAcademicYearForDialogs = (year: AcademicYear) => {
    return {
      id: year.id,
      name: year.name,
      startDate: year.startDate,
      endDate: year.endDate,
      isActive: year.status === "active",
      registrationStartDate: year.startDate, // Utiliser startDate comme valeur par défaut
      registrationEndDate: year.endDate, // Utiliser endDate comme valeur par défaut
      studentCount: 0, // Valeur par défaut, à remplacer par des données réelles si disponibles
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une année académique..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Date de début</TableHead>
              <TableHead>Date de fin</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((year) => (
                <TableRow key={year.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{year.name}</TableCell>
                  <TableCell>{formatDate(year.startDate)}</TableCell>
                  <TableCell>{formatDate(year.endDate)}</TableCell>
                  <TableCell>{getStatusBadge(year.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <EditAcademicYearDialog academicYear={mapAcademicYearForDialogs(year)} />
                        <DeleteAcademicYearDialog academicYear={mapAcademicYearForDialogs(year)} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Aucune année académique trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination component */}
      {totalItems > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  )
}
