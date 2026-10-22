import { expect, test } from "@playwright/test";
import { getSiteUrl } from "../../src/lib/site-url";

test.describe.configure({ mode: "serial" });

const initialSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

function setConfiguredSiteUrl(value: string | undefined) {
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = value;
  }
}

function resolveSiteUrl(configured: string | undefined) {
  setConfiguredSiteUrl(configured);
  return getSiteUrl()?.toString();
}

test.afterEach(() => {
  setConfiguredSiteUrl(initialSiteUrl);
});

const cases = [
  {
    name: "fails closed when the origin is missing",
    configured: undefined,
    expected: undefined,
  },
  {
    name: "fails closed when the origin is blank",
    configured: "   ",
    expected: undefined,
  },
  {
    name: "fails closed when the origin is malformed",
    configured: "portfolio.test",
    expected: undefined,
  },
  {
    name: "fails closed for non-HTTP protocols",
    configured: "ftp://portfolio.test",
    expected: undefined,
  },
  {
    name: "rejects plain HTTP for a public origin",
    configured: "http://portfolio.example",
    expected: undefined,
  },
  {
    name: "normalizes an HTTPS origin and strips its path",
    configured: "https://portfolio.test/example/path/",
    expected: "https://portfolio.test/",
  },
  {
    name: "allows HTTP for a localhost development origin",
    configured: "http://localhost:3000/",
    expected: "http://localhost:3000/",
  },
  {
    name: "allows HTTP for an IPv4 loopback development origin",
    configured: "http://127.0.0.1:3000",
    expected: "http://127.0.0.1:3000/",
  },
  {
    name: "allows HTTP for an IPv6 loopback development origin",
    configured: "http://[::1]:3000",
    expected: "http://[::1]:3000/",
  },
] as const;

for (const { name, configured, expected } of cases) {
  test(name, () => {
    expect(resolveSiteUrl(configured)).toBe(expected);
  });
}
