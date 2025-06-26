"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus, RefreshCw } from "lucide-react"

import type { Role } from "@/lib/admin-data"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AddRoleDialog } from "./add-role-dialog"
import { EditRoleDialog } from "./edit-role-dialog"
import { DeleteRoleDialog } from "./delete-role-dialog"

interface RoleTableProps {
  initialRoles: Role[]
}

export function RoleTable({ initialRoles }: RoleTableProps) {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simuler un chargement
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleAddRole = (newRole: Role) => {
    setRoles([...roles, newRole])
  }

  const handleEditRole = (updatedRole: Role) => {
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)))
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId))
  }

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Nom du rôle",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => {
        const permissions = row.original.permissions
        return (
          <div className="flex flex-wrap gap-1">
            {permissions.length > 3 ? (
              <>
                {permissions.slice(0, 2).map((permission) => (
                  <Badge key={permission.id} variant="outline" className="mr-1">
                    {permission.name}
                  </Badge>
                ))}
                <Badge variant="outline">+{permissions.length - 2} autres</Badge>
              </>
            ) : (
              permissions.map((permission) => (
                <Badge key={permission.id} variant="outline" className="mr-1">
                  {permission.name}
                </Badge>
              ))
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const role = row.original
        // Ne pas permettre la modification ou suppression des rôles système
        const isSystemRole = ["1", "5"].includes(role.id)

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRole(role)
                  setIsEditDialogOpen(true)
                }}
                disabled={isSystemRole}
              >
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRole(role)
                  setIsDeleteDialogOpen(true)
                }}
                className="text-destructive"
                disabled={isSystemRole}
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Rôles et permissions</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un rôle
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={roles} searchField="name" />

      <AddRoleDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onRoleAdded={handleAddRole} />

      {selectedRole && (
        <>
          <EditRoleDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            role={selectedRole}
            onRoleUpdated={handleEditRole}
          />
          <DeleteRoleDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            role={selectedRole}
            onRoleDeleted={handleDeleteRole}
          />
        </>
      )}
    </div>
  )
}
