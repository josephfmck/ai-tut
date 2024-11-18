// 5 https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient();

  console.log('login', formData.get('email'), formData.get('password'))

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("error", error);
    // Throw the redirect to properly navigate to the /error page
    throw redirect('/error') // <-- Changed from redirect('/error') to throw redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error(error);
    // Throw the redirect to properly navigate to the /error page
    throw redirect('/error') // <-- Changed from redirect('/error') to throw redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}