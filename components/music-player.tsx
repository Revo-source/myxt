"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Repeat, Shuffle, Maximize2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Track {
  id: string
  title: string
  artist: string
  audio_url: string
  cover_image_url?: string
  duration?: number
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([0])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setProgress([(audio.currentTime / audio.duration) * 100])
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress([0])
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrack])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error("Error playing audio:", error)
    }
  }

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const newTime = (value[0] / 100) * duration
    audio.currentTime = newTime
    setProgress(value)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = value[0] / 100
    setVolume(value)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack({
        id: "demo",
        title: "Summer Vibes Mix 2024",
        artist: "DJ Mixer Pro",
        audio_url: "/placeholder-audio.mp3", // This would be a real audio URL
      })
    }
  }, [currentTrack])

  return (
    <>
      <audio ref={audioRef} src={currentTrack?.audio_url} preload="metadata" />

      <Card className="border-t rounded-none border-x-0 border-b-0">
        <div className="flex items-center justify-between p-4">
          {/* Track Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
              {currentTrack?.cover_image_url ? (
                <img
                  src={currentTrack.cover_image_url || "/placeholder.svg"}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <Play className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-medium truncate">{currentTrack?.title || "No track selected"}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentTrack?.artist || "Unknown artist"}</p>
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
              <Button size="icon" onClick={togglePlayPause} className="h-10 w-10" disabled={!currentTrack}>
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
              <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
              <Slider value={progress} onValueChange={handleProgressChange} max={100} step={0.1} className="flex-1" />
              <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume & Actions */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Volume2 className="h-4 w-4" />
            <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="w-24" />
            <Button size="icon" variant="ghost">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
