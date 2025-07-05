import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tristan Rodman - Product Leader in Music & Technology",
  description: "I solve problems for musicians, music lovers, and the organizations that support them.",
  openGraph: {
    title: "Tristan Rodman - Product Leader in Music & Technology",
    description: "I solve problems for musicians, music lovers, and the organizations that support them.",
    type: "website",
    siteName: "Tristan Friedberg Rodman",
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
