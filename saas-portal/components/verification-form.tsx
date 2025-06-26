"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function VerificationForm() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [canResend, setCanResend] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [phoneNumber, setPhoneNumber] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  useEffect(() => {
    // Récupérer les données d'inscription depuis sessionStorage
    const registrationData = sessionStorage.getItem("registrationData")
    if (registrationData) {
      const data = JSON.parse(registrationData)
      setPhoneNumber(data.phone || "")
    } else {
      // Si pas de données d'inscription, rediriger vers register
      router.push("/register")
    }

    // Focus sur le premier champ
    inputRefs.current[0]?.focus()

    // Timer pour le renvoi du code
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Empêcher la saisie de plusieurs caractères

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    // Passer au champ suivant si un chiffre est saisi
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Vérifier automatiquement si tous les champs sont remplis
    if (newCode.every((digit) => digit !== "") && newCode.join("").length === 6) {
      verifyCode(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Si le champ est vide et on appuie sur backspace, aller au champ précédent
      inputRefs.current[index - 1]?.focus()
    }
  }

  const verifyCode = async (codeToVerify: string) => {
    if (attempts >= 3) {
      toast.error("Trop de tentatives. Veuillez réessayer plus tard.")
      return
    }

    setIsLoading(true)

    try {
      // Simuler la vérification du code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Code de test pour la démonstration
      if (codeToVerify === "123456") {
        toast.success("Code vérifié avec succès !")

        // Nettoyer les données temporaires
        sessionStorage.removeItem("registrationData")

        // Rediriger vers le dashboard
        router.push("/dashboard")
      } else {
        setAttempts((prev) => prev + 1)
        setCode(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()

        const remainingAttempts = 3 - (attempts + 1)
        if (remainingAttempts > 0) {
          toast.error(`Code incorrect. ${remainingAttempts} tentative(s) restante(s).`)
        } else {
          toast.error("Trop de tentatives. Compte temporairement bloqué.")
        }
      }
    } catch (error) {
      toast.error("Erreur lors de la vérification. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)

    try {
      // Simuler l'envoi d'un nouveau code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Un nouveau code a été envoyé !")
      setCanResend(false)
      setResendTimer(60)
      setAttempts(0)
      setCode(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()

      // Redémarrer le timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      toast.error("Erreur lors de l'envoi du code.")
    } finally {
      setIsLoading(false)
    }
  }

  const maskedPhone = phoneNumber ? phoneNumber.slice(0, 3) + "****" + phoneNumber.slice(-2) : "****"

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Code envoyé au <span className="font-medium">{maskedPhone}</span>
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-lg font-semibold"
            disabled={isLoading || attempts >= 3}
          />
        ))}
      </div>

      {attempts > 0 && attempts < 3 && (
        <div className="text-center">
          <p className="text-sm text-red-600">{3 - attempts} tentative(s) restante(s)</p>
        </div>
      )}

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Vous n'avez pas reçu le code ?</p>
        <Button
          variant="ghost"
          onClick={handleResendCode}
          disabled={!canResend || isLoading || attempts >= 3}
          className="text-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : canResend ? (
            "Renvoyer le code"
          ) : (
            `Renvoyer dans ${resendTimer}s`
          )}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Code de test pour la démonstration : <span className="font-mono font-semibold">123456</span>
        </p>
      </div>
    </div>
  )
}
