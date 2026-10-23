import { expect, test, type Page } from "@playwright/test";

const EMAIL = "simonchikaobi.work@gmail.com";

async function stubClipboard(page: Page, outcome: "success" | "failure") {
  await page.addInitScript(
    ({ shouldReject }) => {
      const clipboard = {
        writeText: async () => {
          if (shouldReject) {
            throw new DOMException("Clipboard access denied", "NotAllowedError");
          }
        },
      };

      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: clipboard,
      });
    },
    { shouldReject: outcome === "failure" },
  );
}

test.describe("copy email address", () => {
  test("shows success feedback when the clipboard write resolves", async ({ page }) => {
    await stubClipboard(page, "success");
    await page.goto("/contact");

    const copyButton = page.getByRole("button", { name: "Copy email address" });
    await expect(copyButton).toBeVisible();
    await copyButton.click();

    await expect(
      page.getByRole("button", { name: "Email address copied" }),
    ).toBeVisible();
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "The email address is on your clipboard.",
    );
  });

  test("can be operated with the keyboard and announces success", async ({
    page,
  }) => {
    await stubClipboard(page, "success");
    await page.goto("/contact");

    const copyButton = page.getByRole("button", { name: "Copy email address" });
    await expect(copyButton).toHaveAttribute("type", "button");
    await copyButton.focus();
    await expect(copyButton).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("button", { name: "Email address copied" }),
    ).toBeFocused();
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "The email address is on your clipboard.",
    );
  });

  test("shows manual-copy fallback when the clipboard write rejects", async ({ page }) => {
    await stubClipboard(page, "failure");
    await page.goto("/contact");

    const copyButton = page.getByRole("button", { name: "Copy email address" });
    await expect(copyButton).toBeVisible();
    const copyControl = copyButton.locator("xpath=..");

    await copyButton.click();

    await expect(
      page.getByText(
        "Clipboard access was blocked. Select the address below to copy it manually.",
      ),
    ).toBeVisible();
    await expect(copyButton).toBeVisible();
    await expect(copyControl.getByText(EMAIL, { exact: true })).toBeVisible();
  });
});
