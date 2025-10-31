import { DashboardHeader } from "@/components/dashboard-header"
import { PowerCalculator } from "@/components/power-calculator"

export default function PowerAnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground text-balance">Statistical Power Analysis</h1>
            <p className="text-muted-foreground mt-2">
              Calculate required sample sizes and evaluate statistical power for your experiments
            </p>
          </div>
          <PowerCalculator />
        </div>
      </main>
    </div>
  )
}
