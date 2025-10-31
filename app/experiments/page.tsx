import { DashboardHeader } from "@/components/dashboard-header"
import { ExperimentList } from "@/components/experiment-list"
import { ExperimentFilters } from "@/components/experiment-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground text-balance">Experiments</h1>
              <p className="text-muted-foreground mt-2">Design, manage, and monitor your A/B tests</p>
            </div>
            <Link href="/experiments/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Experiment
              </Button>
            </Link>
          </div>
          <ExperimentFilters />
          <ExperimentList />
        </div>
      </main>
    </div>
  )
}
