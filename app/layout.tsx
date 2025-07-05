import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tristan Friedberg Rodman - Product Leader in Music & AI",
  description: "I solve problems for musicians, music lovers, and the organizations that support them.",
  openGraph: {
    title: "Tristan Friedberg Rodman - Product Leader in Music & AI",
    description: "I solve problems for musicians, music lovers, and the organizations that support them.",
    type: "website",
    siteName: "Tristan Friedberg Rodman",
    images: [
      {
        url: "/images/headshot.png",
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
    images: ["/images/headshot.png"],
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
