import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact | Developer Portfolio",
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
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
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
                <p className="mt-4 text-sm leading-7 text-secondary">Use the public email address below to share an enquiry. Your email application will open with a subject line; nothing is sent by this website.</p>
                <div className="mt-6">
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors hover:bg-[#9bc5ff]"
                    href={`mailto:${encodeURIComponent(contact.localPart)}@${contact.domain}?subject=${encodeURIComponent("Web project enquiry")}`}
                  >
                    Email {contact.address}
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 text-sm leading-7 text-secondary">Direct contact details are being finalized. No contact address has been published here yet, and this page does not send or store messages.</p>
                <p className="mt-5 rounded-xl border border-border bg-background/60 p-4 text-sm leading-6 text-secondary">Before launch, the owner should intentionally configure the public <code className="font-mono text-primary">NEXT_PUBLIC_CONTACT_EMAIL</code> value. It will be visible to site visitors.</p>
              </>
            )}
          </Card>
        </div>
      </Container>
    </SiteShell>
  );
}
