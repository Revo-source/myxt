"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Repeat, Shuffle, Maximize2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([30])

  return (
    <Card className="border-t rounded-none border-x-0 border-b-0">
      <div className="flex items-center justify-between p-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <Play className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="font-medium truncate">Summer Vibes Mix 2024</h4>
            <p className="text-sm text-muted-foreground truncate">DJ Mixer Pro</p>
          </div>
          <Button size="icon" variant="ghost">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={() => setIsPlaying(!isPlaying)} className="h-10 w-10">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button size="icon" variant="ghost">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground">2:34</span>
            <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="flex-1" />
            <span className="text-xs text-muted-foreground">8:45</span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="h-4 w-4" />
          <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-24" />
          <Button size="icon" variant="ghost">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
