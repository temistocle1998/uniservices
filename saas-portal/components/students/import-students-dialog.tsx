"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { FileSpreadsheet, Upload, AlertCircle, CheckCircle, Loader2, Download } from "lucide-react"
import { toast } from "sonner"

export default function ImportStudentsDialog() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [previewData, setPreviewData] = useState<string[][]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)
    setSuccess(false)
    setPreviewData([])

    if (!selectedFile) {
      return
    }

    // Vérifier le type de fichier
    if (!selectedFile.name.endsWith(".csv") && !selectedFile.name.endsWith(".xlsx")) {
      setError("Format de fichier non pris en charge. Veuillez utiliser un fichier CSV ou Excel (.xlsx).")
      return
    }

    setFile(selectedFile)

    // Simuler un aperçu des données (dans une application réelle, vous analyseriez le fichier)
    if (selectedFile.name.endsWith(".csv")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const lines = content.split("\n").slice(0, 6) // Prendre les 5 premières lignes + en-tête
        const data = lines.map((line) => line.split(","))
        setPreviewData(data)
      }
      reader.readAsText(selectedFile)
    } else {
      // Pour les fichiers Excel, on simulerait l'analyse
      setPreviewData([
        ["Prénom", "Nom", "Email", "Numéro étudiant", "Département", "Programme"],
        ["Marie", "Dupont", "marie.dupont@etudiant.fr", "20230001", "Sciences", "Licence en Mathématiques"],
        ["Thomas", "Martin", "thomas.martin@etudiant.fr", "20230002", "Lettres", "Licence en Histoire"],
        ["Sophie", "Bernard", "sophie.bernard@etudiant.fr", "20230003", "Droit", "Master en Droit des Affaires"],
        ["Lucas", "Petit", "lucas.petit@etudiant.fr", "20230004", "Sciences", "Master en Physique"],
      ])
    }
  }

  const handleImport = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier à importer.")
      return
    }

    setIsLoading(true)
    setProgress(0)
    setError(null)
    setSuccess(false)

    try {
      // Simuler le processus d'importation
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      // Simuler une réussite après le chargement
      setSuccess(true)
      toast.success(`${file.name} importé avec succès`)

      // Réinitialiser après un délai
      setTimeout(() => {
        setOpen(false)
        setFile(null)
        setProgress(0)
        setSuccess(false)
        setPreviewData([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        router.refresh()
      }, 1500)
    } catch (error) {
      console.error(error)
      setError("Une erreur s'est produite lors de l'importation du fichier.")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadTemplate = () => {
    // Créer un contenu CSV pour le modèle
    const csvContent = [
      "Prénom,Nom,Email,Numéro étudiant,Date de naissance,Genre,Département,Programme,Année d'études,Statut",
      "Marie,Dupont,marie.dupont@etudiant.fr,20230001,1999-05-15,Femme,Sciences,Licence en Mathématiques,1ère année,active",
      "Thomas,Martin,thomas.martin@etudiant.fr,20230002,2000-02-20,Homme,Lettres,Licence en Histoire,2ème année,active",
    ].join("\n")

    // Créer un blob et un lien de téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "modele_import_etudiants.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Importer des étudiants
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importer des étudiants</DialogTitle>
          <DialogDescription>
            Importez une liste d'étudiants à partir d'un fichier CSV ou Excel (.xlsx).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!file && !isLoading && !success && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="file">Fichier à importer</Label>
                <Button variant="outline" size="sm" onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le modèle
                </Button>
              </div>
              <div className="grid gap-2">
                <Input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv,.xlsx"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Formats acceptés : CSV (.csv) et Excel (.xlsx). Taille maximale : 10 MB.
                </p>
              </div>
            </>
          )}

          {file && !isLoading && !success && (
            <>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {previewData.length > 0 && (
                <div className="rounded-md border overflow-auto max-h-[200px]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        {previewData[0].map((header, i) => (
                          <th key={i} className="p-2 text-left font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(1).map((row, i) => (
                        <tr key={i} className="border-t">
                          {row.map((cell, j) => (
                            <td key={j} className="p-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p>Importation en cours...</p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Veuillez patienter pendant que nous traitons votre fichier. Cela peut prendre quelques instants.
              </p>
            </div>
          )}

          {success && (
            <Alert className="border-green-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Importation réussie</AlertTitle>
              <AlertDescription>
                Votre fichier a été importé avec succès. Les étudiants ont été ajoutés à la base de données.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            {success ? "Fermer" : "Annuler"}
          </Button>
          {file && !isLoading && !success && (
            <Button type="button" onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
