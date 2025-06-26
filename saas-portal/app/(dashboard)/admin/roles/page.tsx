import { getRoles } from "@/lib/admin-data"
import { RoleTable } from "@/components/admin/roles/role-table"

export default async function AdminRolesPage() {
  const roles = await getRoles()
  // Filtrer le rôle Super Admin pour l'admin université
  const universityRoles = roles.filter((role) => role.id !== "5")

  return (
    <div className="container py-6">
      <RoleTable initialRoles={universityRoles} />
    </div>
  )
}
