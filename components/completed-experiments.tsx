"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, FileText, Share2, ChevronDown, ChevronUp, TrendingUp } from "lucide-react"
import Link from "next/link"

const completedExperiments = [
  {
    id: 4,
    name: "Email Reminders - Hyperlipidemia",
    cohort: "Hyperlipidemia",
    startDate: "Aug 1, 2025",
    endDate: "Sep 30, 2025",
    participants: 1050,
    result: {
      lift: 6.5,
      pValue: 0.045,
      significant: true,
      baseline: 71,
      treatment: 77.5,
    },
    insights: [
      "Email reminders showed moderate effectiveness for hyperlipidemia patients",
      "Engagement rates were lower than SMS (67% vs 83%)",
      "Cost per participant was significantly lower ($2.50 vs $8.00)",
    ],
    recommendations: [
      "Consider email as cost-effective option for budget-constrained programs",
      "Combine with SMS for high-risk patients",
      "Test personalized subject lines to improve open rates",
    ],
  },
  {
    id: 5,
    name: "Multi-channel Approach - Hypertension",
    cohort: "Hypertension",
    startDate: "Jul 1, 2025",
    endDate: "Aug 30, 2025",
    participants: 980,
    result: {
      lift: 12.3,
      pValue: 0.012,
      significant: true,
      baseline: 68,
      treatment: 80.3,
    },
    insights: [
      "Combining SMS and app notifications yielded highest lift to date",
      "Patients engaged with both channels showed 18% improvement",
      "App usage increased by 45% when paired with SMS reminders",
    ],
    recommendations: [
      "Implement multi-channel as standard for hypertension cohort",
      "Develop smart routing based on patient preferences",
      "Monitor for notification fatigue with A/B testing",
    ],
  },
  {
    id: 6,
    name: "Behavioral Nudges - Diabetes Youth",
    cohort: "Type 2 Diabetes (Age 18-35)",
    startDate: "Jun 1, 2025",
    endDate: "Jul 30, 2025",
    participants: 650,
    result: {
      lift: 14.8,
      pValue: 0.008,
      significant: true,
      baseline: 65,
      treatment: 79.8,
    },
    insights: [
      "Gamification elements resonated strongly with younger cohort",
      "Social comparison features drove 22% increase in engagement",
      "Streak tracking led to sustained behavior change",
    ],
    recommendations: [
      "Expand gamification to other age groups with modifications",
      "Add team-based challenges for social support",
      "Integrate with wearable devices for real-time feedback",
    ],
  },
]

export function CompletedExperiments() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Completed Experiments</h2>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      <div className="space-y-4">
        {completedExperiments.map((experiment) => (
          <Card key={experiment.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <Link href={`/experiments/${experiment.id}`}>
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                        {experiment.name}
                      </h3>
                    </Link>
                    <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                      Completed
                    </Badge>
                    {experiment.result.significant && (
                      <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20 gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Significant
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>{experiment.cohort}</span>
                    <span>•</span>
                    <span>
                      {experiment.startDate} → {experiment.endDate}
                    </span>
                    <span>•</span>
                    <span>{experiment.participants} participants</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === experiment.id ? null : experiment.id)}
                  className="gap-2"
                >
                  {expandedId === experiment.id ? (
                    <>
                      Hide Details
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Details
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground mb-1">Baseline MPR</p>
                  <p className="text-2xl font-bold text-foreground">{experiment.result.baseline}%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground mb-1">Treatment MPR</p>
                  <p className="text-2xl font-bold text-foreground">{experiment.result.treatment}%</p>
                </div>
                <div className="p-4 rounded-lg bg-chart-1/10">
                  <p className="text-xs text-muted-foreground mb-1">Absolute Lift</p>
                  <p className="text-2xl font-bold text-chart-1">+{experiment.result.lift}%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground mb-1">P-Value</p>
                  <p className="text-2xl font-bold text-foreground">{experiment.result.pValue.toFixed(3)}</p>
                </div>
              </div>
            </div>

            {expandedId === experiment.id && (
              <div className="border-t border-border bg-muted/30 p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Key Insights
                    </h4>
                    <ul className="space-y-2">
                      {experiment.insights.map((insight, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                          <span className="text-chart-1 flex-shrink-0">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {experiment.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                          <span className="text-accent flex-shrink-0">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    Share Results
                  </Button>
                  <Link href={`/experiments/${experiment.id}`}>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <FileText className="h-4 w-4" />
                      Full Analysis
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
