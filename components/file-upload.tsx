"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X, File, Music, ImageIcon, Video } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onUpload?: (file: { url: string; filename: string; size: number; type: string }) => void
  accept?: string
  maxSize?: number // in MB
  uploadType?: "audio" | "image" | "video"
  className?: string
}

export default function FileUpload({ onUpload, accept, maxSize = 50, uploadType, className }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    setError(null)
    setIsUploading(true)
    setUploadProgress(0)

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      setIsUploading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", file)
      if (uploadType) {
        formData.append("type", uploadType)
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()
      onUpload?.(result)
    } catch (error) {
      console.error("Upload error:", error)
      setError(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const getIcon = () => {
    switch (uploadType) {
      case "audio":
        return <Music className="h-8 w-8" />
      case "image":
        return <ImageIcon className="h-8 w-8" />
      case "video":
        return <Video className="h-8 w-8" />
      default:
        return <File className="h-8 w-8" />
    }
  }

  const getAcceptedTypes = () => {
    switch (uploadType) {
      case "audio":
        return "audio/*"
      case "image":
        return "image/*"
      case "video":
        return "video/*"
      default:
        return accept || "*/*"
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-600 hover:border-gray-500",
          isUploading && "pointer-events-none opacity-50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={getAcceptedTypes()}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="text-gray-400">{getIcon()}</div>

          {isUploading ? (
            <div className="w-full max-w-xs space-y-2">
              <p className="text-sm text-gray-300">Uploading...</p>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-gray-400">{uploadProgress}%</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-lg font-medium text-white">
                  Drop your {uploadType || "file"} here, or{" "}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    browse
                  </button>
                </p>
                <p className="text-sm text-gray-400">Maximum file size: {maxSize}MB</p>
              </div>

              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center justify-between">
          <p className="text-red-400 text-sm">{error}</p>
          <Button onClick={() => setError(null)} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
