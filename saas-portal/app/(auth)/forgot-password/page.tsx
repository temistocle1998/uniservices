import Link from "next/link"
import type { Metadata } from "next"
import ForgotPasswordForm from "@/components/forgot-password-form"

export const metadata: Metadata = {
  title: "Mot de passe oublié | UniServices",
  description: "Réinitialisez votre mot de passe UniServices",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <Link href="/" className="absolute left-8 top-8 flex items-center text-lg font-bold">
          UniServices
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Mot de passe oublié</h1>
            <p className="text-sm text-muted-foreground">
              Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe
            </p>
          </div>
          <ForgotPasswordForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
