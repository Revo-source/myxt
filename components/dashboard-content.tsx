"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Share2, Download, TrendingUp, Users, Eye, Radio, Upload, DollarSign } from "lucide-react"
import { UploadContent } from "@/components/upload-content"
import { LiveStreaming } from "@/components/live-streaming"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { ArtistSubmissions } from "@/components/artist-submissions"
import { MusicPlayer } from "@/components/music-player"
import { createClient } from "@/lib/supabase/client"

interface AnalyticsData {
  totalStats: {
    plays: number
    likes: number
    downloads: number
    followers: number
    tracks: number
  }
  topTracks: Array<{
    id: string
    title: string
    play_count: number
    like_count: number
    created_at: string
  }>
}

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()

        // Get current user
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()
        setUser(currentUser)

        if (currentUser) {
          // Fetch analytics data
          const response = await fetch("/api/analytics")
          if (response.ok) {
            const data = await response.json()
            setAnalytics(data)
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats = [
    {
      title: "Total Plays",
      value: analytics?.totalStats.plays.toLocaleString() || "0",
      change: "+12.5%",
      icon: Play,
      color: "text-green-600",
    },
    {
      title: "Followers",
      value: analytics?.totalStats.followers.toLocaleString() || "0",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Tracks",
      value: analytics?.totalStats.tracks.toString() || "0",
      change: "+23.1%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Total Likes",
      value: analytics?.totalStats.likes.toLocaleString() || "0",
      change: "+5.7%",
      icon: Eye,
      color: "text-orange-600",
    },
  ]

  const recentTracks =
    analytics?.topTracks.slice(0, 3).map((track) => ({
      title: track.title,
      plays: track.play_count.toLocaleString(),
      likes: track.like_count.toLocaleString(),
      duration: "45:32", // This would come from track metadata
      status: track.play_count > 10000 ? "trending" : track.play_count > 5000 ? "popular" : "new",
    })) || []

  if (activeTab === "upload") {
    return <UploadContent />
  }

  if (activeTab === "streaming") {
    return <LiveStreaming />
  }

  if (activeTab === "analytics") {
    return <AnalyticsDashboard />
  }

  if (activeTab === "submissions") {
    return <ArtistSubmissions />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.user_metadata?.display_name || user?.email || "DJ"}
              </h1>
              <p className="text-muted-foreground">Here's what's happening with your music today.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setActiveTab("upload")} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Content
              </Button>
              <Button onClick={() => setActiveTab("streaming")} variant="outline" className="gap-2">
                <Radio className="h-4 w-4" />
                Go Live
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Tracks */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Tracks</CardTitle>
                <CardDescription>Your latest uploads and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                {recentTracks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No tracks uploaded yet</p>
                    <Button onClick={() => setActiveTab("upload")} className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Your First Track
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTracks.map((track, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Button size="icon" variant="ghost">
                            <Play className="h-4 w-4" />
                          </Button>
                          <div>
                            <h4 className="font-medium">{track.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{track.duration}</span>
                              <span>{track.plays} plays</span>
                              <span>{track.likes} likes</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              track.status === "trending"
                                ? "default"
                                : track.status === "popular"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {track.status}
                          </Badge>
                          <Button size="icon" variant="ghost">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your content and audience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => setActiveTab("submissions")} className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Review Artist Submissions (12)
                </Button>
                <Button
                  onClick={() => setActiveTab("analytics")}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Share to Platforms
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Platform Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
              <CardDescription>Connected streaming and music platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "SoundCloud", status: "connected", color: "bg-orange-500" },
                  { name: "Mixcloud", status: "connected", color: "bg-blue-500" },
                  { name: "Spotify", status: "pending", color: "bg-green-500" },
                  { name: "YouTube", status: "connected", color: "bg-red-500" },
                ].map((platform, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{platform.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  )
}
