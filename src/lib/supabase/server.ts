import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || !url.startsWith('https://') || !url.includes('.supabase.co')) {
    console.log('Supabase not configured, returning null client');
    return null;
  }

  try {
    const cookieStore = await cookies();
    return createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch (e) {
            console.log('Cookie set error:', e);
          }
        },
      },
    });
  } catch (e) {
    console.log('Error creating supabase client:', e);
    return null;
  }
}