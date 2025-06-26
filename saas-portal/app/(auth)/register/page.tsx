import Link from "next/link"
import type { Metadata } from "next"
import RegisterForm from "@/components/register-form"

export const metadata: Metadata = {
  title: "Créer une instance | UniServices",
  description: "Créez une instance UniServices pour votre université",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <Link href="/" className="absolute left-8 top-8 flex items-center text-lg font-bold">
          UniServices
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Créer une instance universitaire</h1>
            <p className="text-sm text-muted-foreground">
              Entrez les informations de votre université pour créer votre instance personnalisée
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            En créant une instance, vous acceptez nos{" "}
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
