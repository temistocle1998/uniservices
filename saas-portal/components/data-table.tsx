"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchColumn?: string
  searchPlaceholder?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  searchPlaceholder = "Rechercher...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  return (
    <div className="space-y-4">
      {searchColumn && (
        <div className="flex items-center justify-between py-2">
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
          </p>
          <p className="text-sm text-muted-foreground">| Total: {table.getFilteredRowModel().rows.length} éléments</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Lignes par page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Première page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Page précédente</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Page suivante</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Dernière page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Exemple d'utilisation avec des données statiques
function ExampleDataTable() {
  const courses = [
    {
      id: "MATH101",
      name: "Mathématiques fondamentales",
      department: "Sciences",
      professor: "Dr. Martin Dupont",
      students: 145,
      status: "En cours",
    },
    {
      id: "HIST202",
      name: "Histoire contemporaine",
      department: "Lettres",
      professor: "Dr. Sophie Laurent",
      students: 87,
      status: "En cours",
    },
    {
      id: "ECON305",
      name: "Macroéconomie avancée",
      department: "Économie",
      professor: "Dr. Jean Moreau",
      students: 62,
      status: "Planifié",
    },
    {
      id: "LAW101",
      name: "Introduction au droit",
      department: "Droit",
      professor: "Dr. Claire Dubois",
      students: 210,
      status: "En cours",
    },
    {
      id: "COMP204",
      name: "Algorithmes et structures de données",
      department: "Sciences",
      professor: "Dr. Thomas Bernard",
      students: 95,
      status: "En cours",
    },
    // Ajout de plus de données pour démontrer la pagination
    {
      id: "PHYS101",
      name: "Physique générale",
      department: "Sciences",
      professor: "Dr. Philippe Leroy",
      students: 120,
      status: "En cours",
    },
    {
      id: "CHEM202",
      name: "Chimie organique",
      department: "Sciences",
      professor: "Dr. Marie Blanc",
      students: 75,
      status: "En cours",
    },
    {
      id: "BIO303",
      name: "Biologie moléculaire",
      department: "Sciences",
      professor: "Dr. Julien Petit",
      students: 60,
      status: "Planifié",
    },
    {
      id: "LANG101",
      name: "Anglais professionnel",
      department: "Langues",
      professor: "Dr. Emma Smith",
      students: 180,
      status: "En cours",
    },
    {
      id: "PSYCH202",
      name: "Psychologie cognitive",
      department: "Sciences humaines",
      professor: "Dr. Antoine Durand",
      students: 110,
      status: "En cours",
    },
    {
      id: "SOC303",
      name: "Sociologie contemporaine",
      department: "Sciences humaines",
      professor: "Dr. Camille Martin",
      students: 85,
      status: "Planifié",
    },
    {
      id: "ART101",
      name: "Histoire de l'art",
      department: "Arts",
      professor: "Dr. Lucie Dubois",
      students: 95,
      status: "En cours",
    },
  ]

  const columns = [
    {
      accessorKey: "id",
      header: "Code",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Cours",
    },
    {
      accessorKey: "department",
      header: "Département",
    },
    {
      accessorKey: "professor",
      header: "Professeur",
    },
    {
      accessorKey: "students",
      header: "Étudiants",
      cell: ({ row }) => <div className="text-right">{row.getValue("students")}</div>,
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <div>
          {row.getValue("status") === "En cours" ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              En cours
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
              Planifié
            </span>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <div className="text-right">
          <Button variant="ghost" size="sm">
            Voir
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={courses} searchColumn="name" searchPlaceholder="Rechercher un cours..." />
}

// Exportation par défaut pour les importations sans destructuration
export default ExampleDataTable
