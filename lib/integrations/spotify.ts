"use client"

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: { name: string; images: { url: string }[] }
  external_urls: { spotify: string }
  preview_url: string | null
  duration_ms: number
}

interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: { url: string }[]
  external_urls: { spotify: string }
  tracks: { total: number }
}

export class SpotifyIntegration {
  private clientId: string
  private redirectUri: string
  private scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-top-read",
  ]

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ""
    this.redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || `${window.location.origin}/auth/spotify/callback`
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: "code",
      redirect_uri: this.redirectUri,
      scope: this.scopes.join(" "),
      state: Math.random().toString(36).substring(7),
    })

    return `https://accounts.spotify.com/authorize?${params.toString()}`
  }

  async exchangeCodeForToken(code: string): Promise<{ access_token: string; refresh_token: string }> {
    const response = await fetch("/api/integrations/spotify/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })

    if (!response.ok) {
      throw new Error("Failed to exchange code for token")
    }

    return response.json()
  }

  async searchTracks(query: string, accessToken: string): Promise<SpotifyTrack[]> {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to search tracks")
    }

    const data = await response.json()
    return data.tracks.items
  }

  async getUserPlaylists(accessToken: string): Promise<SpotifyPlaylist[]> {
    const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get user playlists")
    }

    const data = await response.json()
    return data.items
  }

  async getTopTracks(
    accessToken: string,
    timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  ): Promise<SpotifyTrack[]> {
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=20`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get top tracks")
    }

    const data = await response.json()
    return data.items
  }
}
