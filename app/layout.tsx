import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "DSX - Gestión Presupuestaria Inteligente | Dawarly Software",
  description:
    "Plataforma SaaS futurista para gestión presupuestaria empresarial. Controla, ejecuta y optimiza presupuestos con tecnología de vanguardia. Prueba gratis.",
  generator: "DSX by Dawarly",
  keywords: "gestión presupuestaria, software empresarial, SaaS, presupuestos, finanzas, startup, tecnología",
  authors: [{ name: "Dawarly Software" }],
  creator: "Dawarly Software",
  publisher: "Dawarly Software",
  robots: "index, follow",
  openGraph: {
    title: "DSX - Gestión Presupuestaria Inteligente",
    description: "Transforma tu gestión financiera con nuestra plataforma SaaS de vanguardia",
    type: "website",
    locale: "es_ES",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${dmSans.variable} dark`}>
      <head>
        <style>{`
html {
  --font-heading: ${spaceGrotesk.style.fontFamily};
  --font-body: ${dmSans.style.fontFamily};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
