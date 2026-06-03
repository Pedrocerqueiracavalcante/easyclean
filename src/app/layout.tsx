import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: { default: "Easy Clean | Lavandaria ao Domicílio Luxembourg", template: "%s | Easy Clean" },
  description:
    "Recolhemos, lavamos e entregamos a tua roupa em Luxembourg. Rápido, fácil e sustentável.",
  keywords: ["lavandaria", "luxembourg", "lavagem roupa", "entrega casa", "easy clean"],
  openGraph: {
    title: "Easy Clean Luxembourg",
    description: "Lavandaria ao domicílio em Luxembourg",
    type: "website",
    locale: "pt_PT",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={geist.variable}>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
