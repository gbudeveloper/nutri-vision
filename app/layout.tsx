import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Nutri Vision - AI-Powered Food Recognition & Nutrition Analysis",
  description:
    "Instantly identify food items and get comprehensive nutritional breakdowns using cutting-edge AI and computer vision technology. Make healthier choices with professional-grade dietary analysis.",
  keywords: [
    "nutrition",
    "food recognition",
    "AI",
    "calorie counter",
    "diet tracking",
    "health",
    "macros",
  ],
  authors: [{ name: "Nutri Vision" }],
  openGraph: {
    title: "Nutri Vision - See Your Food. Know Your Nutrition.",
    description:
      "AI-powered food recognition for instant nutritional analysis",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10B981" },
    { media: "(prefers-color-scheme: dark)", color: "#059669" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
