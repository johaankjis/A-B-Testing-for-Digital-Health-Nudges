import { DashboardHeader } from "@/components/dashboard-header"
import { ExperimentOverview } from "@/components/experiment-overview"
import { MetricsGrid } from "@/components/metrics-grid"
import { ActiveExperiments } from "@/components/active-experiments"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <ExperimentOverview />
        <MetricsGrid />
        <ActiveExperiments />
      </main>
    </div>
  )
}
