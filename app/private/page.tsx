// 8 https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'


export default async function PrivatePage() {

  // ! Protect page
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}