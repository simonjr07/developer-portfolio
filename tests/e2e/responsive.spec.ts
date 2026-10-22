import { expect, test } from "@playwright/test";
import {
  expectHorizontallyWithinViewport,
  expectInteractiveElementsWithinViewport,
  expectNoHorizontalOverflow,
  gotoAndExpectHeading,
} from "./helpers";

const viewports = [
  { width: 320, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
] as const;

const responsiveRoutes = [
  {
    path: "/",
    heading: /^I build business websites and the tools behind them\.$/,
    primaryAction: "Start a project",
  },
  {
    path: "/projects",
    heading: /^Projects built to explore real business workflows\.$/,
    primaryAction: "Get in touch",
  },
  {
    path: "/services",
    heading: /^Practical web work, shaped around how your business operates\.$/,
    primaryAction: "Share a project brief",
  },
  {
    path: "/about",
    heading: /^I build modern web applications around useful business workflows\.$/,
    primaryAction: "View my work",
  },
  {
    path: "/contact",
    heading: /^Tell me what you.re looking to make work better\.$/i,
    primaryAction: "Email Simon Chikaobi at simonchikaobi.work@gmail.com",
  },
  {
    path: "/projects/nexaservice",
    heading: /^NexaService$/,
    primaryAction: "Discuss a project",
  },
] as const;

for (const viewport of viewports) {
  test.describe(`${viewport.width}px viewport`, () => {
    test.use({ viewport });

    test("pages render without horizontal overflow and remain usable", async ({ page }) => {
      for (const route of responsiveRoutes) {
        await gotoAndExpectHeading(page, route.path, route.heading);

        await expectNoHorizontalOverflow(page);
        await expectHorizontallyWithinViewport(
          page.getByRole("heading", { level: 1 }),
          viewport.width,
        );

        const primaryAction = page
          .getByRole("link", { name: route.primaryAction, exact: true })
          .first();
        await expect(primaryAction).toBeVisible();
        await expectHorizontallyWithinViewport(primaryAction, viewport.width);

        await expectInteractiveElementsWithinViewport(page, viewport.width);
        await expect(page.getByRole("main")).toBeVisible();

        if (viewport.width < 1024) {
          await expect(
            page.getByRole("button", { name: "Open navigation menu" }),
          ).toBeVisible();
          await expect(
            page.getByRole("navigation", { name: "Primary navigation" }),
          ).toBeHidden();
        } else {
          await expect(
            page.getByRole("navigation", { name: "Primary navigation" }),
          ).toBeVisible();
          await expect(
            page.getByRole("button", { name: "Open navigation menu" }),
          ).toBeHidden();
        }
      }
    });
  });
}

for (const width of [320, 390, 768] as const) {
  test.describe(`${width}px mobile navigation`, () => {
    test.use({ viewport: { width, height: 844 } });

    test("opens, exposes usable links, and closes correctly", async ({ page }) => {
      await page.goto("/");

      const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAccessibleName("Open navigation menu");

      await menuButton.click();
      const mobileNavigation = page.getByRole("navigation", {
        name: "Mobile navigation",
      });
      await expect(mobileNavigation).toBeVisible();
      await expect(menuButton).toHaveAccessibleName("Close navigation menu");

      for (const label of ["Projects", "Services", "About", "Contact"]) {
        await expect(
          mobileNavigation.getByRole("link", { name: label, exact: true }),
        ).toBeVisible();
      }

      await page.keyboard.press("Escape");
      await expect(mobileNavigation).toBeHidden();
      await expect(menuButton).toBeFocused();
      await expect(menuButton).toHaveAccessibleName("Open navigation menu");

      await menuButton.click();
      await mobileNavigation
        .getByRole("link", { name: "Projects", exact: true })
        .click();
      await expect(page).toHaveURL(/\/projects$/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      ).toBeHidden();
    });
  });
}
