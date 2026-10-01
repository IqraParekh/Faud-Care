import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { ServicesSection } from '@/components/home/services-section'
import { WhySection } from '@/components/home/why-section'
import { ProcessSection } from '@/components/home/process-section'
import { ApproachSection } from '@/components/home/approach-section'
import { CounsellorsSection } from '@/components/home/counsellors-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { FaqsPreview } from '@/components/home/faqs-preview'
import { CtaSection } from '@/components/cta-section'
import { WebsiteSchema } from '@/components/seo-schema'

export default function HomePage() {
  return (
    <>
      <WebsiteSchema />
      <Hero />
      <Intro />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <ApproachSection />
      <CounsellorsSection />
      <TestimonialsSection />
      <FaqsPreview />
      <CtaSection />
    </>
  )
}
