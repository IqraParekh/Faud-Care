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

async function requireClient() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) throw new Error('Supabase is not configured.')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authorised.')
  return supabase
}

export async function createFaq(formData: FormData) {
  const supabase = await requireClient()
  const question = String(formData.get('question') ?? '')

  await supabase.from('faqs').insert({
    id: slugify(question) || crypto.randomUUID(),
    question,
    answer: String(formData.get('answer') ?? ''),
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  })

  revalidatePath('/', 'layout')
  redirect('/admin/faqs')
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await requireClient()

  await supabase
    .from('faqs')
    .update({
      question: String(formData.get('question') ?? ''),
      answer: String(formData.get('answer') ?? ''),
      published: formData.get('published') === 'on',
      sort_order: Number(formData.get('sort_order') ?? 0),
    })
    .eq('id', id)

  revalidatePath('/', 'layout')
  redirect('/admin/faqs')
}

export async function deleteFaq(formData: FormData) {
  const supabase = await requireClient()
  const id = String(formData.get('id'))

  await supabase.from('faqs').delete().eq('id', id)

  revalidatePath('/', 'layout')
}
