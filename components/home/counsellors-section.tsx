import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedCounsellors } from '@/lib/content/counsellors'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { CounsellorCard } from '@/components/counsellor-card'
import { EmptyState } from '@/components/empty-state'
import { ctaVariants } from '@/components/ui/cta'
import { cn } from '@/lib/utils'

export async function CounsellorsSection() {
  const counsellors = (await getPublishedCounsellors()).slice(0, 3)

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Counsellors"
            title="The people you'll be speaking with"
            description="A small, considered team. Get to know each counsellor before you reach out."
          />
          {counsellors.length > 0 && (
            <Reveal delay={80}>
              <Link
                href="/counsellors"
                className={cn(ctaVariants({ variant: 'outline', size: 'sm' }))}
              >
                Meet the team
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-12">
          {counsellors.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {counsellors.map((counsellor, i) => (
                <Reveal key={counsellor.slug} delay={i * 60}>
                  <CounsellorCard counsellor={counsellor} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState message="Our counsellor profiles are being updated. Please contact FUAD to learn more." />
          )}
        </div>
      </div>
    </section>
  )
}
