import { DashboardHeader } from "@/components/dashboard-header"
import { ResultsSummary } from "@/components/results-summary"
import { CompletedExperiments } from "@/components/completed-experiments"

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Results & Reporting</h1>
            <p className="text-muted-foreground mt-2">Comprehensive analysis and insights from completed experiments</p>
          </div>
          <ResultsSummary />
          <CompletedExperiments />
        </div>
      </main>
    </div>
  )
}
