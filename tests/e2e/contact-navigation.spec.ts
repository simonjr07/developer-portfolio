import { expect, test, type Locator } from "@playwright/test";

const LINKEDIN_URL = "https://www.linkedin.com/in/simon-chikaobi-286166373/";
const GITHUB_URL = "https://github.com/simonjr07";
const EMAIL = "simonchikaobi.work@gmail.com";
const EMAIL_SUBJECT = "Web project enquiry";

const navigation = [
  {
    label: "Projects",
    path: "/projects",
    heading: /^Projects built to explore real business workflows\.$/,
  },
  {
    label: "Services",
    path: "/services",
    heading: /^Practical web work, shaped around how your business operates\.$/,
  },
  {
    label: "About",
    path: "/about",
    heading: /^I build modern web applications around useful business workflows\.$/,
  },
  {
    label: "Contact",
    path: "/contact",
    heading: /^Tell me what you.re looking to make work better\.$/i,
  },
] as const;

const projects = [
  { name: "NexaService", slug: "nexaservice" },
  { name: "Copper Spoon", slug: "copper-spoon" },
  { name: "Aurelia Studio", slug: "aurelia-studio" },
  { name: "Maison Vale", slug: "maison-vale" },
] as const;

test.describe("contact and navigation", () => {
  test("contact actions use the approved destinations", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const emailAction = page.getByRole("link", {
      name: `Email Simon Chikaobi at ${EMAIL}`,
    });
    await expect(emailAction).toBeVisible();
    await expect(page.getByText(EMAIL, { exact: true })).toBeVisible();
    const emailHref = await emailAction.getAttribute("href");
    expect(emailHref).toBeTruthy();
    if (!emailHref) return;

    expect(emailHref.startsWith(`mailto:${EMAIL}?`)).toBe(true);
    const mailto = new URL(emailHref);
    expect(mailto.searchParams.get("subject")).toBe(EMAIL_SUBJECT);
    const emailBody = mailto.searchParams.get("body");
    expect(emailBody).toContain("potential web development project");
    for (const prompt of [
      "Project or business:",
      "What I need help with:",
      "Main goal or problem to solve:",
      "Existing website or system, if applicable:",
      "Preferred timeline:",
      "Budget or other constraints, if known:",
    ]) {
      expect(emailBody).toContain(prompt);
    }

    const gmailAction = page.getByRole("link", {
      name: "Open pre-filled enquiry in Gmail (new window)",
    });
    await expect(gmailAction).toBeVisible();
    await expect(gmailAction).toHaveAttribute("target", "_blank");
    await expect(gmailAction).toHaveAttribute("rel", "noreferrer");
    const gmailHref = await gmailAction.getAttribute("href");
    expect(gmailHref).toBeTruthy();
    if (!gmailHref) return;

    const gmail = new URL(gmailHref);
    expect(gmail.origin).toBe("https://mail.google.com");
    expect(gmail.searchParams.get("view")).toBe("cm");
    expect(gmail.searchParams.get("fs")).toBe("1");
    expect(gmail.searchParams.get("to")).toBe(EMAIL);
    expect(gmail.searchParams.get("su")).toBe(EMAIL_SUBJECT);
    expect(gmail.searchParams.get("body")).toContain(
      "Main goal or problem to solve:",
    );

    await expect(
      page.getByText(
        /Both email options open a prefilled message with prompts for your project, goals, timeline, and constraints\./,
      ),
    ).toBeVisible();

    await expect(
      page
        .getByRole("link", { name: "LinkedIn profile for Simon Chikaobi" })
        .first(),
    ).toHaveAttribute("href", LINKEDIN_URL);
    await expect(
      page
        .getByRole("link", { name: "GitHub profile for Simon Chikaobi" })
        .first(),
    ).toHaveAttribute("href", GITHUB_URL);
  });

  test("remote working context is clear on the primary introduction pages", async ({
    page,
  }) => {
    for (const path of ["/", "/about", "/contact"]) {
      await page.goto(path);
      await expect(
        page
          .getByText(/Lagos, Nigeria \(WAT, UTC\+1\)/)
          .first(),
      ).toBeVisible();
      await expect(
        page.getByText(/international remote collaboration|remote collaboration with businesses internationally/i).first(),
      ).toBeVisible();
    }
  });

  test("primary navigation resolves to each page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const primaryNavigation = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    await expect(primaryNavigation).toBeVisible();

    for (const item of navigation) {
      await primaryNavigation
        .getByRole("link", { name: item.label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${item.path}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        item.heading,
      );
    }
  });

  test("project cards open their case studies", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects");

    for (const project of projects) {
      await page
        .getByRole("link", { name: project.name, exact: true })
        .click();
      await expect(page).toHaveURL(
        new RegExp(`/projects/${project.slug}$`),
      );
      await expect(
        page.getByRole("heading", { level: 1, name: project.name }),
      ).toBeVisible();
      await page.goto("/projects");
    }
  });
});

test.describe("keyboard focus", () => {
  test("mobile skip link, brand, and menu button show visible focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await expectVisibleOutline(skipLink);

    await page.keyboard.press("Tab");
    const brand = page.getByRole("link", {
      name: "Simon Chikaobi",
      exact: true,
    });
    await expect(brand).toBeFocused();
    await expectVisibleOutline(brand);

    await page.keyboard.press("Tab");
    const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
    await expect(menuButton).toBeFocused();
    await expectVisibleOutline(menuButton);
  });

  test("desktop navigation shows visible keyboard focus", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const brand = page.getByRole("link", {
      name: "Simon Chikaobi",
      exact: true,
    });
    await expect(brand).toBeFocused();

    await page.keyboard.press("Tab");
    const projectsLink = page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Projects", exact: true });
    await expect(projectsLink).toBeFocused();
    await expectVisibleOutline(projectsLink);
  });
});

async function expectVisibleOutline(locator: Locator) {
  const outline = await locator.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return { width: style.outlineWidth, style: style.outlineStyle };
  });

  expect(parseFloat(outline.width)).toBeGreaterThan(0);
  expect(outline.style).not.toBe("none");
}
