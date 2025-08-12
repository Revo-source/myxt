"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  Heart,
  Share2,
  Download,
  MoreHorizontal,
  Search,
  Grid,
  List,
  Music,
  Clock,
  Folder,
  Plus,
} from "lucide-react"
import { MusicPlayer } from "@/components/music-player"

export function MusicLibrary() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const tracks = [
    {
      id: 1,
      title: "Summer Vibes Mix 2024",
      artist: "DJ Mixer Pro",
      genre: "Deep House",
      duration: "45:32",
      plays: "125K",
      likes: "3.2K",
      uploadDate: "2024-01-15",
      status: "published",
      platforms: ["SoundCloud", "Mixcloud", "Spotify"],
      cover: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      title: "Deep House Sessions #12",
      artist: "DJ Mixer Pro",
      genre: "Deep House",
      duration: "38:15",
      plays: "89K",
      likes: "2.1K",
      uploadDate: "2024-01-10",
      status: "published",
      platforms: ["SoundCloud", "YouTube"],
      cover: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      title: "Techno Underground",
      artist: "DJ Mixer Pro",
      genre: "Techno",
      duration: "52:08",
      plays: "67K",
      likes: "1.8K",
      uploadDate: "2024-01-05",
      status: "draft",
      platforms: [],
      cover: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      title: "Chill Sunset Beats",
      artist: "DJ Mixer Pro",
      genre: "Ambient",
      duration: "33:45",
      plays: "45K",
      likes: "1.2K",
      uploadDate: "2023-12-28",
      status: "published",
      platforms: ["SoundCloud", "Mixcloud", "Spotify", "YouTube"],
      cover: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      title: "Progressive Trance Journey",
      artist: "DJ Mixer Pro",
      genre: "Trance",
      duration: "67:22",
      plays: "78K",
      likes: "2.5K",
      uploadDate: "2023-12-20",
      status: "published",
      platforms: ["SoundCloud", "Mixcloud"],
      cover: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      title: "Dubstep Madness",
      artist: "DJ Mixer Pro",
      genre: "Dubstep",
      duration: "41:18",
      plays: "92K",
      likes: "3.8K",
      uploadDate: "2023-12-15",
      status: "published",
      platforms: ["SoundCloud", "YouTube", "Spotify"],
      cover: "/placeholder.svg?height=200&width=200",
    },
  ]

  const playlists = [
    {
      id: 1,
      name: "Best of 2024",
      trackCount: 15,
      duration: "8h 32m",
      cover: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Deep House Collection",
      trackCount: 23,
      duration: "12h 45m",
      cover: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Live Sets",
      trackCount: 8,
      duration: "6h 18m",
      cover: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Collaborations",
      trackCount: 12,
      duration: "4h 56m",
      cover: "/placeholder.svg?height=150&width=150",
    },
  ]

  const handlePlayPause = (id: number) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id)
  }

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Music Library</h1>
              <p className="text-muted-foreground">Manage your tracks, mixes, and playlists</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Playlist
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 flex-1 min-w-64">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tracks, genres, or artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                <Select defaultValue="all-genres">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-genres">All Genres</SelectItem>
                    <SelectItem value="deep-house">Deep House</SelectItem>
                    <SelectItem value="techno">Techno</SelectItem>
                    <SelectItem value="trance">Trance</SelectItem>
                    <SelectItem value="dubstep">Dubstep</SelectItem>
                    <SelectItem value="ambient">Ambient</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1 border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="tracks" className="space-y-6">
            <TabsList>
              <TabsTrigger value="tracks">Tracks ({tracks.length})</TabsTrigger>
              <TabsTrigger value="playlists">Playlists ({playlists.length})</TabsTrigger>
              <TabsTrigger value="albums">Albums (3)</TabsTrigger>
            </TabsList>

            <TabsContent value="tracks" className="space-y-6">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTracks.map((track) => (
                    <Card key={track.id} className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <img
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                              size="icon"
                              onClick={() => handlePlayPause(track.id)}
                              className="h-12 w-12 rounded-full"
                            >
                              {currentlyPlaying === track.id ? (
                                <Pause className="h-6 w-6" />
                              ) : (
                                <Play className="h-6 w-6" />
                              )}
                            </Button>
                          </div>
                          <Badge
                            className="absolute top-2 right-2"
                            variant={track.status === "published" ? "default" : "secondary"}
                          >
                            {track.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold truncate">{track.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{track.genre}</Badge>
                            <span>{track.duration}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{track.plays} plays</span>
                            <span>{track.likes} likes</span>
                          </div>
                          <div className="flex items-center gap-1 pt-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {filteredTracks.map((track, index) => (
                        <div
                          key={track.id}
                          className="flex items-center gap-4 p-4 hover:bg-muted/50 border-b last:border-b-0"
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handlePlayPause(track.id)}
                            className="shrink-0"
                          >
                            {currentlyPlaying === track.id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>

                          <img
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            className="w-12 h-12 object-cover rounded"
                          />

                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{track.title}</h3>
                            <p className="text-sm text-muted-foreground">{track.artist}</p>
                          </div>

                          <Badge variant="outline" className="shrink-0">
                            {track.genre}
                          </Badge>

                          <div className="text-sm text-muted-foreground shrink-0 w-16 text-right">{track.duration}</div>

                          <div className="text-sm text-muted-foreground shrink-0 w-20 text-right">{track.plays}</div>

                          <Badge variant={track.status === "published" ? "default" : "secondary"} className="shrink-0">
                            {track.status}
                          </Badge>

                          <div className="flex items-center gap-1 shrink-0">
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="playlists" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {playlists.map((playlist) => (
                  <Card key={playlist.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={playlist.cover || "/placeholder.svg"}
                          alt={playlist.name}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button size="icon" className="h-12 w-12 rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold truncate">{playlist.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Music className="h-4 w-4" />
                          <span>{playlist.trackCount} tracks</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{playlist.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 pt-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="albums" className="space-y-6">
              <div className="text-center py-12">
                <Folder className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Albums Yet</h3>
                <p className="text-muted-foreground mb-4">Create your first album to organize your tracks</p>
                <Button>Create Album</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  )
}
