'use server'

import { revalidatePath } from 'next/cache'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function updateSettings(formData: FormData) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) throw new Error('Supabase is not configured.')

  await supabase
    .from('site_settings')
    .update({
      name: String(formData.get('name') ?? ''),
      tagline: String(formData.get('tagline') ?? ''),
      description: String(formData.get('description') ?? ''),
      booking_enabled: formData.get('booking_enabled') === 'on',
      booking_global_url: String(formData.get('booking_global_url') ?? ''),
      booking_button_label: String(formData.get('booking_button_label') ?? ''),
      whatsapp_number: String(formData.get('whatsapp_number') ?? ''),
      whatsapp_display_number: String(formData.get('whatsapp_display_number') ?? ''),
      contact_email: String(formData.get('contact_email') ?? ''),
      contact_location: String(formData.get('contact_location') ?? ''),
      contact_hours: String(formData.get('contact_hours') ?? ''),
      social_instagram: String(formData.get('social_instagram') ?? ''),
      social_facebook: String(formData.get('social_facebook') ?? ''),
      social_linkedin: String(formData.get('social_linkedin') ?? ''),
      updated_at: new Date().toISOString(),
    })
    .eq('id', true)

  revalidatePath('/', 'layout')
}
