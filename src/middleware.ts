import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip auth check completely for now - allow all admin pages
  console.log('Middleware: Allowing all routes for now');
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}