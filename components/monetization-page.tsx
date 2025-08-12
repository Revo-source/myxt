"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Users, Music, Star, Calendar, ArrowUpRight, Wallet, Target, Gift } from "lucide-react"

export function MonetizationPage() {
  const revenueStreams = [
    {
      name: "Paid Submissions",
      amount: "$1,250",
      change: "+23%",
      icon: Music,
      color: "text-green-600",
    },
    {
      name: "Premium Features",
      amount: "$890",
      change: "+15%",
      icon: Star,
      color: "text-purple-600",
    },
    {
      name: "Live Stream Tips",
      amount: "$650",
      change: "+8%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      name: "Merchandise",
      amount: "$450",
      change: "+12%",
      icon: Gift,
      color: "text-orange-600",
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "Paid Submission",
      artist: "Luna Beats",
      amount: "$25",
      date: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "Premium Upgrade",
      artist: "Neon Pulse",
      amount: "$50",
      date: "5 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "Live Stream Tip",
      artist: "Anonymous",
      amount: "$10",
      date: "1 day ago",
      status: "completed",
    },
    {
      id: 4,
      type: "Paid Submission",
      artist: "Cosmic Waves",
      amount: "$25",
      date: "2 days ago",
      status: "pending",
    },
  ]

  const goals = [
    {
      title: "Monthly Revenue Goal",
      current: 3240,
      target: 5000,
      percentage: 65,
    },
    {
      title: "Paid Submissions",
      current: 50,
      target: 75,
      percentage: 67,
    },
    {
      title: "Premium Subscribers",
      current: 18,
      target: 30,
      percentage: 60,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monetization</h1>
          <p className="text-muted-foreground">Track your earnings and manage revenue streams</p>
        </div>
        <Button className="gap-2">
          <Wallet className="h-4 w-4" />
          Withdraw Earnings
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStreams.map((stream, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stream.name}</CardTitle>
              <stream.icon className={`h-4 w-4 ${stream.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stream.amount}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stream.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Paid Submissions</TabsTrigger>
          <TabsTrigger value="premium">Premium Features</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Revenue Goals
                </CardTitle>
                <CardDescription>Track your progress towards monthly targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{goal.title}</span>
                      <span className="text-sm text-muted-foreground">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={goal.percentage} />
                    <p className="text-xs text-muted-foreground">{goal.percentage}% complete</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your latest earnings and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.artist} • {transaction.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{transaction.amount}</p>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Summary
              </CardTitle>
              <CardDescription>Your earnings breakdown for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$3,240</div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+23.1%</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">127</div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+15.2%</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$25.51</div>
                  <p className="text-sm text-muted-foreground">Avg. Transaction</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+8.7%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paid Submission Settings</CardTitle>
              <CardDescription>Configure your paid submission options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Paid Submissions</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow artists to pay for guaranteed playlist consideration
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basic-fee">Basic Submission Fee</Label>
                  <Input id="basic-fee" type="number" defaultValue="25" />
                  <p className="text-xs text-muted-foreground">Standard fee for track consideration</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premium-fee">Premium Submission Fee</Label>
                  <Input id="premium-fee" type="number" defaultValue="50" />
                  <p className="text-xs text-muted-foreground">Priority review with feedback</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payout-threshold">Minimum Payout Threshold</Label>
                <Input id="payout-threshold" type="number" defaultValue="100" />
                <p className="text-xs text-muted-foreground">Minimum amount before payout is available</p>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Statistics</CardTitle>
              <CardDescription>Performance metrics for your paid submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-sm text-muted-foreground">Total Submissions</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">$1,250</div>
                  <p className="text-sm text-muted-foreground">Revenue Generated</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">23%</div>
                  <p className="text-sm text-muted-foreground">Approval Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">$9.84</div>
                  <p className="text-sm text-muted-foreground">Avg. Per Submission</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Premium Features</CardTitle>
              <CardDescription>Offer premium services to your audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Exclusive Content Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Premium subscribers get early access to new tracks
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Ad-Free Experience</Label>
                      <p className="text-sm text-muted-foreground">Remove ads for premium subscribers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">High-Quality Downloads</Label>
                      <p className="text-sm text-muted-foreground">Offer lossless audio downloads</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="premium-price">Monthly Premium Price</Label>
                    <Input id="premium-price" type="number" defaultValue="9.99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annual-price">Annual Premium Price</Label>
                    <Input id="annual-price" type="number" defaultValue="99.99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trial-days">Free Trial Days</Label>
                    <Input id="trial-days" type="number" defaultValue="14" />
                  </div>
                </div>
              </div>
              <Button>Update Premium Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Premium Subscribers</CardTitle>
              <CardDescription>Manage your premium subscriber base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-sm text-muted-foreground">Active Subscribers</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">$179.82</div>
                  <p className="text-sm text-muted-foreground">Monthly Recurring</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Recent Subscribers</h4>
                {[
                  { name: "Alex Johnson", plan: "Monthly", joined: "2 days ago" },
                  { name: "Sarah Chen", plan: "Annual", joined: "1 week ago" },
                  { name: "Mike Rodriguez", plan: "Monthly", joined: "2 weeks ago" },
                ].map((subscriber, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{subscriber.name}</p>
                      <p className="text-sm text-muted-foreground">{subscriber.joined}</p>
                    </div>
                    <Badge variant="outline">{subscriber.plan}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>Configure how you receive your earnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payout-method">Payout Method</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                      <option>Stripe</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payout-email">PayPal Email</Label>
                    <Input id="payout-email" type="email" defaultValue="dj@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payout-frequency">Payout Frequency</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Current Balance</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">$3,240.50</div>
                    <p className="text-sm text-muted-foreground">Available for withdrawal</p>
                    <Button className="w-full mt-4">Request Payout</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Track your previous payouts and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Dec 1, 2024", amount: "$2,850.00", status: "Completed", method: "PayPal" },
                  { date: "Nov 1, 2024", amount: "$2,340.50", status: "Completed", method: "PayPal" },
                  { date: "Oct 1, 2024", amount: "$1,920.75", status: "Completed", method: "Bank Transfer" },
                  { date: "Sep 1, 2024", amount: "$2,150.25", status: "Completed", method: "PayPal" },
                ].map((payout, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{payout.date}</p>
                      <p className="text-sm text-muted-foreground">{payout.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{payout.amount}</p>
                      <Badge variant="default" className="text-xs">
                        {payout.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
