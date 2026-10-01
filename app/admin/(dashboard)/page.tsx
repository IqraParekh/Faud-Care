import Link from 'next/link'
import { getSupabaseServerClient } from '@/lib/supabase/server'

const sections = [
  { table: 'services', href: '/admin/services', label: 'Services' },
  { table: 'counsellors', href: '/admin/counsellors', label: 'Counsellors' },
  { table: 'testimonials', href: '/admin/testimonials', label: 'Testimonials' },
  { table: 'faqs', href: '/admin/faqs', label: 'FAQs' },
] as const

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServerClient()

  const counts = await Promise.all(
    sections.map(async (s) => {
      if (!supabase) return { ...s, total: 0, published: 0 }
      const [all, live] = await Promise.all([
        supabase.from(s.table).select('*', { count: 'exact', head: true }),
        supabase
          .from(s.table)
          .select('*', { count: 'exact', head: true })
          .eq('published', true),
      ])
      return { ...s, total: all.count ?? 0, published: live.count ?? 0 }
    }),
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the content shown on the public site.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {counts.map((c) => (
          <Link
            key={c.table}
            href={c.href}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted"
          >
            <p className="text-sm font-medium text-navy">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-navy">{c.total}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {c.published} published · {c.total - c.published} draft
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/settings"
        className="rounded-2xl border border-border bg-card p-5 text-sm text-navy transition-colors hover:bg-muted"
      >
        Site settings — booking link, WhatsApp number, contact details
      </Link>
    </div>
  )
}
