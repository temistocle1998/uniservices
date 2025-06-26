import Link from "next/link"
import type { Metadata } from "next"
import AuthForm from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Connexion | UniServices",
  description: "Connectez-vous à votre compte UniServices",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <Link href="/" className="absolute left-8 top-8 flex items-center text-lg font-bold">
          UniServices
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Bienvenue</h1>
            <p className="text-sm text-muted-foreground">
              Entrez vos identifiants pour accéder à votre tableau de bord
            </p>
          </div>
          <AuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            En vous connectant, vous acceptez nos{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
