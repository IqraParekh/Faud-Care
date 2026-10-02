import Link from 'next/link'
import { LogoMark } from '@/components/logo'
import { SignOutButton } from './sign-out-button'
import { AdminFlash } from './flash'

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/faqs', label: 'FAQs' },
  { href: '/admin/counsellors', label: 'Counsellors' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/settings', label: 'Settings' },
]

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail?: string
}) {
  return (
    <div className="min-h-dvh bg-secondary/30">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col md:flex-row">
        <aside className="flex shrink-0 flex-col gap-6 border-b border-border bg-navy px-5 py-6 text-ivory md:w-60 md:border-b-0 md:border-r">
          <Link href="/admin" className="inline-flex items-center gap-2">
            <LogoMark height={20} tone="ivory" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ivory/60">
              Admin
            </span>
          </Link>
          <nav className="flex flex-row flex-wrap gap-1 md:flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            {userEmail && (
              <p className="truncate text-xs text-ivory/50">{userEmail}</p>
            )}
            <SignOutButton />
          </div>
        </aside>
        <main id="admin-main" className="flex-1 px-5 py-8 sm:px-8 md:py-10">
          <div className="mx-auto max-w-4xl">
            <AdminFlash />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
