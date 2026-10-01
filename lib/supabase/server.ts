import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

/**
 * Supabase env vars are optional at the code level: every read in
 * lib/content/* falls back to static seed data when they are not set, so
 * the public site never breaks before Supabase is configured. Admin
 * login/writes do require real credentials — see .env.example.
 */
function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
}

/**
 * Server Component / Server Action client. Reads and writes the user's
 * session via cookies. Returns null when Supabase is not configured yet.
 */
export async function getSupabaseServerClient() {
  if (!hasSupabaseEnv()) return null

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component render — middleware refreshes
            // the session instead. Safe to ignore.
          }
        },
      },
    },
  )
}

export { hasSupabaseEnv }
