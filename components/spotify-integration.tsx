"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Music, Search, ExternalLink, Play } from "lucide-react"
import { SpotifyIntegration } from "@/lib/integrations/spotify"

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: { name: string; images: { url: string }[] }
  external_urls: { spotify: string }
  preview_url: string | null
  duration_ms: number
}

export function SpotifyIntegrationCard() {
  const [isConnected, setIsConnected] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([])
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(false)

  const spotify = new SpotifyIntegration()

  useEffect(() => {
    // Check if user has Spotify token stored
    const token = localStorage.getItem("spotify_access_token")
    if (token) {
      setAccessToken(token)
      setIsConnected(true)
      loadTopTracks(token)
    }
  }, [])

  const handleConnect = () => {
    const authUrl = spotify.getAuthUrl()
    window.location.href = authUrl
  }

  const loadTopTracks = async (token: string) => {
    try {
      setLoading(true)
      const tracks = await spotify.getTopTracks(token)
      setTopTracks(tracks)
    } catch (error) {
      console.error("Failed to load top tracks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim() || !accessToken) return

    try {
      setLoading(true)
      const results = await spotify.searchTracks(searchQuery, accessToken)
      setSearchResults(results)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-green-500" />
            Connect Spotify
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Connect your Spotify account to import your music, discover new tracks, and sync your playlists.
          </p>
          <Button onClick={handleConnect} className="bg-green-500 hover:bg-green-600">
            <Music className="h-4 w-4 mr-2" />
            Connect to Spotify
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Spotify
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for tracks, artists, or albums..."
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {searchResults.length > 0 && (
            <ScrollArea className="h-64 mt-4">
              <div className="space-y-2">
                {searchResults.map((track) => (
                  <div key={track.id} className="flex items-center gap-3 p-2 border rounded-lg">
                    <img
                      src={track.album.images[2]?.url || "/placeholder.svg"}
                      alt={track.album.name}
                      className="w-10 h-10 rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{track.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {track.artists.map((a) => a.name).join(", ")} • {track.album.name}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDuration(track.duration_ms)}
                    </Badge>
                    <div className="flex gap-1">
                      {track.preview_url && (
                        <Button size="sm" variant="ghost">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" asChild>
                        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Top Tracks */}
      <Card>
        <CardHeader>
          <CardTitle>Your Top Tracks</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 bg-muted rounded animate-pulse" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {topTracks.map((track, index) => (
                  <div key={track.id} className="flex items-center gap-3 p-2 border rounded-lg">
                    <span className="text-sm font-medium w-6">{index + 1}</span>
                    <img
                      src={track.album.images[2]?.url || "/placeholder.svg"}
                      alt={track.album.name}
                      className="w-10 h-10 rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{track.name}</p>
                      <p className="text-xs text-muted-foreground">{track.artists.map((a) => a.name).join(", ")}</p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
