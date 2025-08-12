"use client"

export class SocialMediaIntegration {
  static shareToTwitter(text: string, url: string, hashtags: string[] = []) {
    const params = new URLSearchParams({
      text: text,
      url: url,
      hashtags: hashtags.join(","),
    })

    window.open(`https://twitter.com/intent/tweet?${params.toString()}`, "_blank", "width=600,height=400")
  }

  static shareToFacebook(url: string) {
    const params = new URLSearchParams({
      u: url,
    })

    window.open(`https://www.facebook.com/sharer/sharer.php?${params.toString()}`, "_blank", "width=600,height=400")
  }

  static shareToInstagram(imageUrl: string) {
    // Instagram doesn't have a direct share API, so we copy the image URL
    navigator.clipboard.writeText(imageUrl)
    alert("Image URL copied to clipboard! You can now paste it in Instagram.")
  }

  static shareToTikTok(videoUrl: string, description: string) {
    // TikTok doesn't have a direct share API for external content
    const text = `${description} ${videoUrl}`
    navigator.clipboard.writeText(text)
    alert("Content copied to clipboard! You can now paste it in TikTok.")
  }

  static shareToWhatsApp(text: string, url: string) {
    const message = `${text} ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank")
  }

  static shareToTelegram(text: string, url: string) {
    const params = new URLSearchParams({
      text: `${text} ${url}`,
    })

    window.open(`https://t.me/share/url?${params.toString()}`, "_blank", "width=600,height=400")
  }

  static copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    return true
  }

  static generateShareableLink(type: "track" | "profile" | "stream", id: string): string {
    const baseUrl = window.location.origin
    switch (type) {
      case "track":
        return `${baseUrl}/track/${id}`
      case "profile":
        return `${baseUrl}/dj/${id}`
      case "stream":
        return `${baseUrl}/live?stream=${id}`
      default:
        return baseUrl
    }
  }
}
