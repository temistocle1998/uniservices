// Types
export type Department = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type Program = {
  id: string
  name: string
  description: string
  departmentId: string
  departmentName: string
  createdAt: string
  updatedAt: string
}

export type Student = {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  address: string
  phoneNumber: string
  enrollmentDate: string
  programId: string
  programName: string
  status: "active" | "inactive" | "graduated" | "suspended"
}

export type AcademicYear = {
  id: string
  name: string
  startDate: string
  endDate: string
  isCurrent: boolean
  status: "upcoming" | "active" | "completed"
}

export type Registration = {
  id: string
  studentId: string
  studentName: string
  academicYearId: string
  academicYearName: string
  programId: string
  programName: string
  registrationType: "new" | "renewal"
  registrationDate: string
  status: "pending" | "approved" | "rejected" | "cancelled"
  paymentStatus: "unpaid" | "partial" | "paid"
}

export type Course = {
  id: string
  code: string
  name: string
  description: string
  credits: number
  programId: string
  programName: string
  semester: "fall" | "spring" | "summer"
  academicYearId: string
  academicYearName: string
}

// Mock data avec plus de départements
export const departments: Department[] = [
  {
    id: "1",
    name: "Informatique",
    description: "Département d'informatique et sciences de l'information",
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2023-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Mathématiques",
    description: "Département de mathématiques et statistiques",
    createdAt: "2023-01-15T08:30:00Z",
    updatedAt: "2023-01-15T08:30:00Z",
  },
  {
    id: "3",
    name: "Physique",
    description: "Département de physique et sciences naturelles",
    createdAt: "2023-01-15T09:00:00Z",
    updatedAt: "2023-01-15T09:00:00Z",
  },
  {
    id: "4",
    name: "Économie",
    description: "Département d'économie et gestion",
    createdAt: "2023-01-15T09:30:00Z",
    updatedAt: "2023-01-15T09:30:00Z",
  },
  {
    id: "5",
    name: "Langues",
    description: "Département de langues et littérature",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "6",
    name: "Chimie",
    description: "Département de chimie et sciences moléculaires",
    createdAt: "2023-01-16T08:00:00Z",
    updatedAt: "2023-01-16T08:00:00Z",
  },
  {
    id: "7",
    name: "Biologie",
    description: "Département de biologie et sciences de la vie",
    createdAt: "2023-01-16T08:30:00Z",
    updatedAt: "2023-01-16T08:30:00Z",
  },
  {
    id: "8",
    name: "Histoire",
    description: "Département d'histoire et archéologie",
    createdAt: "2023-01-16T09:00:00Z",
    updatedAt: "2023-01-16T09:00:00Z",
  },
  {
    id: "9",
    name: "Géographie",
    description: "Département de géographie et aménagement",
    createdAt: "2023-01-16T09:30:00Z",
    updatedAt: "2023-01-16T09:30:00Z",
  },
  {
    id: "10",
    name: "Psychologie",
    description: "Département de psychologie et sciences cognitives",
    createdAt: "2023-01-16T10:00:00Z",
    updatedAt: "2023-01-16T10:00:00Z",
  },
  {
    id: "11",
    name: "Sociologie",
    description: "Département de sociologie et anthropologie",
    createdAt: "2023-01-16T10:30:00Z",
    updatedAt: "2023-01-16T10:30:00Z",
  },
  {
    id: "12",
    name: "Philosophie",
    description: "Département de philosophie et éthique",
    createdAt: "2023-01-16T11:00:00Z",
    updatedAt: "2023-01-16T11:00:00Z",
  },
  {
    id: "13",
    name: "Arts",
    description: "Département des arts visuels et plastiques",
    createdAt: "2023-01-16T11:30:00Z",
    updatedAt: "2023-01-16T11:30:00Z",
  },
  {
    id: "14",
    name: "Musique",
    description: "Département de musique et musicologie",
    createdAt: "2023-01-16T12:00:00Z",
    updatedAt: "2023-01-16T12:00:00Z",
  },
  {
    id: "15",
    name: "Droit",
    description: "Département de droit et sciences juridiques",
    createdAt: "2023-01-16T12:30:00Z",
    updatedAt: "2023-01-16T12:30:00Z",
  },
  {
    id: "16",
    name: "Médecine",
    description: "Département de médecine et sciences de la santé",
    createdAt: "2023-01-16T13:00:00Z",
    updatedAt: "2023-01-16T13:00:00Z",
  },
  {
    id: "17",
    name: "Pharmacie",
    description: "Département de pharmacie et pharmacologie",
    createdAt: "2023-01-16T13:30:00Z",
    updatedAt: "2023-01-16T13:30:00Z",
  },
  {
    id: "18",
    name: "Ingénierie",
    description: "Département d'ingénierie et technologies",
    createdAt: "2023-01-16T14:00:00Z",
    updatedAt: "2023-01-16T14:00:00Z",
  },
  {
    id: "19",
    name: "Architecture",
    description: "Département d'architecture et urbanisme",
    createdAt: "2023-01-16T14:30:00Z",
    updatedAt: "2023-01-16T14:30:00Z",
  },
]

export const programs: Program[] = [
  {
    id: "1",
    name: "Licence en Informatique",
    description: "Programme de licence en informatique générale",
    departmentId: "1",
    departmentName: "Informatique",
    createdAt: "2023-01-16T08:00:00Z",
    updatedAt: "2023-01-16T08:00:00Z",
  },
  {
    id: "2",
    name: "Master en Développement Web",
    description: "Programme de master spécialisé en développement web",
    departmentId: "1",
    departmentName: "Informatique",
    createdAt: "2023-01-16T08:30:00Z",
    updatedAt: "2023-01-16T08:30:00Z",
  },
  {
    id: "3",
    name: "Licence en Mathématiques",
    description: "Programme de licence en mathématiques",
    departmentId: "2",
    departmentName: "Mathématiques",
    createdAt: "2023-01-16T09:00:00Z",
    updatedAt: "2023-01-16T09:00:00Z",
  },
  {
    id: "4",
    name: "Master en Statistiques",
    description: "Programme de master en statistiques appliquées",
    departmentId: "2",
    departmentName: "Mathématiques",
    createdAt: "2023-01-16T09:30:00Z",
    updatedAt: "2023-01-16T09:30:00Z",
  },
  {
    id: "5",
    name: "Licence en Physique",
    description: "Programme de licence en physique",
    departmentId: "3",
    departmentName: "Physique",
    createdAt: "2023-01-16T10:00:00Z",
    updatedAt: "2023-01-16T10:00:00Z",
  },
  {
    id: "6",
    name: "Licence en Économie",
    description: "Programme de licence en économie",
    departmentId: "4",
    departmentName: "Économie",
    createdAt: "2023-01-16T10:30:00Z",
    updatedAt: "2023-01-16T10:30:00Z",
  },
  {
    id: "7",
    name: "Licence en Langues Étrangères",
    description: "Programme de licence en langues étrangères appliquées",
    departmentId: "5",
    departmentName: "Langues",
    createdAt: "2023-01-16T11:00:00Z",
    updatedAt: "2023-01-16T11:00:00Z",
  },
  {
    id: "8",
    name: "Licence en Psychologie",
    description: "Programme de licence en psychologie générale",
    departmentId: "10",
    departmentName: "Psychologie",
    createdAt: "2023-01-16T11:30:00Z",
    updatedAt: "2023-01-16T11:30:00Z",
  },
  {
    id: "9",
    name: "Master en Psychologie Clinique",
    description: "Programme de master en psychologie clinique",
    departmentId: "10",
    departmentName: "Psychologie",
    createdAt: "2023-01-16T12:00:00Z",
    updatedAt: "2023-01-16T12:00:00Z",
  },
]

export const students: Student[] = [
  {
    id: "1",
    firstName: "Test",
    lastName: "Dpt",
    email: "test@example.com",
    dateOfBirth: "1998-05-15",
    gender: "male",
    address: "123 Rue de Paris, Paris",
    phoneNumber: "+33123456789",
    enrollmentDate: "2022-09-01",
    programId: "1",
    programName: "Licence en Informatique",
    status: "active",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Laurent",
    email: "marie.laurent@example.com",
    dateOfBirth: "1999-03-22",
    gender: "female",
    address: "456 Avenue Victor Hugo, Lyon",
    phoneNumber: "+33234567890",
    enrollmentDate: "2022-09-01",
    programId: "3",
    programName: "Licence en Mathématiques",
    status: "active",
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "Martin",
    email: "pierre.martin@example.com",
    dateOfBirth: "1997-11-08",
    gender: "male",
    address: "789 Boulevard Saint-Michel, Paris",
    phoneNumber: "+33345678901",
    enrollmentDate: "2021-09-01",
    programId: "2",
    programName: "Master en Développement Web",
    status: "active",
  },
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Bernard",
    email: "sophie.bernard@example.com",
    dateOfBirth: "1998-07-30",
    gender: "female",
    address: "101 Rue de la République, Marseille",
    phoneNumber: "+33456789012",
    enrollmentDate: "2022-09-01",
    programId: "5",
    programName: "Licence en Physique",
    status: "active",
  },
  {
    id: "5",
    firstName: "Lucas",
    lastName: "Petit",
    email: "lucas.petit@example.com",
    dateOfBirth: "1999-01-25",
    gender: "male",
    address: "202 Avenue des Champs-Élysées, Paris",
    phoneNumber: "+33567890123",
    enrollmentDate: "2022-09-01",
    programId: "6",
    programName: "Licence en Économie",
    status: "active",
  },
  {
    id: "6",
    firstName: "Emma",
    lastName: "Leroy",
    email: "emma.leroy@example.com",
    dateOfBirth: "1998-09-14",
    gender: "female",
    address: "303 Rue Garibaldi, Lyon",
    phoneNumber: "+33678901234",
    enrollmentDate: "2021-09-01",
    programId: "7",
    programName: "Licence en Langues Étrangères",
    status: "active",
  },
  {
    id: "7",
    firstName: "Test",
    lastName: "Dpt",
    email: "test@example.com",
    dateOfBirth: "1997-06-03",
    gender: "male",
    address: "404 Rue de la Paix, Nice",
    phoneNumber: "+33789012345",
    enrollmentDate: "2021-09-01",
    programId: "4",
    programName: "Master en Statistiques",
    status: "active",
  },
  {
    id: "8",
    firstName: "Chloé",
    lastName: "Simon",
    email: "chloe.simon@example.com",
    dateOfBirth: "1999-12-10",
    gender: "female",
    address: "505 Avenue Jean Jaurès, Toulouse",
    phoneNumber: "+33890123456",
    enrollmentDate: "2022-09-01",
    programId: "1",
    programName: "Licence en Informatique",
    status: "active",
  },
  {
    id: "9",
    firstName: "Antoine",
    lastName: "Michel",
    email: "antoine.michel@example.com",
    dateOfBirth: "1998-02-18",
    gender: "male",
    address: "606 Boulevard Gambetta, Lille",
    phoneNumber: "+33901234567",
    enrollmentDate: "2022-09-01",
    programId: "3",
    programName: "Licence en Mathématiques",
    status: "inactive",
  },
  {
    id: "10",
    firstName: "Léa",
    lastName: "Robert",
    email: "lea.robert@example.com",
    dateOfBirth: "1997-08-27",
    gender: "female",
    address: "707 Rue Nationale, Bordeaux",
    phoneNumber: "+33012345678",
    enrollmentDate: "2021-09-01",
    programId: "5",
    programName: "Licence en Physique",
    status: "graduated",
  },
]

export const academicYears: AcademicYear[] = [
  {
    id: "1",
    name: "2018-2019",
    startDate: "2018-09-01",
    endDate: "2019-06-30",
    isCurrent: false,
    status: "completed",
  },
  {
    id: "2",
    name: "2019-2020",
    startDate: "2019-09-01",
    endDate: "2020-06-30",
    isCurrent: false,
    status: "completed",
  },
  {
    id: "3",
    name: "2020-2021",
    startDate: "2020-09-01",
    endDate: "2021-06-30",
    isCurrent: false,
    status: "completed",
  },
  {
    id: "4",
    name: "2021-2022",
    startDate: "2021-09-01",
    endDate: "2022-06-30",
    isCurrent: false,
    status: "completed",
  },
  {
    id: "5",
    name: "2022-2023",
    startDate: "2022-09-01",
    endDate: "2023-06-30",
    isCurrent: false,
    status: "completed",
  },
  {
    id: "6",
    name: "2023-2024",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    isCurrent: true,
    status: "active",
  },
  {
    id: "7",
    name: "2024-2025",
    startDate: "2024-09-01",
    endDate: "2025-06-30",
    isCurrent: false,
    status: "upcoming",
  },
  {
    id: "8",
    name: "2025-2026",
    startDate: "2025-09-01",
    endDate: "2026-06-30",
    isCurrent: false,
    status: "upcoming",
  },
  {
    id: "9",
    name: "2026-2027",
    startDate: "2026-09-01",
    endDate: "2027-06-30",
    isCurrent: false,
    status: "upcoming",
  },
]

export const registrations: Registration[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Jean Dupont",
    academicYearId: "1",
    academicYearName: "2022-2023",
    programId: "1",
    programName: "Licence en Informatique",
    registrationType: "new",
    registrationDate: "2022-08-15",
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "2",
    studentId: "1",
    studentName: "Jean Dupont",
    academicYearId: "2",
    academicYearName: "2023-2024",
    programId: "1",
    programName: "Licence en Informatique",
    registrationType: "renewal",
    registrationDate: "2023-08-10",
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "3",
    studentId: "2",
    studentName: "Marie Laurent",
    academicYearId: "1",
    academicYearName: "2022-2023",
    programId: "3",
    programName: "Licence en Mathématiques",
    registrationType: "new",
    registrationDate: "2022-08-20",
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "4",
    studentId: "2",
    studentName: "Marie Laurent",
    academicYearId: "2",
    academicYearName: "2023-2024",
    programId: "3",
    programName: "Licence en Mathématiques",
    registrationType: "renewal",
    registrationDate: "2023-08-18",
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "5",
    studentId: "3",
    studentName: "Pierre Martin",
    academicYearId: "1",
    academicYearName: "2022-2023",
    programId: "2",
    programName: "Master en Développement Web",
    registrationType: "new",
    registrationDate: "2022-08-05",
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "6",
    studentId: "3",
    studentName: "Pierre Martin",
    academicYearId: "2",
    academicYearName: "2023-2024",
    programId: "2",
    programName: "Master en Développement Web",
    registrationType: "renewal",
    registrationDate: "2023-08-07",
    status: "approved",
    paymentStatus: "partial",
  },
  {
    id: "7",
    studentId: "4",
    studentName: "Sophie Test",
    academicYearId: "2",
    academicYearName: "2023-2024",
    programId: "5",
    programName: "Licence en Physique",
    registrationType: "new",
    registrationDate: "2023-08-25",
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "8",
    studentId: "5",
    studentName: "Lucas Petit",
    academicYearId: "2",
    academicYearName: "2023-2024",
    programId: "6",
    programName: "Licence en Économie",
    registrationType: "new",
    registrationDate: "2023-08-30",
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "9",
    studentId: "6",
    studentName: "Emma Leroy",
    academicYearId: "1",
    academicYearName: "2022-2023",
    programId: "7",
    programName: "Licence en Langues Étrangères",
    registrationType: "new",
    registrationDate: "2022-08-12",
    status: "approved",
    paymentStatus: "paid",
  },
  {
    id: "10",
    studentId: "6",
    studentName: "Emma Leroy",
    academicYearId: "2",
    academicYearName: "2023-2024",
    programId: "7",
    programName: "Licence en Langues Étrangères",
    registrationType: "renewal",
    registrationDate: "2023-08-14",
    status: "approved",
    paymentStatus: "paid",
  },
]

export const courses: Course[] = [
  {
    id: "1",
    code: "INFO101",
    name: "Introduction à l'informatique",
    description: "Cours d'introduction aux concepts fondamentaux de l'informatique",
    credits: 3,
    programId: "1",
    programName: "Licence en Informatique",
    semester: "fall",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "2",
    code: "INFO102",
    name: "Programmation en Python",
    description: "Introduction à la programmation avec Python",
    credits: 4,
    programId: "1",
    programName: "Licence en Informatique",
    semester: "fall",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "3",
    code: "INFO201",
    name: "Structures de données",
    description: "Étude des structures de données fondamentales",
    credits: 4,
    programId: "1",
    programName: "Licence en Informatique",
    semester: "spring",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "4",
    code: "WEB301",
    name: "Développement Web Frontend",
    description: "Techniques et frameworks pour le développement frontend",
    credits: 5,
    programId: "2",
    programName: "Master en Développement Web",
    semester: "fall",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "5",
    code: "WEB302",
    name: "Développement Web Backend",
    description: "Techniques et frameworks pour le développement backend",
    credits: 5,
    programId: "2",
    programName: "Master en Développement Web",
    semester: "spring",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "6",
    code: "MATH101",
    name: "Analyse mathématique",
    description: "Introduction à l'analyse mathématique",
    credits: 4,
    programId: "3",
    programName: "Licence en Mathématiques",
    semester: "fall",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "7",
    code: "MATH102",
    name: "Algèbre linéaire",
    description: "Fondements de l'algèbre linéaire",
    credits: 4,
    programId: "3",
    programName: "Licence en Mathématiques",
    semester: "spring",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "8",
    code: "STAT301",
    name: "Statistiques avancées",
    description: "Méthodes statistiques avancées et applications",
    credits: 5,
    programId: "4",
    programName: "Master en Statistiques",
    semester: "fall",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "9",
    code: "PHYS101",
    name: "Mécanique classique",
    description: "Introduction à la mécanique classique",
    credits: 4,
    programId: "5",
    programName: "Licence en Physique",
    semester: "fall",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
  {
    id: "10",
    code: "ECON101",
    name: "Microéconomie",
    description: "Principes fondamentaux de la microéconomie",
    credits: 3,
    programId: "6",
    programName: "Licence en Économie",
    semester: "fall",
    academicYearId: "2",
    academicYearName: "2023-2024",
  },
]

// Helper functions
export async function getDepartments() {
  return departments
}

export async function getDepartment(id: string) {
  return departments.find((dept) => dept.id === id)
}

export async function getPrograms(departmentId?: string) {
  if (departmentId) {
    return programs.filter((program) => program.departmentId === departmentId)
  }
  return programs
}

export async function getProgram(id: string) {
  return programs.find((program) => program.id === id)
}

export async function getStudents(programId?: string) {
  if (programId) {
    return students.filter((student) => student.programId === programId)
  }
  return students
}

export async function getStudent(id: string) {
  return students.find((student) => student.id === id)
}

export async function getAcademicYears() {
  return academicYears
}

export async function getAcademicYear(id: string) {
  return academicYears.find((year) => year.id === id)
}

export async function getCurrentAcademicYear() {
  return academicYears.find((year) => year.isCurrent)
}

export async function getRegistrations(studentId?: string, academicYearId?: string) {
  let filteredRegistrations = registrations

  if (studentId) {
    filteredRegistrations = filteredRegistrations.filter((reg) => reg.studentId === studentId)
  }

  if (academicYearId) {
    filteredRegistrations = filteredRegistrations.filter((reg) => reg.academicYearId === academicYearId)
  }

  return filteredRegistrations
}

export async function getRegistration(id: string) {
  return registrations.find((reg) => reg.id === id)
}

export async function getCourses(programId?: string, academicYearId?: string) {
  let filteredCourses = courses

  if (programId) {
    filteredCourses = filteredCourses.filter((course) => course.programId === programId)
  }

  if (academicYearId) {
    filteredCourses = filteredCourses.filter((course) => course.academicYearId === academicYearId)
  }

  return filteredCourses
}

export async function getCourse(id: string) {
  return courses.find((course) => course.id === id)
}
