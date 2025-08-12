"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Check, Cloud, Music } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import FileUpload from "@/components/file-upload"

export function UploadContent() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [trackData, setTrackData] = useState({
    title: "",
    genre: "",
    description: "",
    tags: "",
    audioUrl: "",
    coverImageUrl: "",
    isPublic: true,
    isDownloadable: false,
    price: 0,
  })

  const platforms = [
    { id: "soundcloud", name: "SoundCloud", icon: "🎵" },
    { id: "mixcloud", name: "Mixcloud", icon: "🎧" },
    { id: "spotify", name: "Spotify", icon: "🎶" },
    { id: "youtube", name: "YouTube", icon: "📺" },
    { id: "facebook", name: "Facebook", icon: "📘" },
    { id: "twitch", name: "Twitch", icon: "🎮" },
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handleAudioUpload = (file: { url: string; filename: string; size: number; type: string }) => {
    setTrackData((prev) => ({ ...prev, audioUrl: file.url }))
  }

  const handleCoverUpload = (file: { url: string; filename: string; size: number; type: string }) => {
    setTrackData((prev) => ({ ...prev, coverImageUrl: file.url }))
  }

  const handleUpload = async () => {
    if (!trackData.title || !trackData.audioUrl) {
      alert("Please provide a title and audio file")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...trackData,
          tags: trackData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      })

      clearInterval(progressInterval)

      if (response.ok) {
        setUploadProgress(100)
        setTrackData({
          title: "",
          genre: "",
          description: "",
          tags: "",
          audioUrl: "",
          coverImageUrl: "",
          isPublic: true,
          isDownloadable: false,
          price: 0,
        })
      } else {
        throw new Error("Failed to create track")
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upload Content</h1>
          <p className="text-muted-foreground">Share your music with the world</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload Details</CardTitle>
            <CardDescription>Add your track information and select distribution platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Audio File Upload */}
            <div className="space-y-2">
              <Label>Audio File</Label>
              <FileUpload onUpload={handleAudioUpload} accept="audio/*" maxSize={500} uploadType="audio" />
              {trackData.audioUrl && (
                <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                  <Music className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Audio file uploaded successfully</span>
                </div>
              )}
            </div>

            {/* Track Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Track Title</Label>
                <Input
                  id="title"
                  value={trackData.title}
                  onChange={(e) => setTrackData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter track title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select
                  value={trackData.genre}
                  onValueChange={(value) => setTrackData((prev) => ({ ...prev, genre: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Techno">Techno</SelectItem>
                    <SelectItem value="Trance">Trance</SelectItem>
                    <SelectItem value="Dubstep">Dubstep</SelectItem>
                    <SelectItem value="Ambient">Ambient</SelectItem>
                    <SelectItem value="Deep House">Deep House</SelectItem>
                    <SelectItem value="Progressive">Progressive</SelectItem>
                    <SelectItem value="Electronic">Electronic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={trackData.description}
                onChange={(e) => setTrackData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your track, mix, or set..."
                rows={4}
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={trackData.tags}
                onChange={(e) => setTrackData((prev) => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas (e.g., electronic, dance, remix)"
              />
            </div>

            {/* Cover Art */}
            <div className="space-y-2">
              <Label>Cover Art</Label>
              <FileUpload onUpload={handleCoverUpload} accept="image/*" maxSize={10} uploadType="image" />
              {trackData.coverImageUrl && (
                <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                  <ImageIcon className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Cover art uploaded successfully</span>
                </div>
              )}
            </div>

            {/* Platform Distribution */}
            <div className="space-y-4">
              <Label>Distribution Platforms</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                    />
                    <Label htmlFor={platform.id} className="flex items-center gap-2 cursor-pointer">
                      <span>{platform.icon}</span>
                      {platform.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Upload Progress</Label>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleUpload}
                disabled={isUploading || !trackData.title || !trackData.audioUrl}
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <Cloud className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload & Distribute
                  </>
                )}
              </Button>
              <Button variant="outline">Save Draft</Button>
            </div>
          </CardContent>
        </Card>

        {/* Upload Tips & Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">High Quality Audio</p>
                  <p className="text-sm text-muted-foreground">Use 320kbps MP3 or lossless formats</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Engaging Titles</p>
                  <p className="text-sm text-muted-foreground">Use descriptive, searchable titles</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Eye-catching Art</p>
                  <p className="text-sm text-muted-foreground">1400x1400px minimum resolution</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Deep House Mix #15", status: "processing", platforms: 3 },
                { title: "Techno Underground", status: "live", platforms: 4 },
                { title: "Chill Vibes Session", status: "failed", platforms: 2 },
              ].map((upload, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{upload.title}</p>
                    <p className="text-xs text-muted-foreground">{upload.platforms} platforms</p>
                  </div>
                  <Badge
                    variant={
                      upload.status === "live"
                        ? "default"
                        : upload.status === "processing"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {uploadProgress === 100 && (
            <Alert>
              <Check className="h-4 w-4" />
              <AlertDescription>
                Upload completed successfully! Your content is now being distributed to selected platforms.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
