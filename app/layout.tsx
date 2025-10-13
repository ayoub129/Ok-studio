import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { LoadingScreen } from "@/components/loading-screen"

export const metadata: Metadata = {
  title: "The OK Studios - Professional Podcast Recording Studio",
  description:
    "State-of-the-art podcast recording studio with premium equipment and expert production services. Book your session today.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LoadingScreen>
          <CustomCursor />
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </LoadingScreen>
      </body>
    </html>
  )
}
