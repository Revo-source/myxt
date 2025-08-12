"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, Twitter, Facebook, Instagram, MessageCircle, Copy, Check } from "lucide-react"
import { SocialMediaIntegration } from "@/lib/integrations/social-media"

interface SocialShareProps {
  type: "track" | "profile" | "stream"
  id: string
  title: string
  description?: string
  imageUrl?: string
  className?: string
}

export function SocialShare({ type, id, title, description, imageUrl, className }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = SocialMediaIntegration.generateShareableLink(type, id)

  const handleShare = (platform: string) => {
    const shareText = `Check out this ${type}: ${title}`

    switch (platform) {
      case "twitter":
        SocialMediaIntegration.shareToTwitter(shareText, shareUrl, ["DJ", "Music", "Electronic"])
        break
      case "facebook":
        SocialMediaIntegration.shareToFacebook(shareUrl)
        break
      case "instagram":
        if (imageUrl) {
          SocialMediaIntegration.shareToInstagram(imageUrl)
        }
        break
      case "whatsapp":
        SocialMediaIntegration.shareToWhatsApp(shareText, shareUrl)
        break
      case "telegram":
        SocialMediaIntegration.shareToTelegram(shareText, shareUrl)
        break
      case "copy":
        SocialMediaIntegration.copyToClipboard(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
          <Twitter className="h-4 w-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
          <Facebook className="h-4 w-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        {imageUrl && (
          <DropdownMenuItem onClick={() => handleShare("instagram")} className="cursor-pointer">
            <Instagram className="h-4 w-4 mr-2" />
            Share on Instagram
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
          <MessageCircle className="h-4 w-4 mr-2" />
          Share on WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("telegram")} className="cursor-pointer">
          <MessageCircle className="h-4 w-4 mr-2" />
          Share on Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("copy")} className="cursor-pointer">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SocialShareCard({ type, id, title, description, imageUrl }: SocialShareProps) {
  const shareUrl = SocialMediaIntegration.generateShareableLink(type, id)

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-2">Share this {type}</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button variant="outline" size="sm" onClick={() => SocialMediaIntegration.copyToClipboard(shareUrl)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => SocialMediaIntegration.shareToTwitter(`Check out: ${title}`, shareUrl)}
            >
              <Twitter className="h-4 w-4 mr-1" />
              Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={() => SocialMediaIntegration.shareToFacebook(shareUrl)}>
              <Facebook className="h-4 w-4 mr-1" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => SocialMediaIntegration.shareToWhatsApp(`Check out: ${title}`, shareUrl)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
