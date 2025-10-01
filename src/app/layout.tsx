import type { Metadata } from "next";
import { DynaPuff, Outfit, Aoboshi_One, Fira_Code } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { _config } from "@/lib/_config";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const outfit_sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const aoboshi_one = Aoboshi_One({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});
const fira_code = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dynaPuff = DynaPuff({
  variable: "--font-dyna-puff",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LinkLite",
    template: "LinkLite | %s",
  },
  description:
    "Create, share, and manage your links in a distraction-free environment.",
  openGraph: {
    type: "website",
    title: "LinkLite",
    description:
      "Create, share, and manage your links in a distraction-free environment.",
    url: "https://linklite.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId={_config.google_client_id!}>
      <html lang="en">
        <body
          className={`${outfit_sans.variable} ${aoboshi_one.variable} ${fira_code.variable} ${dynaPuff.variable} antialiased`}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
