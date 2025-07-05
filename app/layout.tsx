import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tfr-website-production.up.railway.app";

export const metadata: Metadata = {
  title: "Tristan Friedberg Rodman - Product Leader in Music & AI",
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;700&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
