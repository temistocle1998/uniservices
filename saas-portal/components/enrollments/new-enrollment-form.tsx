"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Search, CreditCard, FileText } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NewEnrollmentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [studentFound, setStudentFound] = useState(false)
  const [showPaymentSection, setShowPaymentSection] = useState(false)
  const [enrollmentComplete, setEnrollmentComplete] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phone: "",
    department: "",
    program: "",
    year: "",
    paymentMethod: "cash",
    paymentAmount: "1500",
    paymentExemption: false,
    exemptionReason: "",
    acceptTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSearchStudent = async () => {
    setIsSearching(true)

    try {
      // Simuler une recherche d'étudiant
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simuler qu'aucun étudiant n'est trouvé pour une nouvelle inscription
      setStudentFound(false)

      toast.info("Aucun étudiant existant trouvé. Veuillez remplir le formulaire pour une nouvelle inscription.")
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la recherche de l'étudiant")
      console.error(error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleContinueToPayment = () => {
    // Vérifier que tous les champs obligatoires sont remplis
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.department ||
      !formData.program ||
      !formData.year
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    setShowPaymentSection(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Vérifier que les conditions sont acceptées
      if (!formData.acceptTerms) {
        toast.error("Veuillez accepter les conditions d'inscription")
        setIsLoading(false)
        return
      }

      // Simuler l'enregistrement de l'inscription
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Générer un numéro de reçu fictif
      const generatedReceiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`
      setReceiptNumber(generatedReceiptNumber)

      // Afficher un message de succès
      toast.success("Inscription enregistrée avec succès")
      setEnrollmentComplete(true)

      // Faire défiler vers le haut pour voir le message de succès
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'enregistrement de l'inscription")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrintReceipt = () => {
    toast.info("Impression du reçu en cours...")
    // Dans une application réelle, cela ouvrirait une fenêtre d'impression ou générerait un PDF
  }

  const handleNewEnrollment = () => {
    // Réinitialiser le formulaire pour une nouvelle inscription
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      phone: "",
      department: "",
      program: "",
      year: "",
      paymentMethod: "cash",
      paymentAmount: "1500",
      paymentExemption: false,
      exemptionReason: "",
      acceptTerms: false,
    })
    setShowPaymentSection(false)
    setEnrollmentComplete(false)
    setReceiptNumber("")
  }

  if (enrollmentComplete) {
    return (
      <div className="space-y-6">
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <AlertTitle className="text-green-600 dark:text-green-400">Inscription réussie</AlertTitle>
          <AlertDescription className="text-green-600 dark:text-green-400">
            L'étudiant {formData.firstName} {formData.lastName} a été inscrit avec succès pour l'année académique
            2023-2024.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Détails de l'inscription</h3>
                  <p className="text-sm text-muted-foreground">Numéro de reçu: {receiptNumber}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Étudiant</p>
                  <p className="text-sm">
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Département</p>
                  <p className="text-sm">{formData.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Programme</p>
                  <p className="text-sm">{formData.program}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Année d'études</p>
                  <p className="text-sm">{formData.year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date d'inscription</p>
                  <p className="text-sm">{new Date().toLocaleDateString("fr-FR")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Montant payé</p>
                  <p className="text-sm">
                    {formData.paymentExemption
                      ? "Exonéré"
                      : new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(Number(formData.paymentAmount))}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Méthode de paiement</p>
                  <p className="text-sm">
                    {formData.paymentExemption
                      ? "N/A"
                      : formData.paymentMethod === "cash"
                        ? "Espèces"
                        : "Carte bancaire"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleNewEnrollment}>
                  Nouvelle inscription
                </Button>
                <Button onClick={handlePrintReceipt}>
                  <FileText className="mr-2 h-4 w-4" />
                  Imprimer le reçu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section de recherche d'étudiant */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Rechercher un étudiant par nom, prénom ou numéro étudiant..."
            className="flex-1"
            disabled={isSearching}
          />
          <Button type="button" onClick={handleSearchStudent} disabled={isSearching}>
            {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            {isSearching ? "Recherche..." : "Rechercher"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Si l'étudiant existe déjà dans le système, recherchez-le d'abord. Sinon, remplissez le formulaire ci-dessous.
        </p>
      </div>

      {/* Section d'informations personnelles */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations personnelles</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Prénom *</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Nom *</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dateOfBirth">Date de naissance *</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Genre *</Label>
            <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Homme">Homme</SelectItem>
                <SelectItem value="Femme">Femme</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
                <SelectItem value="Non précisé">Non précisé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="address">Adresse</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Section d'informations académiques */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations académiques</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="department">Département *</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sciences">Sciences</SelectItem>
                <SelectItem value="Lettres">Lettres</SelectItem>
                <SelectItem value="Droit">Droit</SelectItem>
                <SelectItem value="Économie">Économie</SelectItem>
                <SelectItem value="Médecine">Médecine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="program">Programme *</Label>
            <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Licence en Mathématiques">Licence en Mathématiques</SelectItem>
                <SelectItem value="Licence en Informatique">Licence en Informatique</SelectItem>
                <SelectItem value="Licence en Physique">Licence en Physique</SelectItem>
                <SelectItem value="Master en Mathématiques">Master en Mathématiques</SelectItem>
                <SelectItem value="Master en Informatique">Master en Informatique</SelectItem>
                <SelectItem value="Licence en Histoire">Licence en Histoire</SelectItem>
                <SelectItem value="Master en Droit des Affaires">Master en Droit des Affaires</SelectItem>
                <SelectItem value="Licence en Économie">Licence en Économie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Année d'études *</Label>
            <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1ère année">1ère année</SelectItem>
                <SelectItem value="2ème année">2ème année</SelectItem>
                <SelectItem value="3ème année">3ème année</SelectItem>
                <SelectItem value="4ème année">4ème année</SelectItem>
                <SelectItem value="5ème année">5ème année</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Bouton pour continuer vers la section de paiement */}
      {!showPaymentSection && (
        <div className="flex justify-end">
          <Button type="button" onClick={handleContinueToPayment}>
            Continuer vers le paiement
          </Button>
        </div>
      )}

      {/* Section de paiement */}
      {showPaymentSection && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informations de paiement</h3>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="paymentExemption"
                checked={formData.paymentExemption}
                onCheckedChange={(checked) => handleCheckboxChange("paymentExemption", checked === true)}
              />
              <Label htmlFor="paymentExemption">Exonération de frais</Label>
            </div>
            {formData.paymentExemption && (
              <div className="grid gap-2">
                <Label htmlFor="exemptionReason">Motif d'exonération</Label>
                <Input
                  id="exemptionReason"
                  name="exemptionReason"
                  value={formData.exemptionReason}
                  onChange={handleChange}
                  required={formData.paymentExemption}
                />
              </div>
            )}
            {!formData.paymentExemption && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="paymentAmount">Montant à payer (€)</Label>
                  <Input
                    id="paymentAmount"
                    name="paymentAmount"
                    type="number"
                    value={formData.paymentAmount}
                    onChange={handleChange}
                    required={!formData.paymentExemption}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Méthode de paiement</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Espèces</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Carte bancaire</Label>
                    </div>
                  </RadioGroup>
                </div>
                {formData.paymentMethod === "card" && (
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Paiement par carte bancaire</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Le paiement sera traité par notre terminal de paiement. Veuillez avoir votre carte bancaire prête.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => handleCheckboxChange("acceptTerms", checked === true)}
              required
            />
            <Label htmlFor="acceptTerms" className="text-sm">
              J'accepte les conditions d'inscription et je certifie que les informations fournies sont exactes.
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowPaymentSection(false)}>
              Retour
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Traitement..." : "Finaliser l'inscription"}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
