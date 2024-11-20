// 4 https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  console.log(`Middleware triggered for ${request.nextUrl.pathname}`);
  const response = await updateSession(request);
  console.log(`Middleware response status: ${response.status}`);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}