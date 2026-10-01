import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { BookingButton } from '@/components/booking-button'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { BreadcrumbSchema } from '@/components/seo-schema'
import { getSiteSettings } from '@/lib/site-settings.server'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with FUAD to book a counselling session or ask a question. Message us on WhatsApp or email and we will get back to you.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="We're here when you're ready."
        description="Book a session or send us a message. There's no pressure — ask anything you'd like to know first."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Contact' }]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <div className="flex flex-wrap items-start gap-4">
            <BookingButton />
            <WhatsAppButton />
          </div>

          <dl className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card px-6">
            {settings.contact.email && (
              <div className="flex flex-col gap-1 py-4">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="text-navy hover:underline"
                  >
                    {settings.contact.email}
                  </a>
                </dd>
              </div>
            )}
            {settings.whatsapp.displayNumber && (
              <div className="flex flex-col gap-1 py-4">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
                  WhatsApp
                </dt>
                <dd className="text-navy">{settings.whatsapp.displayNumber}</dd>
              </div>
            )}
            {settings.contact.location && (
              <div className="flex flex-col gap-1 py-4">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
                  Location
                </dt>
                <dd className="text-navy">{settings.contact.location}</dd>
              </div>
            )}
            {settings.contact.hours && (
              <div className="flex flex-col gap-1 py-4">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
                  Hours
                </dt>
                <dd className="text-navy">{settings.contact.hours}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </>
  )
}
