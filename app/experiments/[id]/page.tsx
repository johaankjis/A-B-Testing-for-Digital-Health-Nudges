import { DashboardHeader } from "@/components/dashboard-header"
import { ExperimentDetails } from "@/components/experiment-details"
import { StatisticalAnalysis } from "@/components/statistical-analysis"
import { ExperimentTimeline } from "@/components/experiment-timeline"

export default function ExperimentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <ExperimentDetails experimentId={params.id} />
          <StatisticalAnalysis experimentId={params.id} />
          <ExperimentTimeline experimentId={params.id} />
        </div>
      </main>
    </div>
  )
}
