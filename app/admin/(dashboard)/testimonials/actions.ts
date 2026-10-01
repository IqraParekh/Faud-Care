'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'

async function requireClient() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) throw new Error('Supabase is not configured.')
  return supabase
}

export async function createTestimonial(formData: FormData) {
  const supabase = await requireClient()

  await supabase.from('testimonials').insert({
    quote: String(formData.get('quote') ?? ''),
    attribution: String(formData.get('attribution') ?? ''),
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  })

  revalidatePath('/', 'layout')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await requireClient()

  await supabase
    .from('testimonials')
    .update({
      quote: String(formData.get('quote') ?? ''),
      attribution: String(formData.get('attribution') ?? ''),
      published: formData.get('published') === 'on',
      sort_order: Number(formData.get('sort_order') ?? 0),
    })
    .eq('id', id)

  revalidatePath('/', 'layout')
  redirect('/admin/testimonials')
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = await requireClient()
  const id = String(formData.get('id'))

  await supabase.from('testimonials').delete().eq('id', id)

  revalidatePath('/', 'layout')
}
