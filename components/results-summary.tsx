"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Award, DollarSign } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const performanceData = [
  { quarter: "Q1 2025", experiments: 4, significant: 3, avgLift: 8.2 },
  { quarter: "Q2 2025", experiments: 5, significant: 4, avgLift: 9.1 },
  { quarter: "Q3 2025", experiments: 6, significant: 5, avgLift: 10.3 },
  { quarter: "Q4 2025", experiments: 3, significant: 3, avgLift: 11.5 },
]

export function ResultsSummary() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Experiments</p>
              <p className="text-3xl font-bold text-foreground">18</p>
              <p className="text-xs text-chart-1">+3 this quarter</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Significant Results</p>
              <p className="text-3xl font-bold text-foreground">15</p>
              <p className="text-xs text-muted-foreground">83% success rate</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <Award className="h-5 w-5 text-chart-1" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Avg. MPR Improvement</p>
              <p className="text-3xl font-bold text-foreground">9.8%</p>
              <p className="text-xs text-chart-1">Across all experiments</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Cost Savings</p>
              <p className="text-3xl font-bold text-foreground">$2.4M</p>
              <p className="text-xs text-muted-foreground">Annual projection</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quarterly Performance</h3>
            <p className="text-sm text-muted-foreground">Experiment volume and average lift over time</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="significant" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Significant Results" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
