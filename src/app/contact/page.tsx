import { createPageMetadata } from "@/lib/page-metadata";
import { buttonLinkClassName } from "@/components/button-link";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Share the context for a direct client website or web application project, agency collaboration, subcontracted development, or additional development capacity.",
  path: "/contact",
});

const projectAreas = [
  "Websites and web applications",
  "Dashboards and internal tools",
  "APIs, integrations, and backend functionality",
  "Improvements to existing websites or software",
  "Agency collaboration and subcontracted implementation",
  "Additional development capacity for an existing team",
];

const enquiryDetails = [
  "A little about your context or the project.",
  "The problem you want to solve and who the work is for.",
  "The functionality or outcome you have in mind.",
  "An existing website, codebase, or application, if there is one.",
  "Your target timeline, constraints, and any important dependencies.",
];

const nextSteps = [
  {
    step: "01",
    title: "Initial note",
    detail: "Share the business, project, or team context using the template or a freeform note.",
  },
  {
    step: "02",
    title: "Clarifying conversation",
    detail: "We explore the technical approach, constraints, and scope to confirm if we are a good fit.",
  },
  {
    step: "03",
    title: "Clear proposal",
    detail: "You receive an agreed scope, realistic timeline, and structured milestones before work begins.",
  },
];

const EMAIL_SUBJECT = "Web project enquiry";

const EMAIL_BODY_TEMPLATE = `Hello,

I'd like to discuss a potential web development project.

Project or business:
What I need help with:
Main goal or problem to solve:
Existing website or system, if applicable:
Preferred timeline:
Budget or other constraints, if known:

Thank you.`;

function getPublicContactEmail() {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "simonchikaobi.work@gmail.com";
  if (!value || value.length > 254) return null;

  const match = /^([a-z0-9.!#$%&'*+\-/=_`{|}~]+)@([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)$/i.exec(value);
  if (!match) return null;

  return { address: value, localPart: match[1], domain: match[2] };
}

function buildMailtoHref(contact: { localPart: string; domain: string }) {
  const recipient = `${encodeURIComponent(contact.localPart)}@${contact.domain}`;
  const subject = encodeURIComponent(EMAIL_SUBJECT);
  const normalizedBody = EMAIL_BODY_TEMPLATE.replace(/\r?\n/g, "\r\n");
  const body = encodeURIComponent(normalizedBody).replace(/'/g, "%27");
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

function buildGmailHref(address: string) {
  const to = encodeURIComponent(address);
  const subject = encodeURIComponent(EMAIL_SUBJECT);
  const body = encodeURIComponent(EMAIL_BODY_TEMPLATE);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
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
            title="Tell me about the project or collaboration you have in mind."
            description="If you are considering a website, web application, internal tool, or improvements to existing software, or you need additional development capacity for a project, a little context is a useful place to begin. This is a place for direct client projects, agency collaboration, and subcontracted development. You don't need a finished specification, just the problem you're trying to solve or the part of the work you need help with."
          />
        </section>

        <div className="mt-12 grid gap-5 sm:gap-6 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Card className="p-6 sm:p-8">
            <Eyebrow>What we can explore</Eyebrow>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-primary">Work I can help with.</h2>
            <p className="mt-3 text-sm leading-6 text-secondary">
              Whether you are planning a new build, updating an existing system, or bringing in extra development capacity, I can help with:
            </p>
            <ul className="mt-4 space-y-3">
              {projectAreas.map((area) => (
                <li key={area} className="flex gap-3 text-sm leading-6 text-secondary">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-accent">—</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-base font-semibold text-primary">Helpful details to share</h3>
              <p className="mt-2 text-sm leading-6 text-secondary">
                Share what you have readily available. We can clarify the rest together in an initial conversation:
              </p>
              <ul className="mt-4 space-y-3">
                {enquiryDetails.map((detail) => (
                  <li key={detail} className="flex gap-3 text-sm leading-6 text-secondary">
                    <span aria-hidden="true" className="mt-0.5 font-mono text-accent">—</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="flex flex-col p-6 sm:p-8">
            <div className="flex flex-col items-start gap-2.5">
              <Eyebrow>Start a conversation</Eyebrow>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                <span className="size-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Available for projects &amp; collaboration
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary">A clear first note is enough.</h2>
            {contact ? (
              <>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  Direct email goes straight to my inbox. Both email options open a prefilled message with prompts for your project, goals, timeline, and constraints. For professional context, LinkedIn and GitHub are open too.
                </p>
                <p className="mt-3 text-sm leading-6 text-secondary">
                  Based in <span className="font-medium text-primary">Lagos, Nigeria (WAT, UTC+1)</span> · Available for international remote collaboration.
                </p>

                <div className="mt-6 rounded-xl border border-border bg-surface/60 p-4">
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">
                    Direct email address
                  </span>
                  <p className="mt-1.5 select-all break-all font-mono text-xs font-medium text-primary sm:text-sm">
                    {contact.address}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    className={buttonLinkClassName("primary", "w-full")}
                    href={buildMailtoHref(contact)}
                    aria-label={`Email Simon Chikaobi at ${contact.address}`}
                  >
                    Email me
                  </a>
                  <a
                    className={buttonLinkClassName("secondary", "w-full")}
                    href={buildGmailHref(contact.address)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open pre-filled enquiry in Gmail (new window)"
                  >
                    Open in Gmail
                  </a>
                </div>

                <div className="mt-3">
                  <CopyEmailButton email={contact.address} />
                </div>

                <div className="mt-4 space-y-3">
                  <ProfileRow href={LINKEDIN_URL} label="LinkedIn" ariaLabel="LinkedIn profile for Simon Chikaobi" />
                  <ProfileRow href={GITHUB_URL} label="GitHub" ariaLabel="GitHub profile for Simon Chikaobi" />
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 text-sm leading-7 text-secondary">Email contact is temporarily unavailable. You can still connect through LinkedIn or GitHub.</p>
                <div className="mt-6 space-y-3">
                  <ProfileRow href={LINKEDIN_URL} label="LinkedIn" ariaLabel="LinkedIn profile for Simon Chikaobi" />
                  <ProfileRow href={GITHUB_URL} label="GitHub" ariaLabel="GitHub profile for Simon Chikaobi" />
                </div>
              </>
            )}
          </Card>
        </div>

        <section aria-label="What to expect next" className="mt-16 border-t border-border pt-12 sm:mt-20 sm:pt-16">
          <SectionHeading
            level="h2"
            eyebrow="Collaboration process"
            title="What to expect after reaching out."
            description="A straightforward, low-friction path from your first message to a structured project start."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {nextSteps.map((step) => (
              <Card key={step.step} className="p-6">
                <span className="font-mono text-xs font-semibold text-accent">{step.step}</span>
                <h3 className="mt-3 text-base font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary">{step.detail}</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </SiteShell>
  );
}
