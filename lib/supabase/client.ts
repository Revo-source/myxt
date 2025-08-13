import { createBrowserClient } from "@supabase/ssr"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Create a singleton instance of the Supabase client for Client Components
export function createClient() {
  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({
            data: null,
            error: { message: "Supabase not configured. Please set up your Supabase integration in Project Settings." },
          }),
        signUp: () =>
          Promise.resolve({
            data: null,
            error: { message: "Supabase not configured. Please set up your Supabase integration in Project Settings." },
          }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
      }),
      channel: () => ({
        on: () => ({ subscribe: () => Promise.resolve() }),
        track: () => Promise.resolve(),
      }),
      removeChannel: () => {},
    }
  }

  try {
    return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: { message: "Invalid Supabase configuration" } }),
        getSession: () =>
          Promise.resolve({ data: { session: null }, error: { message: "Invalid Supabase configuration" } }),
        signInWithPassword: () =>
          Promise.resolve({
            data: null,
            error: { message: "Invalid Supabase configuration. Please check your environment variables." },
          }),
        signUp: () =>
          Promise.resolve({
            data: null,
            error: { message: "Invalid Supabase configuration. Please check your environment variables." },
          }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
      }),
      channel: () => ({
        on: () => ({ subscribe: () => Promise.resolve() }),
        track: () => Promise.resolve(),
      }),
      removeChannel: () => {},
    }
  }
}

// Export the client instance for backward compatibility
export const supabase = createClient()
