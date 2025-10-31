"use client"

import { Card } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const adherenceData = [
  { day: "Day 1", control: 72, treatment: 73 },
  { day: "Day 7", control: 71, treatment: 75 },
  { day: "Day 14", control: 70, treatment: 77 },
  { day: "Day 21", control: 69, treatment: 78 },
  { day: "Day 30", control: 68, treatment: 79 },
  { day: "Day 45", control: 67, treatment: 80 },
  { day: "Day 60", control: 66, treatment: 81 },
]

const engagementData = [
  { week: "Week 1", sms: 89, app: 76 },
  { week: "Week 2", sms: 87, app: 78 },
  { week: "Week 3", sms: 86, app: 80 },
  { week: "Week 4", sms: 85, app: 82 },
  { week: "Week 6", sms: 84, app: 83 },
  { week: "Week 8", sms: 83, app: 85 },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Medication Possession Ratio (MPR)</h3>
            <p className="text-sm text-muted-foreground">Treatment vs Control over 60 days</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={adherenceData}>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 85]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="control"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                dot={false}
              />
              <Line type="monotone" dataKey="treatment" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Treatment: 81%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Control: 66%</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Engagement Rate by Channel</h3>
            <p className="text-sm text-muted-foreground">SMS vs App notifications</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[70, 95]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="sms" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="app" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">SMS: 83%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">App: 85%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
