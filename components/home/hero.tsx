import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { homepage } from '@/lib/content/homepage'
import { Reveal } from '@/components/reveal'
import { BookingButton } from '@/components/booking-button'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ctaVariants } from '@/components/ui/cta'
import { cn } from '@/lib/utils'

export function Hero() {
  const { heading, description, secondaryCta } = homepage.hero

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <Reveal
            as="span"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-sage"
          >
            <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
            Counselling &amp; emotional wellbeing
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-balance text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-6xl">
              {heading}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </Reveal>

          <Reveal
            delay={180}
            className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center"
          >
            <BookingButton size="lg" hideFallbackNote />
            <Link
              href="/services"
              className={cn(ctaVariants({ variant: 'outline', size: 'lg' }))}
            >
              {secondaryCta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={220}>
            <WhatsAppButton variant="ghost" size="sm" className="-ml-1 px-1" />
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_70px_-40px_rgba(35,55,79,0.5)] sm:aspect-4/3 lg:aspect-4/5">
            <Image
              src="/hero.png"
              alt="A calm, sunlit interior with a soft armchair and plants"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 -z-10 size-40 rounded-full bg-beige/60 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 -z-10 size-32 rounded-full bg-mist/70 blur-2xl"
          />
        </Reveal>
      </div>
    </section>
  )
}
