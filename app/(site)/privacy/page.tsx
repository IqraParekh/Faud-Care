import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { BreadcrumbSchema } from '@/components/seo-schema'
import { getSiteSettings } from '@/lib/site-settings.server'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How FUAD handles your information: what we collect, how we use it, and how we keep it private.',
  alternates: { canonical: '/privacy' },
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Privacy', url: '/privacy' },
        ]}
      />
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        description="Your privacy matters to us. This page explains, in plain language, how we handle your information."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Privacy' }]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 leading-relaxed text-muted-foreground">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl text-navy">What we collect</h2>
            <p>
              This website does not ask you to create an account. If you contact
              us through WhatsApp, email, or the booking calendar, we receive
              the details you choose to share (such as your name and message).
              Basic technical data, like your browser type, may be processed by
              our hosting provider to keep the site running securely.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl text-navy">How we use it</h2>
            <p>
              We use the information you share only to respond to your
              enquiry, arrange sessions, and provide support. We do not sell
              your personal information.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl text-navy">Third-party services</h2>
            <p>
              Messaging and booking happen through third-party tools (WhatsApp
              and Google Calendar), which have their own privacy policies.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl text-navy">Contact</h2>
            <p>
              Questions about privacy? Email us at{' '}
              <a
                href={`mailto:${settings.contact.email}`}
                className="text-navy underline-offset-4 hover:underline"
              >
                {settings.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
