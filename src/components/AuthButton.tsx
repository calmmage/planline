"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AuthButton() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <div>
      {user ? (
        <Button onClick={handleSignOut}>Sign Out</Button>
      ) : (
        <Button onClick={handleSignIn}>Sign In with Google</Button>
      )}
    </div>
  )
}

