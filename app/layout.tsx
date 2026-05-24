import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayam Geprek Merakyat",
  description: "Marketplace Ayam Geprek Paling Merakyat dan Kekinian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased selection:bg-primary selection:text-primary-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
