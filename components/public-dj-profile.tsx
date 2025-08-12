"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  Heart,
  Share2,
  Download,
  Users,
  MapPin,
  Calendar,
  Clock,
  Star,
  ShoppingBag,
  Send,
  ExternalLink,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Radio,
  Ticket,
  Volume2,
  SkipForward,
  SkipBack,
} from "lucide-react"
import { TopNavigation } from "@/components/top-navigation"

interface PublicDJProfileProps {
  username: string
}

export function PublicDJProfile({ username }: PublicDJProfileProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  // Mock DJ data - in real app, this would come from API
  const djData = {
    name: "DJ Neon Pulse",
    username: "neonpulse",
    bio: "Electronic music producer and DJ specializing in techno and deep house. Bringing you the best underground sounds from around the world. Available for bookings and collaborations.",
    location: "Los Angeles, CA",
    website: "https://neonpulse.com",
    avatar: "/placeholder.svg?height=150&width=150",
    coverImage: "/placeholder.svg?height=300&width=1200",
    verified: true,
    followers: "125K",
    totalPlays: "2.4M",
    monthlyListeners: "89K",
    genres: ["Techno", "Deep House", "Progressive", "Ambient"],
    socialLinks: {
      instagram: "https://instagram.com/neonpulse",
      twitter: "https://twitter.com/neonpulse",
      youtube: "https://youtube.com/neonpulse",
    },
  }

  const tracks = [
    {
      id: 1,
      title: "Electric Dreams",
      duration: "6:42",
      plays: "245K",
      likes: "12K",
      releaseDate: "2024-01-15",
      genre: "Techno",
      cover: "/placeholder.svg?height=60&width=60",
      featured: true,
    },
    {
      id: 2,
      title: "Midnight Vibes",
      duration: "5:28",
      plays: "189K",
      likes: "8.5K",
      releaseDate: "2024-01-10",
      genre: "Deep House",
      cover: "/placeholder.svg?height=60&width=60",
      featured: true,
    },
    {
      id: 3,
      title: "Neon Nights",
      duration: "7:15",
      plays: "156K",
      likes: "9.2K",
      releaseDate: "2023-12-20",
      genre: "Progressive",
      cover: "/placeholder.svg?height=60&width=60",
      featured: false,
    },
    {
      id: 4,
      title: "Underground",
      duration: "8:33",
      plays: "203K",
      likes: "11K",
      releaseDate: "2023-12-15",
      genre: "Techno",
      cover: "/placeholder.svg?height=60&width=60",
      featured: false,
    },
  ]

  const merchandise = [
    {
      id: 1,
      name: "Neon Pulse T-Shirt",
      price: "$29.99",
      image: "/placeholder.svg?height=200&width=200",
      category: "Apparel",
    },
    {
      id: 2,
      name: "Limited Edition Vinyl",
      price: "$49.99",
      image: "/placeholder.svg?height=200&width=200",
      category: "Music",
    },
    {
      id: 3,
      name: "DJ Headphones",
      price: "$199.99",
      image: "/placeholder.svg?height=200&width=200",
      category: "Equipment",
    },
    {
      id: 4,
      name: "Neon Pulse Cap",
      price: "$24.99",
      image: "/placeholder.svg?height=200&width=200",
      category: "Apparel",
    },
  ]

  const upcomingShows = [
    {
      id: 1,
      venue: "Electric Warehouse",
      city: "Los Angeles, CA",
      date: "2024-02-15",
      time: "10:00 PM",
      ticketPrice: "$35",
      ticketUrl: "#",
      image: "/placeholder.svg?height=150&width=200",
      soldOut: false,
    },
    {
      id: 2,
      venue: "Underground Club",
      city: "San Francisco, CA",
      date: "2024-02-22",
      time: "9:00 PM",
      ticketPrice: "$40",
      ticketUrl: "#",
      image: "/placeholder.svg?height=150&width=200",
      soldOut: false,
    },
    {
      id: 3,
      venue: "Techno Festival 2024",
      city: "Miami, FL",
      date: "2024-03-05",
      time: "8:00 PM",
      ticketPrice: "$75",
      ticketUrl: "#",
      image: "/placeholder.svg?height=150&width=200",
      soldOut: true,
    },
  ]

  const handlePlayPause = (id: number) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <TopNavigation />

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={djData.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={djData.avatar || "/placeholder.svg"} />
              <AvatarFallback>{djData.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white md:text-foreground">{djData.name}</h1>
                  {djData.verified && <Badge className="bg-blue-600 text-white">Verified</Badge>}
                </div>
                <p className="text-lg text-gray-300 md:text-muted-foreground">@{djData.username}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 md:text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{djData.followers} followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  <span>{djData.totalPlays} total plays</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{djData.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {djData.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"} className="gap-2">
                <Heart className={`h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{djData.totalPlays}</div>
              <p className="text-sm text-muted-foreground">Total Plays</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{djData.monthlyListeners}</div>
              <p className="text-sm text-muted-foreground">Monthly Listeners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{djData.followers}</div>
              <p className="text-sm text-muted-foreground">Followers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="music" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="shows">Live Shows</TabsTrigger>
            <TabsTrigger value="merch">Merchandise</TabsTrigger>
            <TabsTrigger value="submit">Submit Track</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="space-y-6">
            {/* Featured Tracks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Featured Tracks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tracks
                    .filter((track) => track.featured)
                    .map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <img
                          src={track.cover || "/placeholder.svg"}
                          alt={track.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{track.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{track.duration}</span>
                            <span>{track.plays} plays</span>
                            <Badge variant="outline">{track.genre}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" onClick={() => handlePlayPause(track.id)}>
                            {currentlyPlaying === track.id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* All Tracks */}
            <Card>
              <CardHeader>
                <CardTitle>All Tracks</CardTitle>
                <CardDescription>Complete discography</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <span className="text-sm text-muted-foreground w-8">{index + 1}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handlePlayPause(track.id)}
                        className="shrink-0"
                      >
                        {currentlyPlaying === track.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <img
                        src={track.cover || "/placeholder.svg"}
                        alt={track.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.genre}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{track.plays}</div>
                      <div className="text-sm text-muted-foreground">{track.duration}</div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Heart className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Shows
                </CardTitle>
                <CardDescription>Don't miss these live performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingShows.map((show) => (
                    <Card key={show.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={show.image || "/placeholder.svg"}
                          alt={show.venue}
                          className="w-full h-32 object-cover"
                        />
                        {show.soldOut && <Badge className="absolute top-2 right-2 bg-red-600">Sold Out</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{show.venue}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{show.city}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(show.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{show.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">{show.ticketPrice}</span>
                          <Button size="sm" disabled={show.soldOut} className="gap-2">
                            <Ticket className="h-4 w-4" />
                            {show.soldOut ? "Sold Out" : "Get Tickets"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Stream Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Live Stream Schedule
                </CardTitle>
                <CardDescription>Catch the live streams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: "Friday", time: "9:00 PM PST", title: "Techno Friday Sessions" },
                    { day: "Sunday", time: "7:00 PM PST", title: "Deep House Sunday" },
                  ].map((stream, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{stream.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Every {stream.day} at {stream.time}
                        </p>
                      </div>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Radio className="h-4 w-4" />
                        Set Reminder
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merch" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Official Merchandise
                </CardTitle>
                <CardDescription>Support your favorite DJ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {merchandise.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">
                          {item.category}
                        </Badge>
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{item.price}</span>
                          <Button size="sm" className="gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            Buy Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Submit Your Track
                </CardTitle>
                <CardDescription>
                  Send your music for consideration. Premium submissions get guaranteed feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Submission Form */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="artist-name">Artist Name</Label>
                      <Input id="artist-name" placeholder="Your artist name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="track-title">Track Title</Label>
                      <Input id="track-title" placeholder="Your track title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="techno">Techno</SelectItem>
                          <SelectItem value="house">Deep House</SelectItem>
                          <SelectItem value="progressive">Progressive</SelectItem>
                          <SelectItem value="ambient">Ambient</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="track-url">Track URL</Label>
                      <Input id="track-url" placeholder="SoundCloud, Spotify, or download link" type="url" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea id="message" placeholder="Tell me about your track..." rows={4} />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button className="flex-1">Submit for Free</Button>
                        <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                          <Star className="h-4 w-4" />
                          Premium ($25)
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Premium submissions include guaranteed feedback within 48 hours
                      </p>
                    </div>
                  </div>

                  {/* Submission Guidelines */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Submission Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">What I'm Looking For:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• High-quality production</li>
                            <li>• Techno, Deep House, Progressive</li>
                            <li>• Original compositions</li>
                            <li>• Professional mastering</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Requirements:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 320kbps MP3 minimum</li>
                            <li>• Include artist bio</li>
                            <li>• Social media links</li>
                            <li>• Release date (if applicable)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Response Times</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Free Submissions</span>
                            <span className="text-sm text-muted-foreground">2-4 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Premium Submissions</span>
                            <span className="text-sm font-medium">48 hours</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {djData.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{djData.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Career Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { year: "2024", event: "Headlined Electric Music Festival" },
                        { year: "2023", event: "Released debut album 'Electric Dreams'" },
                        { year: "2023", event: "Reached #1 on Beatport Techno Chart" },
                        { year: "2022", event: "Started weekly radio show on Beats 1" },
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Badge variant="outline">{highlight.year}</Badge>
                          <span className="text-sm">{highlight.event}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Connect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={djData.website}
                        className="text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {djData.website}
                      </a>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-pink-600" />
                      <a
                        href={djData.socialLinks.instagram}
                        className="text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{djData.username}
                      </a>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-600" />
                      <a
                        href={djData.socialLinks.twitter}
                        className="text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{djData.username}
                      </a>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Youtube className="h-4 w-4 text-red-600" />
                      <a
                        href={djData.socialLinks.youtube}
                        className="text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {djData.name}
                      </a>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Booking Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Available for club nights, festivals, and private events.
                    </p>
                    <Button className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Contact for Booking
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>• Pioneer CDJ-3000</div>
                      <div>• DJM-900NXS2 Mixer</div>
                      <div>• Technics SL-1200MK7</div>
                      <div>• Ableton Live 11</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Music Player */}
      {currentlyPlaying && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={tracks.find((t) => t.id === currentlyPlaying)?.cover || "/placeholder.svg"}
                  alt="Now Playing"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <h4 className="font-medium">{tracks.find((t) => t.id === currentlyPlaying)?.title}</h4>
                  <p className="text-sm text-muted-foreground">{djData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={() => setCurrentlyPlaying(null)}>
                  <Pause className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
