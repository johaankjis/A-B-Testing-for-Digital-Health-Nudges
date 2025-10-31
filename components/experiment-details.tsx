import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Pause, StopCircle } from "lucide-react"

export function ExperimentDetails({ experimentId }: { experimentId: string }) {
  // Mock data - in real app would fetch based on experimentId
  const experiment = {
    name: "SMS Refill Reminders - Diabetes Cohort",
    status: "active",
    hypothesis:
      "Personalized SMS reminders sent 24 hours before refill due date will increase MPR by at least 9% compared to standard reminders",
    cohort: "Type 2 Diabetes",
    startDate: "October 1, 2025",
    endDate: "November 30, 2025",
    duration: 60,
    daysElapsed: 30,
    participants: {
      treatment: 624,
      control: 623,
      total: 1247,
    },
    intervention: "SMS - Personalized Timing",
    control: "Standard Care",
  }

  const progress = (experiment.daysElapsed / experiment.duration) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground text-balance">{experiment.name}</h1>
            <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
              {experiment.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Experiment ID: EXP-{experimentId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Pause className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <StopCircle className="h-4 w-4" />
          </Button>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Research Hypothesis</h3>
              <p className="text-sm text-foreground leading-relaxed">{experiment.hypothesis}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Treatment Group</p>
                <p className="text-sm font-semibold text-foreground">{experiment.intervention}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Control Group</p>
                <p className="text-sm font-semibold text-foreground">{experiment.control}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Target Cohort</p>
                <p className="text-sm font-semibold text-foreground">{experiment.cohort}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Randomization</p>
                <p className="text-sm font-semibold text-foreground">50/50 Split</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <h3 className="text-sm font-medium">Timeline</h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="text-sm font-semibold text-foreground">{experiment.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">End Date</p>
                <p className="text-sm font-semibold text-foreground">{experiment.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Progress</p>
                <div className="space-y-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Day {experiment.daysElapsed} of {experiment.duration} ({progress.toFixed(0)}%)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Users className="h-4 w-4" />
                <h3 className="text-sm font-medium">Participants</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Treatment</span>
                  <span className="font-semibold text-foreground">{experiment.participants.treatment}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Control</span>
                  <span className="font-semibold text-foreground">{experiment.participants.control}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground font-medium">Total</span>
                  <span className="font-bold text-foreground">{experiment.participants.total}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
