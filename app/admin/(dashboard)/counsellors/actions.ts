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
  return supabase
}

function fieldsFrom(formData: FormData) {
  return {
    name: String(formData.get('name') ?? ''),
    title: String(formData.get('title') ?? ''),
    short_bio: String(formData.get('short_bio') ?? ''),
    full_bio: String(formData.get('full_bio') ?? ''),
    qualifications: linesToArray(formData.get('qualifications')),
    certifications: linesToArray(formData.get('certifications')),
    experience: String(formData.get('experience') ?? ''),
    areas: linesToArray(formData.get('areas')),
    specialties: linesToArray(formData.get('specialties')),
    languages: linesToArray(formData.get('languages')),
    approach: String(formData.get('approach') ?? ''),
    session_format: String(formData.get('session_format') ?? ''),
    fee: String(formData.get('fee') ?? ''),
    booking_url: String(formData.get('booking_url') ?? '') || null,
    photo: String(formData.get('photo') ?? '') || '/counsellor-placeholder.png',
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  }
}

export async function createCounsellor(formData: FormData) {
  const supabase = await requireClient()
  const name = String(formData.get('name') ?? '')
  const slugInput = String(formData.get('slug') ?? '')

  await supabase.from('counsellors').insert({
    slug: slugify(slugInput || name),
    ...fieldsFrom(formData),
  })

  revalidatePath('/', 'layout')
  redirect('/admin/counsellors')
}

export async function updateCounsellor(slug: string, formData: FormData) {
  const supabase = await requireClient()

  await supabase.from('counsellors').update(fieldsFrom(formData)).eq('slug', slug)

  revalidatePath('/', 'layout')
  redirect('/admin/counsellors')
}

export async function deleteCounsellor(formData: FormData) {
  const supabase = await requireClient()
  const slug = String(formData.get('slug'))

  await supabase.from('counsellors').delete().eq('slug', slug)

  revalidatePath('/', 'layout')
}
