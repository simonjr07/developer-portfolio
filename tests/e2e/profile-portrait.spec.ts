import { expect, test } from "@playwright/test";

const PORTRAIT_ALT =
  "Portrait of Simon Chikaobi, full-stack web developer, in a workspace with a code editor in the background.";
const SOURCE_ASPECT_RATIO = 1086 / 1448;

const pages = [
  { path: "/", name: "homepage" },
  { path: "/about", name: "About page" },
] as const;

const viewports = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;

for (const viewport of viewports) {
  test.describe(`profile portrait at ${viewport.width}px`, () => {
    test.use({ viewport });

    for (const pageInfo of pages) {
      test(`${pageInfo.name} uses the owner-supplied portrait without distortion`, async ({
        page,
      }) => {
        await page.goto(pageInfo.path);

        const portrait = page.getByRole("img", { name: PORTRAIT_ALT });
        await expect(portrait).toHaveCount(1);
        await expect(portrait).toBeVisible();
        await expect(portrait).toHaveAttribute("src", /profile-portrait\.webp/);

        await expect
          .poll(() =>
            portrait.evaluate((image) => (image as HTMLImageElement).naturalWidth),
          )
          .toBeGreaterThan(0);

        const box = await portrait.boundingBox();
        expect(box, "Expected the portrait to have a bounding box").not.toBeNull();
        if (!box) return;

        expect(box.width).toBeGreaterThan(180);
        expect(box.height).toBeGreaterThan(0);
        expect(box.width / box.height).toBeCloseTo(SOURCE_ASPECT_RATIO, 2);
        expect(box.x).toBeGreaterThanOrEqual(-1);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
      });
    }
  });
}
