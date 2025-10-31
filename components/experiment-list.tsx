import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, TrendingUp, MoreVertical } from "lucide-react"
import Link from "next/link"

const allExperiments = [
  {
    id: 1,
    name: "SMS Refill Reminders - Diabetes Cohort",
    status: "active",
    cohort: "Type 2 Diabetes",
    participants: 1247,
    startDate: "Oct 1, 2025",
    endDate: "Nov 30, 2025",
    currentLift: "+9.4%",
    pValue: "0.032",
  },
  {
    id: 2,
    name: "App Push Notifications - Hypertension",
    status: "active",
    cohort: "Hypertension",
    participants: 892,
    startDate: "Oct 15, 2025",
    endDate: "Jan 13, 2026",
    currentLift: "+7.8%",
    pValue: "0.089",
  },
  {
    id: 3,
    name: "Personalized Timing - Multi-condition",
    status: "active",
    cohort: "Multi-condition",
    participants: 708,
    startDate: "Oct 20, 2025",
    endDate: "Dec 19, 2025",
    currentLift: "+11.2%",
    pValue: "0.018",
  },
  {
    id: 4,
    name: "Email Reminders - Hyperlipidemia",
    status: "completed",
    cohort: "Hyperlipidemia",
    participants: 1050,
    startDate: "Aug 1, 2025",
    endDate: "Sep 30, 2025",
    currentLift: "+6.5%",
    pValue: "0.045",
  },
  {
    id: 5,
    name: "Gamification - Diabetes Youth",
    status: "draft",
    cohort: "Type 2 Diabetes",
    participants: 0,
    startDate: "Not started",
    endDate: "TBD",
    currentLift: "—",
    pValue: "—",
  },
]

export function ExperimentList() {
  return (
    <div className="space-y-4">
      {allExperiments.map((experiment) => (
        <Card key={experiment.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <Link href={`/experiments/${experiment.id}`}>
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                    {experiment.name}
                  </h3>
                </Link>
                <Badge
                  variant="secondary"
                  className={
                    experiment.status === "active"
                      ? "bg-chart-1/10 text-chart-1 border-chart-1/20"
                      : experiment.status === "completed"
                        ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                        : "bg-muted text-muted-foreground"
                  }
                >
                  {experiment.status}
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {experiment.participants > 0 ? experiment.participants.toLocaleString() : "No"} participants
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {experiment.startDate} → {experiment.endDate}
                  </span>
                </div>
                <div className="px-2 py-1 rounded bg-muted text-xs font-medium">{experiment.cohort}</div>
              </div>

              {experiment.status !== "draft" && (
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Lift</p>
                    <p className="text-lg font-bold text-chart-1">{experiment.currentLift}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">P-Value</p>
                    <p className="text-lg font-semibold text-foreground">{experiment.pValue}</p>
                  </div>
                  {experiment.status === "active" && (
                    <div className="flex items-center gap-2 text-sm text-chart-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Trending positive</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
