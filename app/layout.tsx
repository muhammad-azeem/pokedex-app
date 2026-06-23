import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pokédex — All 151 Original Pokémon",
    template: "%s | Pokédex",
  },
  description:
    "Explore all 151 original Pokémon. Search by name, filter by type, view stats, attacks, weaknesses, and evolutions.",
  keywords: ["Pokémon", "Pokédex", "Gen 1", "GraphQL"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
