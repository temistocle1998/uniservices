import type { Metadata } from "next"
import { VerificationForm } from "@/components/verification-form"

export const metadata: Metadata = {
  title: "Vérification - SaaS Universitaire",
  description: "Vérifiez votre numéro de téléphone pour activer votre instance universitaire",
}

export default function VerifyPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Vérifiez votre numéro</h1>
            <p className="text-sm text-muted-foreground">
              Nous avons envoyé un code de vérification à 6 chiffres sur votre téléphone. Saisissez-le ci-dessous pour
              activer votre instance universitaire.
            </p>
          </div>
          <VerificationForm />
        </div>
      </div>
    </div>
  )
}
