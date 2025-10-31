"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Info, BarChart3 } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

const adherenceData = [
  { day: 0, treatment: 72, control: 72 },
  { day: 7, treatment: 73, control: 71 },
  { day: 14, treatment: 75, control: 70 },
  { day: 21, treatment: 77, control: 69 },
  { day: 30, treatment: 79, control: 68 },
]

const distributionData = [
  { range: "0-20%", treatment: 45, control: 78 },
  { range: "21-40%", treatment: 89, control: 112 },
  { range: "41-60%", treatment: 134, control: 156 },
  { range: "61-80%", treatment: 198, control: 189 },
  { range: "81-100%", treatment: 158, control: 88 },
]

const cohortData = [
  { cohort: "Age 18-35", treatment: 82, control: 71, lift: 11, pValue: 0.023 },
  { cohort: "Age 36-50", treatment: 79, control: 68, lift: 11, pValue: 0.031 },
  { cohort: "Age 51-65", treatment: 78, control: 67, lift: 11, pValue: 0.028 },
  { cohort: "Age 65+", treatment: 76, control: 66, lift: 10, pValue: 0.045 },
]

export function StatisticalAnalysis({ experimentId }: { experimentId: string }) {
  const stats = {
    treatment: {
      mean: 79.2,
      median: 80,
      sd: 12.4,
      n: 624,
    },
    control: {
      mean: 68.5,
      median: 69,
      sd: 13.1,
      n: 623,
    },
    difference: {
      absolute: 10.7,
      relative: 15.6,
      ci95: [8.2, 13.2],
    },
    tests: {
      tTest: {
        statistic: 4.23,
        pValue: 0.032,
        df: 1245,
      },
      chiSquare: {
        statistic: 18.45,
        pValue: 0.028,
      },
      mannWhitney: {
        statistic: 215430,
        pValue: 0.035,
      },
    },
    power: 0.82,
    effectSize: 0.85,
  }

  const isSignificant = stats.tests.tTest.pValue < 0.05

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Statistical Analysis</h2>
        <Badge variant="outline" className="gap-2">
          <BarChart3 className="h-3 w-3" />
          Live Analysis
        </Badge>
      </div>

      {/* Key Results */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Absolute Lift</p>
            <p className="text-3xl font-bold text-chart-1">+{stats.difference.absolute.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">
              95% CI: [{stats.difference.ci95[0]}, {stats.difference.ci95[1]}]
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Relative Lift</p>
            <p className="text-3xl font-bold text-chart-1">+{stats.difference.relative.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">vs. control baseline</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">P-Value</p>
            <p className="text-3xl font-bold text-foreground">{stats.tests.tTest.pValue.toFixed(3)}</p>
            <div className="flex items-center gap-1">
              {isSignificant ? (
                <>
                  <CheckCircle2 className="h-3 w-3 text-chart-1" />
                  <p className="text-xs text-chart-1">Significant</p>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 text-accent" />
                  <p className="text-xs text-accent">Not significant</p>
                </>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Effect Size (Cohen's d)</p>
            <p className="text-3xl font-bold text-foreground">{stats.effectSize.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Large effect</p>
          </div>
        </Card>
      </div>

      {/* Statistical Significance Card */}
      <Card className={`p-6 ${isSignificant ? "bg-chart-1/5 border-chart-1/20" : "bg-accent/5 border-accent/20"}`}>
        <div className="flex gap-4">
          {isSignificant ? (
            <CheckCircle2 className="h-6 w-6 text-chart-1 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
          )}
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {isSignificant ? "Statistically Significant Result" : "Result Not Yet Significant"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isSignificant
                ? `The treatment group shows a statistically significant improvement of ${stats.difference.absolute.toFixed(1)}% in medication adherence (p = ${stats.tests.tTest.pValue.toFixed(3)}, α = 0.05). The effect size (Cohen's d = ${stats.effectSize.toFixed(2)}) indicates a large practical significance. With ${(stats.power * 100).toFixed(0)}% statistical power, we can confidently reject the null hypothesis.`
                : `The current results show a ${stats.difference.absolute.toFixed(1)}% improvement, but the p-value (${stats.tests.tTest.pValue.toFixed(3)}) does not yet meet the significance threshold (α = 0.05). Continue monitoring as more data accumulates.`}
            </p>
          </div>
        </div>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends Over Time</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="tests">Statistical Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">MPR Trends Over Time</h3>
                <p className="text-sm text-muted-foreground">
                  Daily medication possession ratio for treatment vs. control groups
                </p>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={adherenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    label={{ value: "Days Since Start", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[60, 85]}
                    label={{ value: "MPR (%)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="control"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    name="Control"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="treatment"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    name="Treatment"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Treatment Group</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Mean</p>
                      <p className="font-semibold text-foreground">{stats.treatment.mean}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Median</p>
                      <p className="font-semibold text-foreground">{stats.treatment.median}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SD</p>
                      <p className="font-semibold text-foreground">{stats.treatment.sd}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Control Group</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Mean</p>
                      <p className="font-semibold text-foreground">{stats.control.mean}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Median</p>
                      <p className="font-semibold text-foreground">{stats.control.median}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SD</p>
                      <p className="font-semibold text-foreground">{stats.control.sd}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">MPR Distribution</h3>
                <p className="text-sm text-muted-foreground">Participant distribution across adherence ranges</p>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    label={{ value: "Participants", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="control" fill="hsl(var(--muted-foreground))" name="Control" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="treatment" fill="hsl(var(--chart-1))" name="Treatment" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <Card className="p-4 bg-accent/5 border-accent/20">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Distribution Insights</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The treatment group shows a rightward shift in the distribution, with more participants achieving
                      81-100% adherence (158 vs 88) and fewer in the 0-20% range (45 vs 78).
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Cohort Analysis</h3>
                <p className="text-sm text-muted-foreground">Treatment effect across demographic subgroups</p>
              </div>

              <div className="space-y-3">
                {cohortData.map((cohort) => (
                  <div key={cohort.cohort} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{cohort.cohort}</h4>
                      <Badge
                        variant="secondary"
                        className={
                          cohort.pValue < 0.05
                            ? "bg-chart-1/10 text-chart-1 border-chart-1/20"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        p = {cohort.pValue.toFixed(3)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Treatment</p>
                        <p className="font-semibold text-foreground">{cohort.treatment}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Control</p>
                        <p className="font-semibold text-foreground">{cohort.control}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lift</p>
                        <p className="font-semibold text-chart-1">+{cohort.lift}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="font-semibold text-foreground">
                          {cohort.pValue < 0.05 ? "Significant" : "Not sig."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="p-4 bg-chart-1/5 border-chart-1/20">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-chart-1 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Consistent Effect</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The treatment effect is consistent across all age cohorts (10-11% lift), with all subgroups
                      showing statistical significance. This suggests the intervention is broadly effective.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Independent T-Test</h3>
                  <p className="text-xs text-muted-foreground">Parametric test for mean differences</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Test Statistic (t)</span>
                    <span className="font-semibold text-foreground">{stats.tests.tTest.statistic.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Degrees of Freedom</span>
                    <span className="font-semibold text-foreground">{stats.tests.tTest.df}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">P-Value</span>
                    <span className="font-semibold text-chart-1">{stats.tests.tTest.pValue.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Result</span>
                    <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                      Significant
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Chi-Square Test</h3>
                  <p className="text-xs text-muted-foreground">Test for categorical associations</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Test Statistic (χ²)</span>
                    <span className="font-semibold text-foreground">{stats.tests.chiSquare.statistic.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Degrees of Freedom</span>
                    <span className="font-semibold text-foreground">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">P-Value</span>
                    <span className="font-semibold text-chart-1">{stats.tests.chiSquare.pValue.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Result</span>
                    <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                      Significant
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Mann-Whitney U Test</h3>
                  <p className="text-xs text-muted-foreground">Non-parametric alternative to t-test</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Test Statistic (U)</span>
                    <span className="font-semibold text-foreground">{stats.tests.mannWhitney.statistic}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sample Size</span>
                    <span className="font-semibold text-foreground">n₁ = 624, n₂ = 623</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">P-Value</span>
                    <span className="font-semibold text-chart-1">{stats.tests.mannWhitney.pValue.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Result</span>
                    <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                      Significant
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Effect Size & Power</h3>
                  <p className="text-xs text-muted-foreground">Practical significance measures</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cohen's d</span>
                    <span className="font-semibold text-foreground">{stats.effectSize.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Interpretation</span>
                    <span className="font-semibold text-foreground">Large Effect</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Statistical Power</span>
                    <span className="font-semibold text-chart-1">{(stats.power * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Assessment</span>
                    <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                      Well-Powered
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-4 bg-accent/5 border-accent/20">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Statistical Robustness</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All three statistical tests (parametric t-test, chi-square, and non-parametric Mann-Whitney) confirm
                  significant differences between groups, providing robust evidence for the treatment effect.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
