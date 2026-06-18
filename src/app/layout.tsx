import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  title: { default: "Easy Clean | Lavandaria ao Domicílio Luxembourg", template: "%s | Easy Clean" },
  description:
    "Recolhemos, lavamos e entregamos a tua roupa em Luxembourg. Rapido, facil e sustentavel.",
  keywords: ["lavandaria", "luxembourg", "lavagem roupa", "entrega casa", "easy clean"],
  applicationName: "Easy Clean",
  appleWebApp: {
    capable: true,
    title: "Easy Clean",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
  },
  icons: {
    icon: "/app-icon.svg",
    apple: "/app-icon.svg",
  },
  openGraph: {
    title: "Easy Clean Luxembourg",
    description: "Lavandaria ao domicílio em Luxembourg",
    type: "website",
    locale: "pt_PT",
  },
};

export const viewport: Viewport = {
  themeColor: "#2d6a2d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={geist.variable}>
      <body className="min-h-screen bg-white antialiased">
        <Analytics />
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
