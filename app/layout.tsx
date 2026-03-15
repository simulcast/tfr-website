import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tfr-website.vercel.app";

export const metadata: Metadata = {
  title: "Tristan Friedberg Rodman - Product Leader in Music & AI | Splice, LA Phil",
  description: "I make products that solve problems for musicians, music lovers, and the organizations that support them.",
  openGraph: {
    title: "Tristan Friedberg Rodman - Product Leader in Music & AI",
    description: "I make products that solve problems for musicians, music lovers, and the organizations that support them.",
    type: "website",
    siteName: "Tristan Friedberg Rodman",
    images: [
      {
        url: `${siteUrl}/images/headshot-opengraph.png`,
        width: 1200,
        height: 630,
        alt: "Tristan Friedberg Rodman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tristan Friedberg Rodman - Product Leader in Music & AI",
    description: "I solve problems for musicians, music lovers, and the organizations that support them.",
    images: [`${siteUrl}/images/headshot-opengraph.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
