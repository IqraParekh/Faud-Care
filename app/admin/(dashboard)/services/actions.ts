'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function linesToArray(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean)
}

async function requireClient() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) throw new Error('Supabase is not configured.')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authorised.')
  return supabase
}

function fieldsFrom(formData: FormData) {
  return {
    title: String(formData.get('title') ?? ''),
    summary: String(formData.get('summary') ?? ''),
    intro: String(formData.get('intro') ?? ''),
    supports: linesToArray(formData.get('supports')),
    concerns: linesToArray(formData.get('concerns')),
    involves: linesToArray(formData.get('involves')),
    expect: linesToArray(formData.get('expect')),
    related: linesToArray(formData.get('related')),
    counsellors: linesToArray(formData.get('counsellors')),
    booking_url: String(formData.get('booking_url') ?? '') || null,
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  }
}

export async function createService(formData: FormData) {
  const supabase = await requireClient()
  const title = String(formData.get('title') ?? '')
  const slugInput = String(formData.get('slug') ?? '')

  await supabase.from('services').insert({
    slug: slugify(slugInput || title),
    ...fieldsFrom(formData),
  })

  revalidatePath('/', 'layout')
  redirect('/admin/services')
}

export async function updateService(slug: string, formData: FormData) {
  const supabase = await requireClient()

  await supabase.from('services').update(fieldsFrom(formData)).eq('slug', slug)

  revalidatePath('/', 'layout')
  redirect('/admin/services')
}

export async function deleteService(formData: FormData) {
  const supabase = await requireClient()
  const slug = String(formData.get('slug'))

  await supabase.from('services').delete().eq('slug', slug)

  revalidatePath('/', 'layout')
}
