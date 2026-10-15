import type { Metadata } from "next";
import { buttonLinkClassName } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Share the business context, problem, and goals for a website or web application project.",
};

const enquiryDetails = [
  "A little about the business or project context.",
  "The problem you want to solve and who the work is for.",
  "The functionality or outcome you have in mind.",
  "An existing website or application, if there is one.",
  "Your target timeline, constraints, and any important dependencies.",
];

function getPublicContactEmail() {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "simonchikaobi.work@gmail.com";
  if (!value || value.length > 254) return null;

  const match = /^([a-z0-9.!#$%&'*+\-/=_`{|}~]+)@([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)$/i.exec(value);
  if (!match) return null;

  return { address: value, localPart: match[1], domain: match[2] };
}

/** Bordered profile row used for the LinkedIn/GitHub destinations. */
function ProfileRow({ href, label, ariaLabel }: { href: string; label: string; ariaLabel: string }) {
  return (
    <a
      href={href}
      rel="me"
      aria-label={ariaLabel}
      className="flex min-h-11 items-center justify-between gap-4 rounded-xl border border-border bg-surface/60 px-4 py-3 transition-colors hover:border-accent"
    >
      <span className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">{label}</span>
      <span aria-hidden="true" className="text-sm font-medium text-accent">
        View profile →
      </span>
    </a>
  );
}

const LINKEDIN_URL = "https://www.linkedin.com/in/simon-chikaobi-286166373/";
const GITHUB_URL = "https://github.com/simonjr07";

export default function ContactPage() {
  const contact = getPublicContactEmail();

  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <section aria-label="Contact invitation">
          <SectionHeading
            level="h1"
            eyebrow="Contact"
            title="Tell me what you’re looking to make work better."
            description="If you’re considering a business website or web application, a little context is a useful place to begin. You don’t need a finished specification—just the problem you’re trying to solve."
          />
        </section>

        <div className="mt-12 grid gap-5 sm:gap-6 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Card className="p-6 sm:p-8">
            <Eyebrow>What to share</Eyebrow>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-primary">A few details help me reply well.</h2>
            <p className="mt-3 text-sm leading-6 text-secondary">Share what you can. We can clarify the rest together in an initial conversation.</p>
            <ul className="mt-6 space-y-4">
              {enquiryDetails.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm leading-6 text-secondary">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-accent">—</span><span>{detail}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="flex flex-col p-6 sm:p-8">
            <Eyebrow>Start a conversation</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary">A clear first note is enough.</h2>
            {contact ? (
              <>
                <p className="mt-4 text-sm leading-7 text-secondary">For a project enquiry, email is the best place to start. For professional context, LinkedIn and GitHub are open too. This website does not send or store messages.</p>
                <div className="mt-6">
                  <a
                    className={buttonLinkClassName("primary", "w-full")}
                    href={`mailto:${encodeURIComponent(contact.localPart)}@${contact.domain}?subject=${encodeURIComponent("Web project enquiry")}`}
                    aria-label={`Email Simon Chikaobi at ${contact.address}`}
                  >
                    Email {contact.address}
                  </a>
                </div>
                <div className="mt-4 space-y-3">
                  <ProfileRow href={LINKEDIN_URL} label="LinkedIn" ariaLabel="LinkedIn profile for Simon Chikaobi" />
                  <ProfileRow href={GITHUB_URL} label="GitHub" ariaLabel="GitHub profile for Simon Chikaobi" />
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 text-sm leading-7 text-secondary">Email contact is temporarily unavailable. You can still connect through LinkedIn or GitHub. This website does not send or store messages.</p>
                <div className="mt-6 space-y-3">
                  <ProfileRow href={LINKEDIN_URL} label="LinkedIn" ariaLabel="LinkedIn profile for Simon Chikaobi" />
                  <ProfileRow href={GITHUB_URL} label="GitHub" ariaLabel="GitHub profile for Simon Chikaobi" />
                </div>
              </>
            )}
          </Card>
        </div>
      </Container>
    </SiteShell>
  );
}
