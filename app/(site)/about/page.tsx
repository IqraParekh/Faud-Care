import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export const metadata: Metadata = {
  title: 'About',
  description:
    'FUAD was created around a simple belief: people deserve a space where they can speak honestly, be heard without judgment, and receive thoughtful support.',
  alternates: { canonical: '/about' },
}

const influences = [
  'Relationships',
  'Family',
  'Culture',
  'Responsibilities',
  'Values',
  'Personal experiences',
  'Work',
  'Life transitions',
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />
      <PageHero
        eyebrow="About FUAD"
        title="A space to be heard, without judgment."
        description="FUAD was created around a simple belief: people deserve a space where they can speak honestly, be heard without judgment, and receive thoughtful support."
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'About' },
        ]}
      />

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_70px_-45px_rgba(35,55,79,0.5)]">
              <Image
                src="/about.png"
                alt="Two hands gently holding a warm mug of tea in soft natural light"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="text-balance text-3xl leading-tight text-navy sm:text-4xl">
                Emotional wellbeing is shaped by many things.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                How we feel is rarely about one thing alone. Our sense of
                wellbeing can be influenced by the relationships we hold, the
                cultures we belong to, and the responsibilities we carry.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                FUAD offers a space to slow down and make sense of this — with
                respect for your context, your values, and your pace. You do not
                need to arrive with the right words. You only need to be willing
                to begin.
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-2 flex flex-wrap gap-2.5">
              {influences.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-navy/75"
                >
                  {item}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-balance font-heading text-2xl leading-relaxed text-navy sm:text-3xl">
              &ldquo;You don&apos;t need to have everything figured out before
              reaching out.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Counselling at FUAD is not about being told what to do. It is a
              collaborative space to reflect, understand, and take an active
              role in your own growth.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
