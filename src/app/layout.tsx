"use client"
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <title>ShareTimeWithMe</title>
        <meta name="description" content="The simplest way to coordinate with your circle." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30">
        <Analytics />
        <main className="flex-1 flex flex-col items-center">
          {children}
        </main>
        <footer className='w-full p-12 text-foreground/30 text-[11px] font-medium text-center border-t border-foreground/[0.03]'>
          Created by <a href='https://www.valeriovalletta.it' className="hover:text-foreground transition-colors">Valerio Valletta</a>
        </footer>
      </body>
    </html>
  );
}
