import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
const siteTitle = "Simon Chikaobi | Full-Stack Web Developer";
const siteDescription =
  "Simon Chikaobi builds modern business websites and web applications, from booking and ordering experiences to custom business tools.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: {
    default: siteTitle,
    template: "%s | Simon Chikaobi",
  },
  description: siteDescription,
  applicationName: "Simon Chikaobi Portfolio",
  authors: [{ name: "Simon Chikaobi" }],
  creator: "Simon Chikaobi",
  publisher: "Simon Chikaobi",
  // Avoid indexing local builds or deployments that have not been given
  // an explicit, approved public origin.
  robots: {
    index: Boolean(siteUrl),
    follow: Boolean(siteUrl),
    googleBot: {
      index: Boolean(siteUrl),
      follow: Boolean(siteUrl),
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Simon Chikaobi",
    title: siteTitle,
    description: siteDescription,
    ...(siteUrl
      ? {
          images: [
            {
              url: new URL("/social-card", siteUrl).toString(),
              width: 1200,
              height: 630,
              alt: "Simon Chikaobi — Full-Stack Web Developer building business websites and useful web applications.",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    ...(siteUrl
      ? { images: [new URL("/social-card", siteUrl).toString()] }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
