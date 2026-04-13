import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Use placeholder to avoid Supabase connection issues
  return createBrowserClient(
    'https://placeholder.supabase.co',
    'placeholder-key'
  );
}