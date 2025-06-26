import { getUsers } from "@/lib/admin-data"
import { UserTable } from "@/components/admin/users/user-table"

export default async function AdminUsersPage() {
  const users = await getUsers("1") // Utilisateurs de l'université actuelle

  return (
    <div className="container py-6">
      <UserTable initialUsers={users} />
    </div>
  )
}
