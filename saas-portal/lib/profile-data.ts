export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  department?: string
  avatar?: string
  bio?: string
  dateJoined: string
  lastLogin: string
}

export interface PasswordChangeData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface PersonalInfoData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  bio?: string
}

// Données simulées de l'utilisateur connecté
export const currentUser: UserProfile = {
  id: "1",
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@universite.fr",
  phone: "+33 1 23 45 67 89",
  role: "Administrateur",
  department: "Administration",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Administrateur système avec 5 ans d'expérience dans la gestion des systèmes universitaires.",
  dateJoined: "2019-09-01",
  lastLogin: "2024-01-15T10:30:00Z",
}

// Fonctions simulées pour les mises à jour
export async function updateUserProfile(data: PersonalInfoData): Promise<{ success: boolean; message: string }> {
  // Simulation d'une requête API
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, message: "Profil mis à jour avec succès" }
}

export async function changePassword(data: PasswordChangeData): Promise<{ success: boolean; message: string }> {
  // Simulation d'une requête API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (data.currentPassword !== "password123") {
    return { success: false, message: "Mot de passe actuel incorrect" }
  }

  if (data.newPassword !== data.confirmPassword) {
    return { success: false, message: "Les mots de passe ne correspondent pas" }
  }

  return { success: true, message: "Mot de passe modifié avec succès" }
}

export async function uploadAvatar(file: File): Promise<{ success: boolean; message: string; avatarUrl?: string }> {
  // Simulation d'upload
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const avatarUrl = `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(file.name)}`
  return {
    success: true,
    message: "Photo de profil mise à jour avec succès",
    avatarUrl,
  }
}
