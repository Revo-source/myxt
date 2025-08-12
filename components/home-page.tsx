"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PlayCircle,
  Upload,
  Radio,
  BarChart3,
  Users,
  DollarSign,
  Star,
  Play,
  Heart,
  Share2,
  ArrowRight,
  CheckCircle,
  Music,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { TopNavigation } from "@/components/top-navigation"

export function HomePage() {
  const [email, setEmail] = useState("")

  const features = [
    {
      icon: Upload,
      title: "Content Management",
      description: "Upload and distribute your mixes to multiple platforms simultaneously",
      color: "text-blue-600",
    },
    {
      icon: Radio,
      title: "Live Streaming",
      description: "Stream live to Twitch, YouTube, Facebook, and more with one click",
      color: "text-red-600",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance across all platforms with detailed insights",
      color: "text-green-600",
    },
    {
      icon: DollarSign,
      title: "Monetization",
      description: "Earn money through paid submissions and premium features",
      color: "text-purple-600",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with other DJs and music lovers worldwide",
      color: "text-orange-600",
    },
    {
      icon: Music,
      title: "Music Library",
      description: "Organize and manage your entire music collection in one place",
      color: "text-pink-600",
    },
  ]

  const featuredArtists = [
    {
      name: "DJ Neon Pulse",
      genre: "Techno",
      followers: "125K",
      image: "/placeholder.svg?height=80&width=80",
      verified: true,
      latestTrack: "Electric Dreams",
      plays: "2.4M",
    },
    {
      name: "Luna Beats",
      genre: "Deep House",
      followers: "89K",
      image: "/placeholder.svg?height=80&width=80",
      verified: true,
      latestTrack: "Midnight Vibes",
      plays: "1.8M",
    },
    {
      name: "Cosmic Waves",
      genre: "Trance",
      followers: "156K",
      image: "/placeholder.svg?height=80&width=80",
      verified: true,
      latestTrack: "Stellar Journey",
      plays: "3.1M",
    },
    {
      name: "Bass Foundation",
      genre: "Dubstep",
      followers: "203K",
      image: "/placeholder.svg?height=80&width=80",
      verified: true,
      latestTrack: "Underground",
      plays: "4.2M",
    },
  ]

  const testimonials = [
    {
      name: "Alex Rodriguez",
      role: "Professional DJ",
      content:
        "DJ Hub has revolutionized how I manage my music career. The multi-platform streaming is a game-changer!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Chen",
      role: "Music Producer",
      content:
        "The analytics dashboard gives me insights I never had before. I can see exactly what my audience loves.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Johnson",
      role: "Radio Host",
      content: "The artist submission feature has helped me discover so many talented artists. It's incredible!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign up with email:", email)
    // Handle sign up logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <TopNavigation showSearch={false} isLoggedIn={false} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              🎵 The Future of DJ Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Music,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Everywhere
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate platform for DJs to manage, distribute, and monetize their content. Stream live to multiple
              platforms, track analytics, and connect with your audience like never before.
            </p>
          </div>

          {/* Sign Up Form */}
          <Card className="max-w-md mx-auto mb-12 bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Join DJ Hub Today</CardTitle>
              <CardDescription className="text-gray-300">Start your journey to music success</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-4 text-center">No credit card required • 14-day free trial</p>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-300">Active DJs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2M+</div>
              <div className="text-gray-300">Tracks Uploaded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-gray-300">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful tools designed specifically for DJs and music creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/60 transition-colors"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Events</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join live DJ sets and electronic music performances happening right now
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Currently Live */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Radio className="h-5 w-5 text-red-500" />
                  Live Now
                  <Badge variant="destructive" className="animate-pulse">
                    3 Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    dj: "DJ Neon Pulse",
                    title: "Techno Friday Sessions",
                    viewers: "2.8K",
                    duration: "2h 15m",
                    genre: "Techno",
                  },
                  {
                    dj: "Luna Beats",
                    title: "Deep House Sunset",
                    viewers: "1.9K",
                    duration: "1h 45m",
                    genre: "Deep House",
                  },
                  {
                    dj: "Cosmic Waves",
                    title: "Trance Universe",
                    viewers: "3.1K",
                    duration: "3h 02m",
                    genre: "Trance",
                  },
                ].map((stream, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{stream.title}</h4>
                      <p className="text-xs text-gray-300">{stream.dj}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{stream.viewers} viewers</span>
                        <span>Live for {stream.duration}</span>
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                          {stream.genre}
                        </Badge>
                      </div>
                    </div>
                    <Badge className="bg-red-600 text-white text-xs animate-pulse">LIVE</Badge>
                  </div>
                ))}
                <Link href="/live">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                    Watch Live Streams
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Coming Up Today
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    dj: "Bass Foundation",
                    title: "Dubstep Madness",
                    time: "9:00 PM EST",
                    genre: "Dubstep",
                    followers: "203K",
                  },
                  {
                    dj: "Rhythm Master",
                    title: "House Party Live",
                    time: "10:30 PM EST",
                    genre: "House",
                    followers: "156K",
                  },
                  {
                    dj: "Electric Pulse",
                    title: "Midnight Techno",
                    time: "12:00 AM EST",
                    genre: "Techno",
                    followers: "89K",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-300">{event.dj}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>Today at {event.time}</span>
                        <span>{event.followers} followers</span>
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                          {event.genre}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Remind Me
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  View All Upcoming Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Artists</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover amazing DJs and producers from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtists.map((artist, index) => (
              <Card
                key={index}
                className="bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/60 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={artist.image || "/placeholder.svg"} />
                      <AvatarFallback>{artist.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{artist.name}</h3>
                        {artist.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-300">{artist.genre}</p>
                      <p className="text-xs text-gray-400">{artist.followers} followers</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{artist.latestTrack}</p>
                        <p className="text-xs text-gray-400">{artist.plays} plays</p>
                      </div>
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="flex-1 text-white hover:bg-white/10">
                        <Heart className="h-3 w-3 mr-1" />
                        Follow
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What DJs Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Join thousands of satisfied DJs who trust DJ Hub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Elevate Your Music?</h2>
          <p className="text-xl text-gray-300 mb-8">Join DJ Hub today and take your music career to the next level</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <PlayCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">DJ Hub</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate platform for DJs to manage, distribute, and monetize their content.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Content Management</li>
                <li>Live Streaming</li>
                <li>Analytics</li>
                <li>Monetization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>API Documentation</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 DJ Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
