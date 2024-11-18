//! NOT USED
// 7 https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
// Create a Route Handler for auth/confirm. When a user clicks their confirmation email link, exchange their secure code for an Auth token.
// Since this is a Router Handler, use the Supabase client from @/utils/supabase/server.ts.


import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}