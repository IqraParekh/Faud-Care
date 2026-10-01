import Link from 'next/link'

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-widest text-teal">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-navy">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-navy/70">
        The page may have moved or no longer exists. You can head back to the homepage or explore our services.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-navy px-6 py-3 text-ivory">Home</Link>
        <Link href="/services" className="rounded-full border border-navy/20 px-6 py-3 text-navy">Services</Link>
      </div>
    </main>
  )
}
