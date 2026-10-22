import { expect, test, type Page } from "@playwright/test";

const SITE_TITLE = "Simon Chikaobi | Full-Stack Web Developer";
const SITE_DESCRIPTION =
  "Simon Chikaobi builds modern business websites and web applications, from booking and ordering experiences to custom business tools.";
const SOCIAL_CARD_PATH = "/social-card";
const PUBLIC_ROUTES = [
  "/",
  "/projects",
  "/services",
  "/about",
  "/contact",
  "/projects/nexaservice",
  "/projects/copper-spoon",
  "/projects/aurelia-studio",
  "/projects/maison-vale",
] as const;

function getConfiguredTestOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return undefined;

  try {
    const origin = new URL(configured).origin;
    return new URL(origin).hostname.endsWith(".test") ? origin : undefined;
  } catch {
    return undefined;
  }
}

const testSiteOrigin = getConfiguredTestOrigin();

async function expectNotFoundMetadata(
  page: Page,
  title: string,
  description: string,
) {
  const socialTitle = `${title} | Simon Chikaobi`;

  await expect(page).toHaveTitle(socialTitle);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    description,
  );
  await expect(page.locator('meta[property="og:title"]').first()).toHaveAttribute(
    "content",
    socialTitle,
  );
  await expect(page.locator('meta[name="twitter:title"]').first()).toHaveAttribute(
    "content",
    socialTitle,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);

  for (const name of ["robots", "googlebot"]) {
    const values = await page
      .locator(`meta[name="${name}"]`)
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("content") ?? ""),
      );

    expect(values.length).toBeGreaterThan(0);
    for (const value of values) {
      expect(value).toContain("noindex");
      expect(value).not.toContain("index, follow");
    }
  }
}

function requireTestSiteOrigin() {
  if (!testSiteOrigin) {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL to an https://*.test origin before building and testing.",
    );
  }

  return testSiteOrigin;
}

test.describe("document metadata", () => {
  test("the homepage exposes a meaningful title and description", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(SITE_TITLE);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      SITE_DESCRIPTION,
    );
  });

  test("a case study exposes a page-specific title and description", async ({ page }) => {
    await page.goto("/projects/nexaservice");

    await expect(page).toHaveTitle("NexaService Case Study | Simon Chikaobi");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /workplace and facility-services website/i,
    );
  });

  test("unknown routes expose explicit noindex metadata", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expectNotFoundMetadata(
      page,
      "Page not found",
      "The requested page could not be found.",
    );
  });

  test("unknown project slugs expose explicit noindex metadata", async ({ page }) => {
    await page.goto("/projects/does-not-exist");
    await expectNotFoundMetadata(
      page,
      "Project not found",
      "This portfolio project could not be found.",
    );
  });
});

test.describe("configured test-origin SEO output", () => {
  test.beforeEach(() => {
    test.skip(
      !testSiteOrigin,
      "NEXT_PUBLIC_SITE_URL must be a test-only https://*.test origin before the build.",
    );
  });

  test("the homepage exposes canonical, Open Graph, and Twitter metadata", async ({
    page,
  }) => {
    const siteOrigin = requireTestSiteOrigin();
    const canonicalUrl = siteOrigin;
    const socialCardUrl = `${siteOrigin}${SOCIAL_CARD_PATH}`;

    await page.goto("/");
    await expect(page).toHaveTitle(SITE_TITLE);

    await expect(page.locator('link[rel="canonical"]').first()).toHaveAttribute(
      "href",
      canonicalUrl,
    );
    await expect(page.locator('meta[property="og:url"]').first()).toHaveAttribute(
      "content",
      canonicalUrl,
    );
    await expect(page.locator('meta[property="og:title"]').first()).toHaveAttribute(
      "content",
      SITE_TITLE,
    );
    await expect(page.locator('meta[property="og:description"]').first()).toHaveAttribute(
      "content",
      SITE_DESCRIPTION,
    );
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
      "content",
      socialCardUrl,
    );
    await expect(page.locator('meta[name="twitter:card"]').first()).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('meta[name="twitter:title"]').first()).toHaveAttribute(
      "content",
      SITE_TITLE,
    );
    await expect(page.locator('meta[name="twitter:image"]').first()).toHaveAttribute(
      "content",
      socialCardUrl,
    );
  });

  test("a case study exposes page-specific canonical and social metadata", async ({
    page,
  }) => {
    const siteOrigin = requireTestSiteOrigin();
    const canonicalUrl = `${siteOrigin}/projects/nexaservice`;
    const socialCardUrl = `${siteOrigin}${SOCIAL_CARD_PATH}`;

    await page.goto("/projects/nexaservice");

    await expect(page.locator('link[rel="canonical"]').first()).toHaveAttribute(
      "href",
      canonicalUrl,
    );
    await expect(page.locator('meta[property="og:url"]').first()).toHaveAttribute(
      "content",
      canonicalUrl,
    );
    await expect(page.locator('meta[property="og:title"]').first()).toHaveAttribute(
      "content",
      "NexaService Case Study | Simon Chikaobi",
    );
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
      "content",
      socialCardUrl,
    );
    await expect(page.locator('meta[name="twitter:image"]').first()).toHaveAttribute(
      "content",
      socialCardUrl,
    );
  });

  test("robots.txt allows indexing and references the sitemap", async ({ request }) => {
    const siteOrigin = requireTestSiteOrigin();
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const robots = await response.text();
    expect(robots).toMatch(/User-Agent:\s*\*/i);
    expect(robots).toMatch(/Allow:\s*\//i);
    expect(robots).toContain(`Sitemap: ${siteOrigin}/sitemap.xml`);
    expect(robots).not.toContain("Disallow:");
  });

  test("sitemap.xml lists the public routes with the configured test origin", async ({
    request,
  }) => {
    const siteOrigin = requireTestSiteOrigin();
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const sitemap = await response.text();
    const locations = Array.from(
      sitemap.matchAll(/<loc>(.*?)<\/loc>/g),
      (match) => match[1],
    );
    const expectedLocations = PUBLIC_ROUTES.map((route) =>
      new URL(route, siteOrigin).toString(),
    );

    expect(locations).toEqual(expectedLocations);
    expect(sitemap).not.toContain("localhost");
    expect(sitemap).not.toContain("127.0.0.1");
  });
});
