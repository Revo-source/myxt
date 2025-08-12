"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Play, Download, Heart, Share2, Calendar, Globe, Music } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function AnalyticsDashboard() {
  const platformData = [
    { platform: "SoundCloud", plays: 125000, followers: 12500, growth: "+15.2%" },
    { platform: "Mixcloud", plays: 89000, followers: 8900, growth: "+8.7%" },
    { platform: "YouTube", plays: 67000, followers: 15600, growth: "+22.1%" },
    { platform: "Spotify", plays: 45000, followers: 6700, growth: "+12.8%" },
  ]

  const topTracks = [
    { title: "Summer Vibes Mix 2024", plays: 45000, likes: 2300, platform: "SoundCloud" },
    { title: "Deep House Sessions #12", plays: 38000, likes: 1900, platform: "Mixcloud" },
    { title: "Techno Underground", plays: 32000, likes: 1600, platform: "YouTube" },
    { title: "Chill Sunset Beats", plays: 28000, likes: 1400, platform: "Spotify" },
  ]

  const audienceData = [
    { country: "United States", percentage: 35, listeners: 15400 },
    { country: "United Kingdom", percentage: 18, listeners: 7920 },
    { country: "Germany", percentage: 12, listeners: 5280 },
    { country: "Canada", percentage: 8, listeners: 3520 },
    { country: "Australia", percentage: 6, listeners: 2640 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your performance across all platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Plays</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">43.7K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.8%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3,240</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+23.1%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Your performance across different platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformData.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {platform.platform[0]}
                      </div>
                      <div>
                        <h4 className="font-medium">{platform.platform}</h4>
                        <p className="text-sm text-muted-foreground">
                          {platform.plays.toLocaleString()} plays • {platform.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {platform.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {platformData.map((platform, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {platform.platform[0]}
                    </div>
                    {platform.platform}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Plays</p>
                      <p className="text-2xl font-bold">{platform.plays.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p className="text-2xl font-bold">{platform.followers.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Growth Rate</p>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={Number.parseFloat(platform.growth.replace("%", "").replace("+", ""))}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-green-600">{platform.growth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Geographic Distribution
                </CardTitle>
                <CardDescription>Where your listeners are located</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {audienceData.map((country, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{country.country}</span>
                      <span className="text-sm text-muted-foreground">
                        {country.listeners.toLocaleString()} listeners
                      </span>
                    </div>
                    <Progress value={country.percentage} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Listening Patterns</CardTitle>
                <CardDescription>When your audience is most active</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Peak Hours</p>
                    <p className="text-lg font-bold">8PM - 11PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Best Day</p>
                    <p className="text-lg font-bold">Friday</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Session</p>
                  <p className="text-lg font-bold">23 minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Return Rate</p>
                  <p className="text-lg font-bold">68%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Top Performing Tracks
              </CardTitle>
              <CardDescription>Your most popular content this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTracks.map((track, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{track.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{track.plays.toLocaleString()} plays</span>
                          <span>{track.likes.toLocaleString()} likes</span>
                          <Badge variant="outline">{track.platform}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
