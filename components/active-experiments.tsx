import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.6667 2.66667H3.33334C2.59696 2.66667 2.00001 3.26362 2.00001 4V13.3333C2.00001 14.0697 2.59696 14.6667 3.33334 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6667 1.33334V4.00001M5.33334 1.33334V4.00001M2.00001 6.66667H14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.3333 14V12.6667C11.3333 11.9594 11.0524 11.2811 10.5523 10.781C10.0522 10.281 9.37392 10 8.66667 10H3.33333C2.62609 10 1.94781 10.281 1.44772 10.781C0.947633 11.2811 0.666672 11.9594 0.666672 12.6667V14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.99999 7.33333C7.47275 7.33333 8.66666 6.13943 8.66666 4.66667C8.66666 3.19391 7.47275 2 5.99999 2C4.52723 2 3.33333 3.19391 3.33333 4.66667C3.33333 6.13943 4.52723 7.33333 5.99999 7.33333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3333 14V12.6667C15.3329 12.0758 15.1363 11.5019 14.7743 11.0349C14.4123 10.5679 13.9055 10.2344 13.3333 10.0867"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6667 2.08667C11.2403 2.23354 11.7487 2.56714 12.1118 3.03487C12.4748 3.5026 12.6719 4.07789 12.6719 4.67C12.6719 5.26212 12.4748 5.83741 12.1118 6.30514C11.7487 6.77287 11.2403 7.10647 10.6667 7.25334"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const experiments = [
  {
    id: 1,
    name: "SMS Refill Reminders - Diabetes Cohort",
    status: "active",
    participants: 1247,
    startDate: "Oct 1, 2025",
    duration: "60 days",
    currentLift: "+9.4%",
    pValue: "0.032",
    power: "82%",
  },
  {
    id: 2,
    name: "App Push Notifications - Hypertension",
    status: "active",
    participants: 892,
    startDate: "Oct 15, 2025",
    duration: "90 days",
    currentLift: "+7.8%",
    pValue: "0.089",
    power: "80%",
  },
  {
    id: 3,
    name: "Personalized Timing - Multi-condition",
    status: "active",
    participants: 708,
    startDate: "Oct 20, 2025",
    duration: "60 days",
    currentLift: "+11.2%",
    pValue: "0.018",
    power: "85%",
  },
]

export function ActiveExperiments() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Active Experiments</h2>
        <Link href="/experiments">
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {experiments.map((experiment) => (
          <Card key={experiment.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{experiment.name}</h3>
                  <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                    {experiment.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UsersIcon />
                    <span>{experiment.participants.toLocaleString()} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <span>
                      {experiment.startDate} • {experiment.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Lift</p>
                    <p className="text-lg font-bold text-chart-1">{experiment.currentLift}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">P-Value</p>
                    <p className="text-lg font-semibold text-foreground">{experiment.pValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Statistical Power</p>
                    <p className="text-lg font-semibold text-foreground">{experiment.power}</p>
                  </div>
                </div>
              </div>
              <Link href={`/experiments/${experiment.id}`}>
                <Button variant="outline" className="gap-2 bg-transparent">
                  View Details
                  <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
