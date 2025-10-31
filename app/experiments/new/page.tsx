import { DashboardHeader } from "@/components/dashboard-header"
import { ExperimentDesigner } from "@/components/experiment-designer"

export default function NewExperimentPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground text-balance">Create New Experiment</h1>
            <p className="text-muted-foreground mt-2">
              Design your A/B test with statistical rigor and behavioral science principles
            </p>
          </div>
          <ExperimentDesigner />
        </div>
      </main>
    </div>
  )
}
