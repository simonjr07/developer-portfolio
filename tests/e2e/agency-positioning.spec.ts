import { expect, test } from "@playwright/test";
import { projects } from "../../src/data/projects";

test.describe("agency collaboration positioning", () => {
  test("the homepage explains agency support without implying existing partnerships", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "I build business websites and the tools behind them.",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Development support for agency teams",
      }),
    ).toBeVisible();

    const agencySection = page.getByRole("region", {
      name: "Development support for agency teams",
    });

    await expect(agencySection).toContainText(
      /software, web development, and design agencies/i,
    );
    await expect(agencySection).toContainText(
      /additional development capacity/i,
    );
    await expect(agencySection).toContainText(
      /Every arrangement is agreed individually/i,
    );

    for (const arrangement of [
      "Additional development capacity",
      "Project-based development support",
      "Subcontracted implementation",
      "Behind your client relationship",
    ]) {
      await expect(
        agencySection.getByRole("heading", {
          level: 3,
          name: arrangement,
        }),
      ).toBeVisible();
    }
  });

  test("the homepage features all four portfolio projects", async ({ page }) => {
    await page.goto("/");

    const selectedWork = page.locator("#selected-work");

    for (const project of projects) {
      const projectLink = selectedWork.getByRole("link", {
        name: project.name,
        exact: true,
      });

      await expect(projectLink).toHaveCount(1);
      await expect(projectLink).toBeVisible();
      await expect(projectLink).toHaveAttribute(
        "href",
        `/projects/${project.slug}`,
      );
    }
  });

  test("the services page explains the supported full-stack capabilities", async ({
    page,
  }) => {
    await page.goto("/services");

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "What I can contribute to a project.",
      }),
    ).toBeVisible();

    for (const capability of [
      "Frontend development",
      "Backend application functionality",
      "Database integration and application data",
      "Authentication and authorization",
      "Booking, ordering, and business workflows",
      "API integrations",
      "Testing, maintenance, and practical handover",
    ]) {
      await expect(
        page.getByRole("heading", { level: 3, name: capability }),
      ).toBeVisible();
    }
  });

  test("the about page explains how collaboration with a team is handled", async ({
    page,
  }) => {
    await page.goto("/about");

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Working alongside your team.",
      }),
    ).toBeVisible();

    for (const expectation of [
      "Clear communication",
      "Defined responsibilities and scope",
      "Maintainable implementation",
      "Practical documentation and handover",
    ]) {
      await expect(
        page.getByRole("heading", { level: 3, name: expectation }),
      ).toBeVisible();
    }
  });

  test("the contact page welcomes direct projects and agency collaboration", async ({
    page,
  }) => {
    await page.goto("/contact");

    await expect(
      page.getByText(
        /This is a place for direct client projects, agency collaboration, and subcontracted development\./,
      ),
    ).toBeVisible();
    await expect(
      page.getByText("Agency collaboration and subcontracted implementation", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Additional development capacity for an existing team", {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("the site copy stays platform-neutral and does not limit agency fit by size", async ({
    page,
  }) => {
    for (const route of ["/", "/services", "/about", "/contact", "/projects"]) {
      await page.goto(route);
      const body = page.locator("body");

      await expect(body).not.toContainText(/upwork/i);
      await expect(body).not.toContainText(/fiverr|freelancer\.com/i);
      await expect(body).not.toContainText(
        /(small|medium)(-sized)?\s+agenc|small\s+(and|or|to)\s+medium(-sized)?\s+agenc/i,
      );
    }
  });
});
