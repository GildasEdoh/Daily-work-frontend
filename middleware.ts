import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/reports', '/my-reports', '/analytics']
const managerOnlyRoutes = ['/analytics']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if route requires authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // In a real app, you'd check cookies/session here
    // For now, we'll let the client-side handle it
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
