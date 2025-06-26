import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Administration SaaS",
    template: "%s | Administration SaaS",
  },
  description: "Administration générale du SaaS universitaire",
}

export default function SaasAdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
    </div>
  )
}
