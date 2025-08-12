"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Music, Play, Pause, Check, X, DollarSign, Star, Filter, Search, Download, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ArtistSubmissions() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [paidSubmissionsEnabled, setPaidSubmissionsEnabled] = useState(true)
  const [submissionFee, setSubmissionFee] = useState("25")

  const submissions = [
    {
      id: 1,
      artist: "Luna Beats",
      track: "Midnight Dreams",
      genre: "Deep House",
      duration: "4:32",
      submittedAt: "2 hours ago",
      status: "pending",
      isPaid: true,
      fee: 25,
      rating: 4.5,
      description:
        "A dreamy deep house track perfect for late night sets. Features ethereal vocals and a driving bassline.",
    },
    {
      id: 2,
      artist: "Neon Pulse",
      track: "Electric Nights",
      genre: "Techno",
      duration: "6:18",
      submittedAt: "5 hours ago",
      status: "approved",
      isPaid: false,
      fee: 0,
      rating: 4.8,
      description: "High-energy techno banger with industrial elements and hypnotic synths.",
    },
    {
      id: 3,
      artist: "Cosmic Waves",
      track: "Stellar Journey",
      genre: "Trance",
      duration: "7:45",
      submittedAt: "1 day ago",
      status: "rejected",
      isPaid: true,
      fee: 25,
      rating: 3.2,
      description: "Progressive trance track with cosmic themes and uplifting melodies.",
    },
    {
      id: 4,
      artist: "Bass Foundation",
      track: "Underground",
      genre: "Dubstep",
      duration: "3:58",
      submittedAt: "2 days ago",
      status: "pending",
      isPaid: true,
      fee: 50,
      rating: 4.1,
      description: "Heavy dubstep track with massive drops and intricate sound design.",
    },
  ]

  const handlePlayPause = (id: number) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id)
  }

  const handleApprove = (id: number) => {
    console.log(`Approved submission ${id}`)
  }

  const handleReject = (id: number) => {
    console.log(`Rejected submission ${id}`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artist Submissions</h1>
          <p className="text-muted-foreground">Review and manage track submissions from artists</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {submissions.filter((s) => s.status === "pending").length} Pending
        </Badge>
      </div>

      <Tabs defaultValue="submissions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tracks or artists..." className="w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-genres">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-genres">All Genres</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="techno">Techno</SelectItem>
                    <SelectItem value="trance">Trance</SelectItem>
                    <SelectItem value="dubstep">Dubstep</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Play Button */}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handlePlayPause(submission.id)}
                      className="shrink-0"
                    >
                      {currentlyPlaying === submission.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>

                    {/* Track Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{submission.track}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>by {submission.artist}</span>
                            <span>•</span>
                            <Badge variant="outline">{submission.genre}</Badge>
                            <span>•</span>
                            <span>{submission.duration}</span>
                            <span>•</span>
                            <span>{submission.submittedAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              submission.status === "approved"
                                ? "default"
                                : submission.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {submission.status}
                          </Badge>
                          {submission.isPaid && (
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />${submission.fee}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{submission.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{submission.rating}</span>
                          </div>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={`/placeholder.svg?height=24&width=24&query=${submission.artist}`} />
                            <AvatarFallback>{submission.artist[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{submission.artist}</span>
                        </div>

                        {submission.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(submission.id)}
                              className="gap-1"
                            >
                              <X className="h-3 w-3" />
                              Reject
                            </Button>
                            <Button size="sm" onClick={() => handleApprove(submission.id)} className="gap-1">
                              <Check className="h-3 w-3" />
                              Approve
                            </Button>
                          </div>
                        )}

                        {submission.status === "approved" && (
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                              <Download className="h-3 w-3" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                              <Share2 className="h-3 w-3" />
                              Add to Set
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submission Settings</CardTitle>
              <CardDescription>Configure how artists can submit tracks to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Accept Submissions</Label>
                  <p className="text-sm text-muted-foreground">Allow artists to submit tracks for consideration</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Paid Submissions</Label>
                  <p className="text-sm text-muted-foreground">Enable paid submission option for guaranteed review</p>
                </div>
                <Switch checked={paidSubmissionsEnabled} onCheckedChange={setPaidSubmissionsEnabled} />
              </div>

              {paidSubmissionsEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="submission-fee">Submission Fee ($)</Label>
                  <Input
                    id="submission-fee"
                    type="number"
                    value={submissionFee}
                    onChange={(e) => setSubmissionFee(e.target.value)}
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    Artists pay this fee for guaranteed playlist consideration
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="auto-response">Auto-Response Message</Label>
                <Textarea
                  id="auto-response"
                  placeholder="Thank you for your submission..."
                  defaultValue="Thank you for submitting your track! I'll review it within 48 hours and get back to you."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Accepted Genres</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["House", "Techno", "Trance", "Dubstep", "Ambient", "Progressive"].map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <input type="checkbox" id={genre.toLowerCase()} defaultChecked />
                      <Label htmlFor={genre.toLowerCase()}>{genre}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <Music className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18</span> this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,250</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+$320</span> this month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Submitting Artists</CardTitle>
              <CardDescription>Artists who submit tracks most frequently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { artist: "Luna Beats", submissions: 12, approved: 4 },
                  { artist: "Neon Pulse", submissions: 8, approved: 6 },
                  { artist: "Cosmic Waves", submissions: 6, approved: 2 },
                  { artist: "Bass Foundation", submissions: 5, approved: 3 },
                ].map((artist, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&query=${artist.artist}`} />
                        <AvatarFallback>{artist.artist[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{artist.artist}</p>
                        <p className="text-sm text-muted-foreground">
                          {artist.submissions} submissions • {artist.approved} approved
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{Math.round((artist.approved / artist.submissions) * 100)}% rate</Badge>
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
