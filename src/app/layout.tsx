import type { Metadata } from "next";
import { Inter, DynaPuff } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { _config } from "@/lib/_config";
import { CreateLinkDialogProvider } from "@/contexts/createLinkDialogContext";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
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
        <CreateLinkDialogProvider>
          <body
            className={`${interSans.variable} ${dynaPuff.variable} antialiased`}>
            {children}
          </body>
        </CreateLinkDialogProvider>
      </html>
    </GoogleOAuthProvider>
  );
}
