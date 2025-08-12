"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Users,
  TrendingUp,
  Search,
  Filter,
  Plus,
  UserPlus,
  Music,
  Calendar,
  MapPin,
  Star,
} from "lucide-react"

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")

  const feedPosts = [
    {
      id: 1,
      user: {
        name: "Luna Beats",
        username: "@lunabeats",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content: "Just dropped my latest deep house mix! 🎵 Perfect for those late night vibes. What do you think?",
      timestamp: "2 hours ago",
      likes: 124,
      comments: 18,
      shares: 7,
      track: {
        title: "Midnight Dreams",
        duration: "4:32",
        cover: "/placeholder.svg?height=60&width=60",
      },
    },
    {
      id: 2,
      user: {
        name: "Neon Pulse",
        username: "@neonpulse",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content: "Live streaming tonight at 9PM EST! Going to premiere some unreleased techno tracks. See you there! 🔥",
      timestamp: "4 hours ago",
      likes: 89,
      comments: 12,
      shares: 15,
      isLive: true,
    },
    {
      id: 3,
      user: {
        name: "Cosmic Waves",
        username: "@cosmicwaves",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content: "Collaboration with @lunabeats coming soon! We've been working on something special in the studio 🎧",
      timestamp: "6 hours ago",
      likes: 156,
      comments: 23,
      shares: 9,
    },
  ]

  const trendingDJs = [
    {
      name: "DJ Neon Pulse",
      username: "@neonpulse",
      followers: "125K",
      genre: "Techno",
      avatar: "/placeholder.svg?height=50&width=50",
      isFollowing: false,
    },
    {
      name: "Luna Beats",
      username: "@lunabeats",
      followers: "89K",
      genre: "Deep House",
      avatar: "/placeholder.svg?height=50&width=50",
      isFollowing: true,
    },
    {
      name: "Bass Foundation",
      username: "@bassfoundation",
      followers: "203K",
      genre: "Dubstep",
      avatar: "/placeholder.svg?height=50&width=50",
      isFollowing: false,
    },
    {
      name: "Cosmic Waves",
      username: "@cosmicwaves",
      followers: "156K",
      genre: "Trance",
      avatar: "/placeholder.svg?height=50&width=50",
      isFollowing: true,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Electronic Music Festival 2024",
      date: "Dec 15, 2024",
      time: "8:00 PM",
      location: "Virtual Event",
      attendees: 1250,
      cover: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Deep House Sessions Live",
      date: "Dec 20, 2024",
      time: "9:00 PM",
      location: "Miami, FL",
      attendees: 450,
      cover: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Techno Underground",
      date: "Dec 25, 2024",
      time: "10:00 PM",
      location: "Berlin, Germany",
      attendees: 800,
      cover: "/placeholder.svg?height=100&width=150",
    },
  ]

  const communities = [
    {
      name: "Deep House Lovers",
      members: "12.5K",
      posts: "1.2K",
      description: "For fans of deep, soulful house music",
      cover: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Techno Underground",
      members: "8.9K",
      posts: "890",
      description: "Raw, industrial techno community",
      cover: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Trance Family",
      members: "15.2K",
      posts: "2.1K",
      description: "Uplifting trance and progressive sounds",
      cover: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">Connect with DJs and music lovers worldwide</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>DJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input placeholder="What's on your mind?" className="mb-4" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Music className="h-4 w-4 mr-1" />
                            Add Track
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-1" />
                            Event
                          </Button>
                        </div>
                        <Button size="sm">Post</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feed Posts */}
              {feedPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{post.user.name}</span>
                          <span className="text-muted-foreground text-sm">{post.user.username}</span>
                          {post.user.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                          {post.isLive && <Badge className="text-xs bg-red-600">LIVE</Badge>}
                          <span className="text-muted-foreground text-sm ml-auto">{post.timestamp}</span>
                        </div>
                        <p className="mb-4">{post.content}</p>

                        {post.track && (
                          <div className="flex items-center gap-3 p-3 border rounded-lg mb-4">
                            <img
                              src={post.track.cover || "/placeholder.svg"}
                              alt={post.track.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{post.track.title}</p>
                              <p className="text-sm text-muted-foreground">{post.track.duration}</p>
                            </div>
                            <Button size="icon" variant="ghost">
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        <div className="flex items-center gap-6">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Share2 className="h-4 w-4" />
                            {post.shares}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending DJs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending DJs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendingDJs.map((dj, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={dj.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{dj.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{dj.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dj.followers} • {dj.genre}
                        </p>
                      </div>
                      <Button size="sm" variant={dj.isFollowing ? "outline" : "default"}>
                        {dj.isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="space-y-2">
                      <img
                        src={event.cover || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-20 object-cover rounded"
                      />
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                        <Users className="h-3 w-3 ml-2" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View All Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search DJs, genres, or tracks..." />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingDJs.map((dj, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={dj.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{dj.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">{dj.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{dj.username}</p>
                    <Badge variant="outline" className="mb-4">
                      {dj.genre}
                    </Badge>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{dj.followers} followers</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>
                    <Button className="w-full" variant={dj.isFollowing ? "outline" : "default"}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      {dj.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-0">
                  <img
                    src={event.cover || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                    <Button className="w-full">Join Event</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={community.cover || "/placeholder.svg"}
                      alt={community.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{community.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{community.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{community.members} members</span>
                        <span>{community.posts} posts</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Join Community
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
