import { attendanceRecords } from "./attendance-data"

export type ExcuseStatus = "pending" | "approved" | "rejected"

export type ExcuseDocument = {
  id: string
  studentId: string
  attendanceRecordIds: string[] // Peut concerner plusieurs absences
  submissionDate: string
  startDate: string
  endDate: string
  reason: string
  description: string
  documentUrl: string
  documentName: string
  status: ExcuseStatus
  reviewedBy?: string
  reviewDate?: string
  reviewNotes?: string
}

// Raisons d'absence prédéfinies
export const excuseReasons = [
  "medical", // Raison médicale
  "family", // Raison familiale
  "administrative", // Démarches administratives
  "professional", // Raison professionnelle
  "transportation", // Problème de transport
  "other", // Autre raison
]

// Données fictives pour les justificatifs
export const excuseDocuments: ExcuseDocument[] = [
  {
    id: "1",
    studentId: "1",
    attendanceRecordIds: ["1-1", "2-1"],
    submissionDate: "2023-10-15T10:30:00Z",
    startDate: "2023-10-05",
    endDate: "2023-10-12",
    reason: "medical",
    description: "Certificat médical pour grippe",
    documentUrl: "/documents/medical-certificate-1.pdf",
    documentName: "certificat-medical.pdf",
    status: "approved",
    reviewedBy: "Admin",
    reviewDate: "2023-10-16T14:20:00Z",
    reviewNotes: "Certificat médical valide",
  },
  {
    id: "2",
    studentId: "2",
    attendanceRecordIds: ["3-2"],
    submissionDate: "2023-10-08T09:15:00Z",
    startDate: "2023-10-06",
    endDate: "2023-10-06",
    reason: "family",
    description: "Décès dans la famille",
    documentUrl: "/documents/family-certificate-1.pdf",
    documentName: "attestation-deces.pdf",
    status: "approved",
    reviewedBy: "Admin",
    reviewDate: "2023-10-09T11:45:00Z",
    reviewNotes: "Condoléances à l'étudiant",
  },
  {
    id: "3",
    studentId: "3",
    attendanceRecordIds: ["4-3"],
    submissionDate: "2023-10-14T16:20:00Z",
    startDate: "2023-10-13",
    endDate: "2023-10-13",
    reason: "transportation",
    description: "Grève des transports",
    documentUrl: "/documents/transport-proof-1.pdf",
    documentName: "attestation-greve.pdf",
    status: "pending",
  },
  {
    id: "4",
    studentId: "4",
    attendanceRecordIds: ["5-4"],
    submissionDate: "2023-10-10T08:45:00Z",
    startDate: "2023-10-09",
    endDate: "2023-10-09",
    reason: "administrative",
    description: "Rendez-vous à la préfecture",
    documentUrl: "/documents/administrative-proof-1.pdf",
    documentName: "convocation-prefecture.pdf",
    status: "rejected",
    reviewedBy: "Admin",
    reviewDate: "2023-10-11T10:30:00Z",
    reviewNotes: "Document non valide, date incorrecte",
  },
]

// Fonctions utilitaires pour les justificatifs
export async function getExcuseDocuments(
  studentId?: string,
  status?: ExcuseStatus,
  fromDate?: string,
  toDate?: string,
) {
  let filtered = excuseDocuments

  if (studentId) {
    filtered = filtered.filter((doc) => doc.studentId === studentId)
  }

  if (status) {
    filtered = filtered.filter((doc) => doc.status === status)
  }

  if (fromDate) {
    filtered = filtered.filter((doc) => doc.submissionDate >= fromDate)
  }

  if (toDate) {
    filtered = filtered.filter((doc) => doc.submissionDate <= toDate)
  }

  return filtered
}

export async function getExcuseDocument(id: string) {
  return excuseDocuments.find((doc) => doc.id === id)
}

export async function getExcuseDocumentsByAttendanceRecord(attendanceRecordId: string) {
  return excuseDocuments.filter((doc) => doc.attendanceRecordIds.includes(attendanceRecordId))
}

// Fonction pour vérifier si une absence est justifiée
export async function isAttendanceExcused(attendanceRecordId: string) {
  const excuses = await getExcuseDocumentsByAttendanceRecord(attendanceRecordId)
  return excuses.some((excuse) => excuse.status === "approved")
}

// Fonction pour obtenir les statistiques des justificatifs pour un étudiant
export async function getStudentExcuseStats(studentId: string) {
  const excuses = await getExcuseDocuments(studentId)

  const total = excuses.length
  const approved = excuses.filter((excuse) => excuse.status === "approved").length
  const rejected = excuses.filter((excuse) => excuse.status === "rejected").length
  const pending = excuses.filter((excuse) => excuse.status === "pending").length

  return {
    total,
    approved,
    rejected,
    pending,
    approvalRate: total > 0 ? (approved / total) * 100 : 0,
  }
}

// Mettre à jour les enregistrements d'absence pour refléter les justificatifs approuvés
export async function updateAttendanceRecordsWithExcuses() {
  // Dans une application réelle, cette fonction serait appelée périodiquement
  // ou après chaque approbation/rejet de justificatif

  // Pour chaque justificatif approuvé
  const approvedExcuses = excuseDocuments.filter((doc) => doc.status === "approved")

  for (const excuse of approvedExcuses) {
    // Pour chaque enregistrement d'absence concerné par ce justificatif
    for (const recordId of excuse.attendanceRecordIds) {
      // Trouver l'enregistrement d'absence
      const recordIndex = attendanceRecords.findIndex((record) => record.id === recordId)

      if (recordIndex !== -1) {
        // Mettre à jour le statut de l'absence à "excused"
        attendanceRecords[recordIndex].status = "excused"
        attendanceRecords[recordIndex].notes = `Absence justifiée: ${
          excuse.reason === "medical"
            ? "Raison médicale"
            : excuse.reason === "family"
              ? "Raison familiale"
              : excuse.reason === "administrative"
                ? "Démarches administratives"
                : excuse.reason === "professional"
                  ? "Raison professionnelle"
                  : excuse.reason === "transportation"
                    ? "Problème de transport"
                    : "Autre raison"
        }`
      }
    }
  }
}

// Appeler la fonction pour mettre à jour les enregistrements d'absence
updateAttendanceRecordsWithExcuses()
