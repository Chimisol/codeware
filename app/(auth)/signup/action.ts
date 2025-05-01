'use server';

import { createClient } from '@utils/supabase/server';

export async function Signup(formData: FormData) {
  const supabase = await createClient(  );
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;


  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username:username , roles:"User" }, 
    },
  });
  
  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
