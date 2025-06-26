import { Spinner } from "@/components/ui/spinner"

interface PageLoadingProps {
  message?: string
}

export default function PageLoading({ message = "Chargement..." }: PageLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
