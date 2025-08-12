"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign, CreditCard } from "lucide-react"
import { PaymentIntegration } from "@/lib/integrations/payments"

interface TipPaymentProps {
  djId: string
  djName: string
  className?: string
}

export function TipPayment({ djId, djName, className }: TipPaymentProps) {
  const [amount, setAmount] = useState<number>(5)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const presetAmounts = [1, 5, 10, 25, 50, 100]

  const handleTip = async () => {
    if (amount < 1) return

    try {
      setLoading(true)
      const paymentIntent = await PaymentIntegration.createTipPayment(djId, amount, message)

      // In a real app, you would integrate with Stripe Elements here
      // For now, we'll just show a success message
      alert(`Tip of $${amount} sent to ${djName}!`)
    } catch (error) {
      console.error("Tip failed:", error)
      alert("Failed to send tip. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Send a Tip to {djName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Amount</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {presetAmounts.map((preset) => (
              <Badge
                key={preset}
                variant={amount === preset ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setAmount(preset)}
              >
                ${preset}
              </Badge>
            ))}
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1"
              max="1000"
              className="pl-10"
              placeholder="Custom amount"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Message (optional)</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message for the DJ..."
            maxLength={200}
            rows={3}
          />
        </div>

        <Button onClick={handleTip} disabled={loading || amount < 1} className="w-full">
          <CreditCard className="h-4 w-4 mr-2" />
          {loading ? "Processing..." : `Send $${amount} Tip`}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Secure payment powered by Stripe. Your support helps DJs create amazing music.
        </p>
      </CardContent>
    </Card>
  )
}
