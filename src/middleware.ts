import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip auth check if credentials not available
  if (!supabaseUrl || !supabaseKey || !supabaseUrl.includes('.supabase.co')) {
    console.log('Middleware: Supabase not configured, allowing access');
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Check if user is trying to access admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // Allow access to login page
      if (request.nextUrl.pathname === '/admin/login') {
        if (user) {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
        return supabaseResponse
      }

      // Protect all other admin routes
      if (!user) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
  } catch (e) {
    console.log('Middleware: Error checking auth:', e);
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}