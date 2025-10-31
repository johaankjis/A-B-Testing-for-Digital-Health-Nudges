"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"

export function ExperimentDesigner() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    hypothesis: "",
    cohort: "",
    intervention: "",
    control: "",
    primaryMetric: "",
    secondaryMetrics: [] as string[],
    sampleSize: "",
    duration: "",
    splitRatio: "50/50",
  })

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepComplete = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return formData.name && formData.hypothesis && formData.cohort
      case 2:
        return formData.intervention && formData.control
      case 3:
        return formData.primaryMetric && formData.sampleSize && formData.duration
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Setup" },
            { num: 2, label: "Design" },
            { num: 3, label: "Metrics" },
            { num: 4, label: "Review" },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                    step === s.num
                      ? "bg-primary text-primary-foreground"
                      : isStepComplete(s.num)
                        ? "bg-chart-1 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isStepComplete(s.num) && step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                </div>
                <span className={`text-sm font-medium ${step === s.num ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
              {idx < 3 && <div className="flex-1 h-0.5 bg-border mx-4" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Experiment Setup</h2>
              <p className="text-muted-foreground">Define the basic parameters of your A/B test</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Experiment Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., SMS Refill Reminders - Diabetes Cohort"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hypothesis">Research Hypothesis</Label>
                <Textarea
                  id="hypothesis"
                  placeholder="e.g., Personalized SMS reminders sent 24 hours before refill due date will increase MPR by at least 9% compared to standard reminders"
                  rows={4}
                  value={formData.hypothesis}
                  onChange={(e) => updateField("hypothesis", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  State your expected outcome and minimum detectable effect
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cohort">Target Cohort</Label>
                <Select value={formData.cohort} onValueChange={(value) => updateField("cohort", value)}>
                  <SelectTrigger id="cohort">
                    <SelectValue placeholder="Select patient cohort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diabetes">Type 2 Diabetes</SelectItem>
                    <SelectItem value="hypertension">Hypertension</SelectItem>
                    <SelectItem value="hyperlipidemia">Hyperlipidemia</SelectItem>
                    <SelectItem value="multi-condition">Multi-condition</SelectItem>
                    <SelectItem value="all">All Chronic Conditions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="p-4 bg-accent/5 border-accent/20">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Cohort Selection Tips</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Choose cohorts with sufficient baseline adherence data (≥90 days) and similar demographic
                      characteristics to ensure valid comparisons
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Intervention Design</h2>
              <p className="text-muted-foreground">Define treatment and control conditions</p>
            </div>

            <Tabs defaultValue="treatment" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="treatment">Treatment Group</TabsTrigger>
                <TabsTrigger value="control">Control Group</TabsTrigger>
              </TabsList>

              <TabsContent value="treatment" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="intervention">Intervention Type</Label>
                  <Select value={formData.intervention} onValueChange={(value) => updateField("intervention", value)}>
                    <SelectTrigger id="intervention">
                      <SelectValue placeholder="Select intervention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms-personalized">SMS - Personalized Timing</SelectItem>
                      <SelectItem value="sms-standard">SMS - Standard Reminders</SelectItem>
                      <SelectItem value="app-push">App Push Notifications</SelectItem>
                      <SelectItem value="email">Email Reminders</SelectItem>
                      <SelectItem value="multi-channel">Multi-channel (SMS + App)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Message Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="every-other">Every Other Day</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="pre-refill">Pre-refill Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Behavioral Nudge Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Social Proof", "Loss Aversion", "Goal Setting", "Gamification", "Peer Comparison"].map(
                      (nudge) => (
                        <Badge key={nudge} variant="outline" className="cursor-pointer hover:bg-primary/10">
                          {nudge}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="control" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="control">Control Condition</Label>
                  <Select value={formData.control} onValueChange={(value) => updateField("control", value)}>
                    <SelectTrigger id="control">
                      <SelectValue placeholder="Select control" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard-care">Standard Care (No Intervention)</SelectItem>
                      <SelectItem value="generic-reminder">Generic Reminders</SelectItem>
                      <SelectItem value="existing-program">Existing Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="p-4 bg-muted/50">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Control Group Details</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The control group will receive standard care without the experimental intervention. This
                      establishes the baseline for comparison.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label>Randomization Split</Label>
              <Select value={formData.splitRatio} onValueChange={(value) => updateField("splitRatio", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50/50">50/50 (Equal Split)</SelectItem>
                  <SelectItem value="60/40">60/40 (Treatment Favored)</SelectItem>
                  <SelectItem value="70/30">70/30 (Treatment Favored)</SelectItem>
                  <SelectItem value="80/20">80/20 (Treatment Favored)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Metrics & Sample Size</h2>
              <p className="text-muted-foreground">Define success metrics and statistical parameters</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryMetric">Primary Outcome Metric</Label>
                <Select value={formData.primaryMetric} onValueChange={(value) => updateField("primaryMetric", value)}>
                  <SelectTrigger id="primaryMetric">
                    <SelectValue placeholder="Select primary metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpr">Medication Possession Ratio (MPR)</SelectItem>
                    <SelectItem value="pdc">Proportion of Days Covered (PDC)</SelectItem>
                    <SelectItem value="refill-rate">Refill Rate</SelectItem>
                    <SelectItem value="gap-days">Gap Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Secondary Metrics (Optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {["Engagement Rate", "Message Open Rate", "App Usage", "Clinical Outcomes", "Cost Savings"].map(
                    (metric) => (
                      <Badge key={metric} variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {metric}
                      </Badge>
                    ),
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sampleSize">Sample Size (per group)</Label>
                  <Input
                    id="sampleSize"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.sampleSize}
                    onChange={(e) => updateField("sampleSize", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 60"
                    value={formData.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                  />
                </div>
              </div>

              <Card className="p-4 bg-chart-1/5 border-chart-1/20">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-chart-1 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Statistical Power Analysis</p>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Minimum Detectable Effect</p>
                        <p className="font-semibold text-foreground">9.0%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Statistical Power</p>
                        <p className="font-semibold text-foreground">80%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Significance Level</p>
                        <p className="font-semibold text-foreground">α = 0.05</p>
                      </div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-xs text-chart-1">
                      Run Power Analysis Calculator →
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Review & Launch</h2>
              <p className="text-muted-foreground">Verify your experiment configuration before launching</p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Experiment Overview</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">{formData.name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cohort</p>
                    <p className="font-medium text-foreground">{formData.cohort || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Intervention</p>
                    <p className="font-medium text-foreground">{formData.intervention || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Control</p>
                    <p className="font-medium text-foreground">{formData.control || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Primary Metric</p>
                    <p className="font-medium text-foreground">{formData.primaryMetric || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sample Size</p>
                    <p className="font-medium text-foreground">
                      {formData.sampleSize ? `${formData.sampleSize} per group` : "Not set"}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Hypothesis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {formData.hypothesis || "No hypothesis defined"}
                </p>
              </Card>

              <Card className="p-4 bg-chart-1/5 border-chart-1/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-chart-1 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Pre-launch Checklist</p>
                    <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                      <li>✓ IRB approval obtained</li>
                      <li>✓ Patient consent process verified</li>
                      <li>✓ Data collection systems tested</li>
                      <li>✓ Randomization algorithm validated</li>
                      <li>✓ Statistical analysis plan documented</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            Previous
          </Button>
          <div className="flex gap-3">
            <Button variant="ghost">Save as Draft</Button>
            {step < 4 ? (
              <Button onClick={() => setStep(Math.min(4, step + 1))} disabled={!isStepComplete(step)}>
                Continue
              </Button>
            ) : (
              <Button className="bg-chart-1 hover:bg-chart-1/90">Launch Experiment</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
