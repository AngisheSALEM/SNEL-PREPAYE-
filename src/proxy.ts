import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const session = request.cookies.get('snel-pay-session')
  const { pathname } = request.nextUrl

  // Define public and private paths
  const isPublicPath = pathname === '/login' || pathname === '/signup' || pathname === '/'
  const isPrivatePath = pathname.startsWith('/dashboard') || pathname.startsWith('/buy')

  if (session && isPublicPath) {
    // If logged in and trying to access public pages, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!session && isPrivatePath) {
    // If not logged in and trying to access private pages, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/buy/:path*',
  ],
}
