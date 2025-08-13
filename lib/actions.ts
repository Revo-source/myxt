"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const username = formData.get("username")
  const displayName = formData.get("displayName")

  if (!email || !password || !username) {
    return { error: "Email, password, and username are required" }
  }

  const supabase = createClient()

  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("username")
      .eq("username", username.toString())
      .single()

    if (existingUser) {
      return { error: "Username is already taken" }
    }

    const { data: existingEmail } = await supabase.from("users").select("email").eq("email", email.toString()).single()

    if (existingEmail) {
      return { error: "An account with this email already exists. Please try logging in instead." }
    }

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`,
      },
    })

    if (authError) {
      return { error: authError.message }
    }

    if (authData.user) {
      const { error: profileError } = await supabase.from("users").upsert(
        {
          id: authData.user.id,
          email: email.toString(),
          username: username.toString(),
          display_name: displayName?.toString() || username.toString(),
          is_dj: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "email",
        },
      )

      if (profileError) {
        console.error("Profile creation error:", profileError)
        return { error: "Account created but profile setup failed. Please contact support." }
      }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}

export async function updateProfile(prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  const displayName = formData.get("displayName")
  const bio = formData.get("bio")
  const location = formData.get("location")
  const websiteUrl = formData.get("websiteUrl")

  try {
    const { error } = await supabase
      .from("users")
      .update({
        display_name: displayName?.toString(),
        bio: bio?.toString(),
        location: location?.toString(),
        website_url: websiteUrl?.toString(),
      })
      .eq("id", user.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/dashboard/profile")
    return { success: "Profile updated successfully" }
  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "Failed to update profile" }
  }
}
