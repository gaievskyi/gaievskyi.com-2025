import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Providers } from "@/components/providers"
import "@/styles/globals.css"
import type { PropsWithChildren } from "react"
import { getServerSideURL } from "@/lib/get-url"
import { geistMono, geistSans, heldaneText } from "@/lib/fonts"
import { ScreenSizeIndicator } from "@/components/dev-screen-size-indicator"
import { ProgressiveBlur } from "@/components/progressive-blur"
import { LetHimCook } from "@/components/console-message"

const url = getServerSideURL()
const name = "Daniel Gaievskyi"
const description =
  "Someone who loves mixing different approaches, genres and styles to create unique, innovative experiences. I enjoy pushing boundaries and exploring new ways to express myself without limitations."

export const metadata: Metadata = {
  title: name,
  description,
  category: "technology",
  authors: [{ name: "Daniel Gaievskyi", url }],
  creator: name,
  metadataBase: new URL(url),
  openGraph: {
    images: [
      {
        url: `/images/opengraph-image.png`,
        alt: name,
        width: 834,
        height: 446,
      },
    ],
    siteName: "@dgaievskyi",
    type: "website",
    locale: "en_US",
    url,
  },
  twitter: {
    card: "summary_large_image",
    title: "@dgaievskyi",
    creator: "@dgaievskyi",
  },
  alternates: {
    canonical: url,
    types: {
      "text/plain": `${url}/llms.txt`,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
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
        href="/sprites/sprite.85958a4f.svg"
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
            className="h-[40px] md:h-[60px]"
          />
          {children}
        </Providers>
        <ScreenSizeIndicator />
      </body>
      <LetHimCook />
      <SpeedInsights />
      <Analytics />
    </html>
  )
}
