import type { Metadata } from "next";
import { Inria_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider"
import Footer from "@/components/Footer";
import TanStackProvider from "@/providers/TanStackProvider";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "OnlyAnime",
  description: "OnlyAnime is a platform for buying anime related merchandise and also gives you a platform to access exclusive content form all the weeb around the world",
};

const inria = Inria_Serif({
  display: 'swap',
  subsets: ['latin'],
  weight: ["300", "400", "700"]
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logos/logo.svg" sizes="any" />
        <link href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div className="h-screen flex flex-col">
            <div className="flex-1">
              <TanStackProvider>
                <Toaster
                toastOptions={{
                  className:inria.className
                }}
                position="top-right"
                />
                {children}
              </TanStackProvider>
            </div>
            <Footer />
          </div>
          </ThemeProvider></body>
    </html>
  );
}
