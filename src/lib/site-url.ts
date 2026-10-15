/**
 * The public origin for canonical URLs and SEO files.
 *
 * Set NEXT_PUBLIC_SITE_URL to the approved production origin (for example,
 * https://www.example.com) before a production release. Do not use a preview
 * deployment URL as the permanent canonical origin.
 */
export function getSiteUrl(): URL | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return undefined;

  try {
    const parsed = new URL(configured);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return undefined;
    }

    return new URL(parsed.origin);
  } catch {
    return undefined;
  }
}
