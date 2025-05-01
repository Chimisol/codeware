"use server";

import { createClient } from "@utils/supabase/server"; // Ensure correct import
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: user, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message }; 
  }

  if (!user) {
    return { error: "Login failed. Please try again." };
  }

  return { success: true, user };
}
