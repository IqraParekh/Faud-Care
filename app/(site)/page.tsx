import type { Metadata } from 'next'
import { getPublishedCounsellors } from '@/lib/content/counsellors'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CounsellorCard } from '@/components/counsellor-card'
import { EmptyState } from '@/components/empty-state'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export const metadata: Metadata = {
  title: 'Counsellors',
  description:
    'Meet the FUAD counselling team. Get to know each counsellor before you reach out.',
  alternates: { canonical: '/counsellors' },
}

export default async function CounsellorsPage() {
  const counsellors = await getPublishedCounsellors()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Counsellors', url: '/counsellors' },
        ]}
      />
      <PageHero
        eyebrow="Counsellors"
        title="The people you'll be speaking with"
        description="A small, considered team offering a warm and non-judgmental space. Take your time getting to know each of them."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Counsellors' }]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          {counsellors.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {counsellors.map((counsellor, i) => (
                <Reveal key={counsellor.slug} delay={(i % 3) * 60}>
                  <CounsellorCard counsellor={counsellor} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState message="Our counsellor profiles are being updated. Please contact FUAD to learn more." />
          )}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
