import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
  socialTitle?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle,
}: PageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = siteUrl ? new URL(path, siteUrl).toString() : undefined;
  const imageUrl = siteUrl
    ? new URL("/social-card", siteUrl).toString()
    : undefined;
  const resolvedSocialTitle =
    socialTitle ??
    (title ? `${title} | Simon Chikaobi` : "Simon Chikaobi | Full-Stack Web Developer");

  return {
    ...(title ? { title } : {}),
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Simon Chikaobi",
      title: resolvedSocialTitle,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
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
      title: resolvedSocialTitle,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}
