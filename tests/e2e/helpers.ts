import { expect, type Locator, type Page } from "@playwright/test";

export async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}

export async function expectHorizontallyWithinViewport(
  locator: Locator,
  viewportWidth: number,
) {
  const box = await locator.boundingBox();
  expect(box, "Expected the element to have a bounding box").not.toBeNull();
  if (!box) return;

  expect(box.width).toBeGreaterThan(0);
  expect(box.height).toBeGreaterThan(0);
  expect(box.x).toBeGreaterThanOrEqual(-1);
  expect(box.x + box.width).toBeLessThanOrEqual(viewportWidth + 1);
}

export async function expectInteractiveElementsWithinViewport(
  page: Page,
  viewportWidth: number,
) {
  const clipped = await page.locator("main a, main button").evaluateAll(
    (elements, width) =>
      elements.flatMap((element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const isHidden =
          style.display === "none" ||
          style.visibility === "hidden" ||
          rect.width === 0 ||
          rect.height === 0;

        if (isHidden) return [];
        if (rect.left >= -1 && rect.right <= width + 1) return [];

        return [
          {
            text: (element.textContent ?? "").trim().slice(0, 80),
            left: rect.left,
            right: rect.right,
          },
        ];
      }),
    viewportWidth,
  );

  expect(clipped).toEqual([]);
}

export async function gotoAndExpectHeading(
  page: Page,
  path: string,
  heading: RegExp,
) {
  const response = await page.goto(path);
  expect(response?.status(), `Expected ${path} to return HTTP 200`).toBe(200);

  const pageHeading = page.getByRole("heading", { level: 1 });
  await expect(pageHeading).toHaveCount(1);
  await expect(pageHeading).toBeVisible();
  await expect(pageHeading).toHaveText(heading);

  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}
