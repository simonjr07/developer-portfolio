import { expect, test } from "@playwright/test";
import { projects } from "../../src/data/projects";
import {
  expectHorizontallyWithinViewport,
  expectInteractiveElementsWithinViewport,
  expectNoHorizontalOverflow,
  gotoAndExpectHeading,
} from "./helpers";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("case-study evidence metadata is complete and repository-scoped", () => {
  expect(projects).toHaveLength(4);

  for (const project of projects) {
    expect(project.screenshot.src).toMatch(/^\/projects\/.+\.png$/);
    expect(project.operationsScreenshot?.src).toMatch(/^\/projects\/.+\.png$/);

    const operations = project.operationsScreenshot;
    if (operations) {
      expect(operations.alt.length).toBeGreaterThan(20);
      expect(operations.caption.length).toBeGreaterThan(20);
      expect(operations.width).toBeGreaterThan(0);
      expect(operations.height).toBeGreaterThan(0);
    }

    const documentation = project.documentation ?? [];
    expect(documentation.length).toBeGreaterThanOrEqual(3);

    const urls = documentation.map((doc) => doc.url);
    expect(new Set(urls).size).toBe(urls.length);

    for (const doc of documentation) {
      expect(doc.title).not.toBe("");
      expect(doc.description.length).toBeGreaterThan(20);
      expect(doc.url).toMatch(
        new RegExp(
          `^${escapeRegExp(project.repository)}/blob/main/docs/[A-Z]+\\.md$`,
        ),
      );
    }
  }
});

for (const project of projects) {
  test(`${project.name} presents verified operational and documentation evidence`, async ({
    page,
  }) => {
    await gotoAndExpectHeading(
      page,
      `/projects/${project.slug}`,
      new RegExp(`^${escapeRegExp(project.name)}$`),
    );

    const engineering = page.locator(
      'section[aria-labelledby="engineering-heading"]',
    );
    const operations = project.operationsScreenshot;

    expect(operations).toBeDefined();
    if (!operations) return;

    await expect(
      engineering.getByRole("heading", {
        level: 3,
        name: "Operational interface",
        exact: true,
      }),
    ).toBeVisible();

    const image = engineering.getByRole("img", { name: operations.alt });
    await expect(image).toHaveCount(1);
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("width", String(operations.width));
    await expect(image).toHaveAttribute("height", String(operations.height));

    const sourceFile = operations.src.split("/").at(-1);
    expect(sourceFile).toBeTruthy();
    await expect(image).toHaveAttribute(
      "src",
      new RegExp(escapeRegExp(sourceFile ?? "")),
    );

    await expect
      .poll(() =>
        image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);

    await image.scrollIntoViewIfNeeded();
    const imageBox = await image.boundingBox();
    expect(imageBox).not.toBeNull();
    if (imageBox) {
      expect(imageBox.width).toBeGreaterThan(0);
      expect(imageBox.height).toBeGreaterThan(0);
      expect(imageBox.width / imageBox.height).toBeCloseTo(
        operations.width / operations.height,
        2,
      );
    }

    await expect(
      engineering.getByText(operations.caption, { exact: true }),
    ).toBeVisible();

    await expect(
      engineering.getByRole("heading", {
        level: 3,
        name: "Repository documentation",
        exact: true,
      }),
    ).toBeVisible();

    const documentation = project.documentation ?? [];
    const documentationLinks = engineering.locator('a[target="_blank"]');
    await expect(documentationLinks).toHaveCount(documentation.length);

    for (const doc of documentation) {
      const link = engineering.getByRole("link", {
        name: new RegExp(`^${escapeRegExp(doc.title)}\\.md`),
      });
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute("href", doc.url);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noreferrer");
      await expect(link).toContainText(doc.description);
      await expect(link).toContainText("View source file");
    }
  });

  test(`${project.name} evidence remains usable at mobile and desktop widths`, async ({
    page,
  }) => {
    for (const width of [320, 1440] as const) {
      await page.setViewportSize({ width, height: 900 });
      await gotoAndExpectHeading(
        page,
        `/projects/${project.slug}`,
        new RegExp(`^${escapeRegExp(project.name)}$`),
      );

      const engineering = page.locator(
        'section[aria-labelledby="engineering-heading"]',
      );
      const operations = project.operationsScreenshot;

      await engineering
        .getByRole("heading", { level: 3, name: "Operational interface" })
        .scrollIntoViewIfNeeded();

      await expectNoHorizontalOverflow(page);
      await expectInteractiveElementsWithinViewport(page, width);

      if (operations) {
        const image = engineering.getByRole("img", { name: operations.alt });
        await expect(image).toBeVisible();
        await expectHorizontallyWithinViewport(image, width);
      }

      for (const doc of project.documentation ?? []) {
        const link = engineering.getByRole("link", {
          name: new RegExp(`^${escapeRegExp(doc.title)}\\.md`),
        });
        await expect(link).toBeVisible();
        await expectHorizontallyWithinViewport(link, width);
      }
    }
  });
}
