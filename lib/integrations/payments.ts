"use client"

interface PaymentIntent {
  id: string
  client_secret: string
  amount: number
  currency: string
  status: string
}

export class PaymentIntegration {
  static async createTipPayment(djId: string, amount: number, message?: string): Promise<PaymentIntent> {
    const response = await fetch("/api/payments/tip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dj_id: djId,
        amount: amount * 100, // Convert to cents
        message,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create tip payment")
    }

    return response.json()
  }

  static async createMerchandisePayment(
    items: { id: string; quantity: number; price: number }[],
  ): Promise<PaymentIntent> {
    const response = await fetch("/api/payments/merchandise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })

    if (!response.ok) {
      throw new Error("Failed to create merchandise payment")
    }

    return response.json()
  }

  static async createEventTicketPayment(eventId: string, quantity: number): Promise<PaymentIntent> {
    const response = await fetch("/api/payments/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        quantity,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create ticket payment")
    }

    return response.json()
  }
}
