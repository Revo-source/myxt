"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TopNavigation } from "@/components/top-navigation"
import { RealtimeChat } from "@/components/realtime-chat"
import { RealtimeViewerCount } from "@/components/realtime-viewer-count"
import { RealtimeNotifications } from "@/components/realtime-notifications"
import { useRealtimeSubscription } from "@/hooks/use-realtime"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Radio,
  Calendar,
  ExternalLink,
  Fullscreen,
  Settings,
  Gift,
  Star,
} from "lucide-react"

export function LiveStreamPage() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  const { data: liveStreams, loading } = useRealtimeSubscription("live_streams", "is_live=eq.true")
  const { data: upcomingStreams } = useRealtimeSubscription("live_streams", `is_live=eq.false`)

  useEffect(() => {
    if (liveStreams.length > 0 && !selectedStream) {
      setSelectedStream(liveStreams[0].id)
    }
  }, [liveStreams, selectedStream])

  const currentStream = liveStreams.find((stream: any) => stream.id === selectedStream)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="aspect-video bg-muted rounded-lg"></div>
              </div>
              <div className="space-y-4">
                <div className="h-80 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <RealtimeNotifications />
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Radio className="h-8 w-8 text-red-500" />
              Live Streams
            </h1>
            <p className="text-muted-foreground">Watch live DJ sets and electronic music performances</p>
          </div>
          <Badge variant="destructive" className="animate-pulse">
            🔴 {liveStreams.length} Live Now
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Stream Player */}
          <div className="lg:col-span-3 space-y-6">
            {currentStream && (
              <Card>
                <CardContent className="p-0">
                  {/* Video Player */}
                  <div ref={videoRef} className="relative aspect-video bg-black rounded-t-lg overflow-hidden group">
                    <img
                      src={currentStream.thumbnail_url || "/placeholder.svg?height=400&width=800"}
                      alt={currentStream.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Live Indicator */}
                    <Badge className="absolute top-4 left-4 bg-red-600 text-white animate-pulse">🔴 LIVE</Badge>

                    <RealtimeViewerCount streamId={currentStream.id} className="absolute top-4 right-4" />

                    {/* Player Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setIsMuted(!isMuted)}
                              className="text-white hover:bg-white/20"
                            >
                              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                            <div className="w-20 h-1 bg-white/30 rounded-full">
                              <div
                                className="h-full bg-white rounded-full transition-all"
                                style={{ width: `${isMuted ? 0 : volume}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={toggleFullscreen}
                            className="text-white hover:bg-white/20"
                          >
                            <Fullscreen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stream Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={currentStream.users?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>{currentStream.users?.display_name?.[0] || "DJ"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl font-bold">{currentStream.title}</h2>
                          <p className="text-muted-foreground">{currentStream.users?.display_name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <RealtimeViewerCount streamId={currentStream.id} />
                            <span>Live for {currentStream.duration || "0m"}</span>
                            <Badge variant="outline">{currentStream.genre}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Heart className="h-4 w-4" />
                          Follow
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{currentStream.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {currentStream.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other Live Streams */}
            <Card>
              <CardHeader>
                <CardTitle>Other Live Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {liveStreams
                    .filter((stream: any) => stream.id !== selectedStream)
                    .map((stream: any) => (
                      <div
                        key={stream.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedStream(stream.id)}
                      >
                        <div className="relative">
                          <img
                            src={stream.thumbnail_url || "/placeholder.svg?height=60&width=80"}
                            alt={stream.title}
                            className="w-20 h-12 object-cover rounded"
                          />
                          <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1">LIVE</Badge>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{stream.title}</h4>
                          <p className="text-sm text-muted-foreground">{stream.users?.display_name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <RealtimeViewerCount streamId={stream.id} />
                            <Badge variant="outline" className="text-xs">
                              {stream.genre}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {currentStream && <RealtimeChat streamId={currentStream.id} />}

            {/* Upcoming Streams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Coming Up Next
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingStreams
                  .filter((stream: any) => stream.scheduled_for)
                  .slice(0, 3)
                  .map((stream: any) => (
                    <div key={stream.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <img
                        src={stream.thumbnail_url || "/placeholder.svg?height=48&width=64"}
                        alt={stream.title}
                        className="w-12 h-8 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{stream.title}</h4>
                        <p className="text-xs text-muted-foreground">{stream.users?.display_name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(stream.scheduled_for).toLocaleString()}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Remind Me
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Support the DJ */}
            {currentStream && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Support {currentStream.users?.display_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2">
                    <Heart className="h-4 w-4" />
                    Send Tip
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Star className="h-4 w-4" />
                    Buy Merchandise
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <ExternalLink className="h-4 w-4" />
                    Follow on Social
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
