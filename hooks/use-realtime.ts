"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimeChannel } from "@supabase/supabase-js"

export function useRealtimeSubscription<T>(table: string, filter?: string, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    let channel: RealtimeChannel

    const setupSubscription = async () => {
      try {
        // Initial data fetch
        let query = supabase.from(table).select("*")

        if (filter) {
          // Parse simple filters like "stream_id=eq.123"
          const [column, operator, value] = filter.split(/[=.]/)
          if (operator === "eq") {
            query = query.eq(column, value)
          }
        }

        const { data: initialData, error: fetchError } = await query

        if (fetchError) {
          setError(fetchError.message)
        } else {
          setData(initialData || [])
        }

        // Set up real-time subscription
        channel = supabase
          .channel(`realtime-${table}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: table,
              filter: filter,
            },
            (payload) => {
              if (payload.eventType === "INSERT") {
                setData((current) => [...current, payload.new as T])
              } else if (payload.eventType === "UPDATE") {
                setData((current) => current.map((item: any) => (item.id === payload.new.id ? payload.new : item)))
              } else if (payload.eventType === "DELETE") {
                setData((current) => current.filter((item: any) => item.id !== payload.old.id))
              }
            },
          )
          .subscribe()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    setupSubscription()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [table, filter])

  return { data, loading, error, setData }
}

export function useRealtimeChat(streamId: string) {
  const { data: messages, setData: setMessages } = useRealtimeSubscription(
    "chat_messages",
    `stream_id=eq.${streamId}`,
    [],
  )

  const sendMessage = async (message: string) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Must be logged in to send messages")
    }

    const { error } = await supabase.from("chat_messages").insert({
      stream_id: streamId,
      user_id: user.id,
      message: message.trim(),
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  return { messages, sendMessage, setMessages }
}

export function useRealtimeViewerCount(streamId: string) {
  const [viewerCount, setViewerCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(`stream-${streamId}-presence`)
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState()
        setViewerCount(Object.keys(state).length)
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        setViewerCount((current) => current + newPresences.length)
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        setViewerCount((current) => Math.max(0, current - leftPresences.length))
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // Track this user as present
          await channel.track({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            online_at: new Date().toISOString(),
          })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [streamId, supabase])

  return viewerCount
}
