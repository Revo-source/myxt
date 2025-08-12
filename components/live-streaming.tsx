"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Radio, MessageCircle, Settings, Camera, Mic, MicOff, CameraOff, Share2, Eye } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LiveStreaming() {
  const [isLive, setIsLive] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)

  const platforms = [
    { name: "Twitch", connected: true, viewers: 1200, status: "live" },
    { name: "YouTube", connected: true, viewers: 850, status: "live" },
    { name: "Facebook", connected: false, viewers: 0, status: "offline" },
    { name: "Instagram", connected: true, viewers: 320, status: "live" },
  ]

  const chatMessages = [
    { user: "MusicLover23", message: "This beat is fire! 🔥", time: "2m ago" },
    { user: "DJFan", message: "Can you play some techno next?", time: "3m ago" },
    { user: "BeatDropper", message: "Amazing mix as always!", time: "5m ago" },
    { user: "VibeSeeker", message: "Where can I download this set?", time: "7m ago" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Streaming</h1>
          <p className="text-muted-foreground">Connect with your audience in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          {isLive && <Badge className="animate-pulse">🔴 LIVE</Badge>}
          <Button onClick={() => setIsLive(!isLive)} variant={isLive ? "destructive" : "default"} className="gap-2">
            <Radio className="h-4 w-4" />
            {isLive ? "End Stream" : "Go Live"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Preview & Controls */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stream Preview</CardTitle>
            <CardDescription>Your live stream as viewers see it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Preview */}
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Stream Preview</p>
                  <p className="text-sm opacity-75">Your camera feed will appear here</p>
                </div>
              </div>

              {/* Stream Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {isLive && <Badge className="bg-red-600 text-white animate-pulse">🔴 LIVE</Badge>}
                <Badge variant="secondary">
                  <Eye className="h-3 w-3 mr-1" />
                  {viewers.toLocaleString()} viewers
                </Badge>
              </div>

              {/* Stream Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                <Button
                  size="icon"
                  variant={micEnabled ? "secondary" : "destructive"}
                  onClick={() => setMicEnabled(!micEnabled)}
                >
                  {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant={cameraEnabled ? "secondary" : "destructive"}
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                >
                  {cameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="secondary">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stream Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stream-title">Stream Title</Label>
                <Input
                  id="stream-title"
                  placeholder="Enter your stream title"
                  defaultValue="Deep House Sessions - Live DJ Set"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stream-description">Description</Label>
                <Textarea
                  id="stream-description"
                  placeholder="Tell viewers what to expect..."
                  rows={3}
                  defaultValue="Join me for an hour of deep house vibes! Taking requests in chat."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Status & Chat */}
        <div className="space-y-6">
          {/* Platform Status */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Status</CardTitle>
              <CardDescription>Multi-platform streaming status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        platform.status === "live" ? "bg-red-500 animate-pulse" : "bg-gray-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-xs text-muted-foreground">{platform.viewers.toLocaleString()} viewers</p>
                    </div>
                  </div>
                  <Switch checked={platform.connected} />
                </div>
              ))}

              <Alert>
                <Radio className="h-4 w-4" />
                <AlertDescription>
                  Streaming to {platforms.filter((p) => p.connected).length} platforms simultaneously
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Live Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {msg.user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Input placeholder="Reply to chat..." className="flex-1" />
                <Button size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stream Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Stream Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Viewers</span>
                <span className="font-bold">2,370</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Peak Viewers</span>
                <span className="font-bold">2,850</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Stream Duration</span>
                <span className="font-bold">1h 23m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Chat Messages</span>
                <span className="font-bold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">New Followers</span>
                <span className="font-bold text-green-600">+89</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
