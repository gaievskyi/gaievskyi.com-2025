import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import "@/styles/globals.css"
import type { PropsWithChildren } from "react"
import { getServerSideURL } from "@/lib/get-url"
import { geistMono, geistSans, heldaneText } from "@/lib/fonts"
import { ScreenSizeIndicator } from "@/components/dev-screen-size-indicator"
import { ProgressiveBlur } from "@/components/progressive-blur"
import { LetHimCook } from "@/components/console-message"

const url = getServerSideURL()

export const metadata: Metadata = {
  title: "Daniel Gaievskyi",
  description:
    "Someone who loves mixing different approaches, genres and styles to create unique, innovative experiences. I enjoy pushing boundaries and exploring new ways to express myself without limitations.",
  category: "technology",
  keywords: [
    "Daniel Gaievskyi",
    "frontend engineer",
    "design engineer",
    "frontend developer",
    "creative developer",
    "React developer",
    "react",
    "web development",
    "web design",
    "UI/UX",
    "Typescript",
    "JavaScript",
    "portfolio",
    "software developer",
    "software engineer",
    "technology",
    "computer science",
  ],
  authors: [{ name: "Daniel Gaievskyi", url }],
  creator: "Daniel Gaievskyi",
  publisher: "Daniel Gaievskyi",
  metadataBase: new URL(url),
  openGraph: {
    siteName: "@dgaievskyi",
    type: "website",
    locale: "en_US",
    url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Gaievskyi",
    creator: "@dgaievskyi",
  },
  alternates: {
    canonical: url,
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

type RootLayoutProps = Readonly<PropsWithChildren>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="preload"
        href="/sprite.0c9c0721.svg"
        as="image"
        type="image/svg+xml"
      />
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${heldaneText.variable} ${geistSans.className} relative antialiased`}
      >
        <Providers>
          <ProgressiveBlur
            position="top"
            direction="top"
            className="h-[40px] md:h-[50px]"
          />
          {children}
          <ProgressiveBlur
            position="bottom"
            direction="bottom"
            className="h-[40px] md:h-[50px]"
          />
        </Providers>
        <ScreenSizeIndicator />
      </body>
      <LetHimCook />
    </html>
  )
}
