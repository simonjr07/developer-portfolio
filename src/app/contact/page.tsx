import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
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

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">Helpful details to include</h2>
            <p className="mt-3 text-sm leading-6 text-secondary">Share what you can. We can clarify the rest in an initial conversation.</p>
            <ul className="mt-6 space-y-4">
              {enquiryDetails.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm leading-6 text-secondary">
                  <span aria-hidden="true" className="mt-0.5 text-accent">—</span><span>{detail}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="flex flex-col items-start justify-center p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Start a conversation</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary">A clear first note is enough.</h2>
            {contact ? (
              <>
                <p className="mt-4 text-sm leading-7 text-secondary">For a project enquiry, email is the best place to start. For professional details, visit LinkedIn or GitHub. This website does not send or store messages.</p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors hover:bg-[#9bc5ff]"
                    href={`mailto:${encodeURIComponent(contact.localPart)}@${contact.domain}?subject=${encodeURIComponent("Web project enquiry")}`}
                    aria-label={`Email Simon Chikaobi at ${contact.address}`}
                  >
                    Email {contact.address}
                  </a>
                  <a className="inline-flex min-h-11 items-center text-sm text-accent underline-offset-4 hover:text-primary hover:underline" href="https://www.linkedin.com/in/simon-chikaobi-286166373/" rel="me" aria-label="LinkedIn profile for Simon Chikaobi">
                    LinkedIn profile
                  </a>
                  <a className="inline-flex min-h-11 items-center text-sm text-accent underline-offset-4 hover:text-primary hover:underline" href="https://github.com/simonjr07" rel="me" aria-label="GitHub profile for Simon Chikaobi">
                    GitHub profile
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 text-sm leading-7 text-secondary">Email contact is temporarily unavailable. You can still connect through LinkedIn or GitHub. This website does not send or store messages.</p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <a className="inline-flex min-h-11 items-center text-sm text-accent underline-offset-4 hover:text-primary hover:underline" href="https://www.linkedin.com/in/simon-chikaobi-286166373/" rel="me" aria-label="LinkedIn profile for Simon Chikaobi">LinkedIn profile</a>
                  <a className="inline-flex min-h-11 items-center text-sm text-accent underline-offset-4 hover:text-primary hover:underline" href="https://github.com/simonjr07" rel="me" aria-label="GitHub profile for Simon Chikaobi">GitHub profile</a>
                </div>
              </>
            )}
          </Card>
        </div>
      </Container>
    </SiteShell>
  );
}
