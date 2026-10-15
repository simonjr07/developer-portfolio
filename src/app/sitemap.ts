import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  // Never publish invented or preview-host canonical URLs. Configure
  // NEXT_PUBLIC_SITE_URL for the approved public origin before launch.
  if (!siteUrl) return [];

  const pages: MetadataRoute.Sitemap = [
    { url: new URL("/", siteUrl).toString(), priority: 1 },
    { url: new URL("/projects", siteUrl).toString(), priority: 0.9 },
    { url: new URL("/services", siteUrl).toString(), priority: 0.8 },
    { url: new URL("/about", siteUrl).toString(), priority: 0.7 },
    { url: new URL("/contact", siteUrl).toString(), priority: 0.8 },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
      priority: 0.7,
    })),
  ];

  return pages.map((page) => ({
    ...page,
    changeFrequency: "monthly",
  }));
}
