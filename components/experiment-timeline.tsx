import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock } from "lucide-react"

export function ExperimentTimeline({ experimentId }: { experimentId: string }) {
  const events = [
    {
      date: "Oct 1, 2025",
      title: "Experiment Launched",
      description: "Randomization completed, first participants enrolled",
      status: "completed",
    },
    {
      date: "Oct 8, 2025",
      title: "First Interim Analysis",
      description: "Initial data review, no safety concerns identified",
      status: "completed",
    },
    {
      date: "Oct 15, 2025",
      title: "50% Enrollment Milestone",
      description: "Reached 623 participants, trending positive",
      status: "completed",
    },
    {
      date: "Oct 22, 2025",
      title: "Statistical Significance Achieved",
      description: "P-value crossed significance threshold (p < 0.05)",
      status: "completed",
    },
    {
      date: "Oct 31, 2025",
      title: "Current Status",
      description: "Day 30 of 60, all metrics tracking well",
      status: "current",
    },
    {
      date: "Nov 15, 2025",
      title: "Final Interim Analysis",
      description: "Scheduled data review before completion",
      status: "upcoming",
    },
    {
      date: "Nov 30, 2025",
      title: "Experiment Completion",
      description: "Final data collection and analysis",
      status: "upcoming",
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Experiment Timeline</h2>
          <p className="text-sm text-muted-foreground mt-1">Key milestones and events</p>
        </div>

        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    event.status === "completed"
                      ? "bg-chart-1 text-white"
                      : event.status === "current"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {event.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : event.status === "current" ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                {idx < events.length - 1 && (
                  <div className="flex-1 w-0.5 bg-border my-2" style={{ minHeight: "40px" }} />
                )}
              </div>

              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  {event.status === "current" && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{event.date}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
