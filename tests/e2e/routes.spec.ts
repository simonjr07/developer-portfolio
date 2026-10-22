import { expect, test } from "@playwright/test";
import { gotoAndExpectHeading } from "./helpers";

const routes = [
  {
    path: "/",
    heading: /^I build business websites and the tools behind them\.$/,
  },
  {
    path: "/services",
    heading: /^Practical web work, shaped around how your business operates\.$/,
  },
  {
    path: "/about",
    heading: /^I build modern web applications around useful business workflows\.$/,
  },
  {
    path: "/contact",
    heading: /^Tell me what you.re looking to make work better\.$/i,
  },
  {
    path: "/projects",
    heading: /^Projects built to explore real business workflows\.$/,
  },
  {
    path: "/projects/nexaservice",
    heading: /^NexaService$/,
  },
  {
    path: "/projects/copper-spoon",
    heading: /^Copper Spoon$/,
  },
  {
    path: "/projects/aurelia-studio",
    heading: /^Aurelia Studio$/,
  },
  {
    path: "/projects/maison-vale",
    heading: /^Maison Vale$/,
  },
] as const;

test.describe("public routes", () => {
  for (const route of routes) {
    test(`${route.path} renders a meaningful page heading`, async ({ page }) => {
      await gotoAndExpectHeading(page, route.path, route.heading);
    });
  }

  test("unknown routes render the custom 404 page with status 404", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);

    const pageHeading = page.getByRole("heading", { level: 1 });
    await expect(pageHeading).toHaveCount(1);
    await expect(pageHeading).toBeVisible();
    await expect(pageHeading).toHaveText(/That page isn.t here\./i);
    await expect(page.getByRole("link", { name: "Back to homepage" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore projects" })).toBeVisible();
  });
});
