// Types pour la gestion des utilisateurs et des accès
export type Role = {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

export type Permission = {
  id: string
  name: string
  description: string
  resource: string
  action: "create" | "read" | "update" | "delete" | "manage"
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  roleId: string
  roleName: string
  universityId?: string
  universityName?: string
  status: "active" | "inactive" | "pending"
  lastLogin?: string
  createdAt: string
}

export type University = {
  id: string
  name: string
  logo?: string
  domain: string
  address: string
  city: string
  country: string
  status: "active" | "inactive" | "pending"
  plan: "basic" | "premium" | "enterprise"
  adminEmail: string
  createdAt: string
  studentsCount: number
  departmentsCount: number
}

// Données de démonstration
export const permissions: Permission[] = [
  {
    id: "1",
    name: "Lire les étudiants",
    description: "Permet de consulter la liste des étudiants",
    resource: "students",
    action: "read",
  },
  {
    id: "2",
    name: "Créer des étudiants",
    description: "Permet d'ajouter de nouveaux étudiants",
    resource: "students",
    action: "create",
  },
  {
    id: "3",
    name: "Modifier les étudiants",
    description: "Permet de modifier les informations des étudiants",
    resource: "students",
    action: "update",
  },
  {
    id: "4",
    name: "Supprimer des étudiants",
    description: "Permet de supprimer des étudiants",
    resource: "students",
    action: "delete",
  },
  {
    id: "5",
    name: "Gérer les départements",
    description: "Permet de gérer tous les aspects des départements",
    resource: "departments",
    action: "manage",
  },
  {
    id: "6",
    name: "Gérer les cours",
    description: "Permet de gérer tous les aspects des cours",
    resource: "courses",
    action: "manage",
  },
  {
    id: "7",
    name: "Gérer les inscriptions",
    description: "Permet de gérer tous les aspects des inscriptions",
    resource: "registrations",
    action: "manage",
  },
  {
    id: "8",
    name: "Gérer les utilisateurs",
    description: "Permet de gérer tous les aspects des utilisateurs",
    resource: "users",
    action: "manage",
  },
  {
    id: "9",
    name: "Gérer les rôles",
    description: "Permet de gérer tous les aspects des rôles",
    resource: "roles",
    action: "manage",
  },
  {
    id: "10",
    name: "Gérer les universités",
    description: "Permet de gérer tous les aspects des universités",
    resource: "universities",
    action: "manage",
  },
]

export const roles: Role[] = [
  {
    id: "1",
    name: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités",
    permissions: permissions,
  },
  {
    id: "2",
    name: "Gestionnaire",
    description: "Peut gérer les étudiants, cours et inscriptions",
    permissions: permissions.filter((p) => ["1", "2", "3", "5", "6", "7"].includes(p.id)),
  },
  {
    id: "3",
    name: "Secrétaire",
    description: "Peut consulter et ajouter des étudiants et inscriptions",
    permissions: permissions.filter((p) => ["1", "2", "7"].includes(p.id)),
  },
  {
    id: "4",
    name: "Professeur",
    description: "Peut consulter les étudiants et gérer les cours",
    permissions: permissions.filter((p) => ["1", "6"].includes(p.id)),
  },
  {
    id: "5",
    name: "Super Admin",
    description: "Accès complet à toutes les universités et fonctionnalités",
    permissions: permissions,
  },
]

export const users: User[] = [
  {
    id: "1",
    firstName: "Admin",
    lastName: "Système",
    email: "admin@uniservices.com",
    roleId: "5",
    roleName: "Super Admin",
    status: "active",
    lastLogin: "2023-05-01T10:30:00Z",
    createdAt: "2023-01-01T08:00:00Z",
  },
  {
    id: "2",
    firstName: "Test1",
    lastName: "User",
    email: "test1.user@univ-test.sn",
    avatar: "/placeholder.svg?height=40&width=40",
    roleId: "1",
    roleName: "Administrateur",
    universityId: "1",
    universityName: "Université Test",
    status: "active",
    lastLogin: "2023-05-02T14:15:00Z",
    createdAt: "2023-01-15T09:00:00Z",
  },
  {
    id: "3",
    firstName: "Test2",
    lastName: "User",
    email: "test2.user@univ-test.sn",
    roleId: "2",
    roleName: "Gestionnaire",
    universityId: "1",
    universityName: "Université Test",
    status: "active",
    lastLogin: "2023-05-01T11:45:00Z",
    createdAt: "2023-02-01T10:30:00Z",
  },
  {
    id: "4",
    firstName: "Pierre",
    lastName: "Leroy",
    email: "pierre.leroy@univ-lyon.fr",
    roleId: "1",
    roleName: "Administrateur",
    universityId: "2",
    universityName: "Université de Lyon",
    status: "active",
    lastLogin: "2023-05-02T09:20:00Z",
    createdAt: "2023-01-20T08:45:00Z",
  },
  {
    id: "5",
    firstName: "Sophie",
    lastName: "Moreau",
    email: "sophie.moreau@univ-lyon.fr",
    roleId: "3",
    roleName: "Secrétaire",
    universityId: "2",
    universityName: "Université de Lyon",
    status: "active",
    lastLogin: "2023-05-01T16:30:00Z",
    createdAt: "2023-02-10T11:15:00Z",
  },
  {
    id: "6",
    firstName: "Thomas",
    lastName: "Bernard",
    email: "thomas.bernard@univ-marseille.fr",
    roleId: "4",
    roleName: "Professeur",
    universityId: "3",
    universityName: "Université de Marseille",
    status: "inactive",
    lastLogin: "2023-04-15T10:00:00Z",
    createdAt: "2023-03-01T09:30:00Z",
  },
]

export const universities: University[] = [
  {
    id: "1",
    name: "Université Test",
    logo: "/placeholder.svg?height=64&width=64",
    domain: "univ-test.sn",
    address: "12 Rue de l'Université",
    city: "Paris",
    country: "France",
    status: "active",
    plan: "premium",
    adminEmail: "admin@univ-test.sn",
    createdAt: "2023-01-01T08:00:00Z",
    studentsCount: 15000,
    departmentsCount: 8,
  },
  {
    id: "2",
    name: "Université de Lyon",
    logo: "/placeholder.svg?height=64&width=64",
    domain: "univ-lyon.fr",
    address: "15 Avenue des Sciences",
    city: "Lyon",
    country: "France",
    status: "active",
    plan: "premium",
    adminEmail: "admin@univ-lyon.fr",
    createdAt: "2023-01-05T09:30:00Z",
    studentsCount: 12000,
    departmentsCount: 6,
  },
  {
    id: "3",
    name: "Université Test",
    logo: "/placeholder.svg?height=64&width=64",
    domain: "univ-marseille.fr",
    address: "25 Boulevard Universitaire",
    city: "Marseille",
    country: "France",
    status: "active",
    plan: "basic",
    adminEmail: "admin@univ-marseille.fr",
    createdAt: "2023-01-10T10:15:00Z",
    studentsCount: 9000,
    departmentsCount: 5,
  },
  {
    id: "4",
    name: "Université de Bordeaux",
    logo: "/placeholder.svg?height=64&width=64",
    domain: "univ-bordeaux.fr",
    address: "30 Rue des Facultés",
    city: "Bordeaux",
    country: "France",
    status: "pending",
    plan: "basic",
    adminEmail: "admin@univ-bordeaux.fr",
    createdAt: "2023-04-20T11:00:00Z",
    studentsCount: 0,
    departmentsCount: 0,
  },
]

// Fonctions d'aide
export async function getUsers(universityId?: string) {
  if (universityId) {
    return users.filter((user) => user.universityId === universityId)
  }
  return users
}

export async function getUser(id: string) {
  return users.find((user) => user.id === id)
}

export async function getRoles() {
  return roles
}

export async function getRole(id: string) {
  return roles.find((role) => role.id === id)
}

export async function getPermissions() {
  return permissions
}

export async function getUniversities() {
  return universities
}

export async function getUniversity(id: string) {
  return universities.find((university) => university.id === id)
}
