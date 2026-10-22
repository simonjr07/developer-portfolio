const LOCAL_DEVELOPMENT_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * The public origin for canonical URLs and SEO files.
 *
 * Set NEXT_PUBLIC_SITE_URL to the approved production origin (for example,
 * https://www.example.com) before a production release. Do not use a preview
 * deployment URL as the permanent canonical origin.
 *
 * Public origins must use HTTPS. Plain HTTP is accepted only for loopback
 * development hosts, and invalid or missing values fail closed.
 */
export function getSiteUrl(): URL | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return undefined;

  try {
    const parsed = new URL(configured);
    const isLocalHttp =
      parsed.protocol === "http:" &&
      LOCAL_DEVELOPMENT_HOSTNAMES.has(parsed.hostname);

    if (parsed.protocol !== "https:" && !isLocalHttp) {
      return undefined;
    }

    return new URL(parsed.origin);
  } catch {
    return undefined;
  }
}
