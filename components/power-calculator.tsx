"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Calculator, TrendingUp, Info } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export function PowerCalculator() {
  const [calculationType, setCalculationType] = useState<"sample-size" | "power">("sample-size")
  const [baselineRate, setBaselineRate] = useState(70)
  const [effectSize, setEffectSize] = useState(9)
  const [alpha, setAlpha] = useState(0.05)
  const [power, setPower] = useState(0.8)
  const [sampleSize, setSampleSize] = useState(500)
  const [splitRatio, setSplitRatio] = useState(50)

  // Calculate sample size using simplified formula
  const calculateSampleSize = () => {
    const z_alpha = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645
    const z_beta = power === 0.8 ? 0.84 : power === 0.9 ? 1.28 : 0.52

    const p1 = baselineRate / 100
    const p2 = (baselineRate + effectSize) / 100
    const p_avg = (p1 + p2) / 2

    const numerator = Math.pow(z_alpha + z_beta, 2) * 2 * p_avg * (1 - p_avg)
    const denominator = Math.pow(p2 - p1, 2)

    return Math.ceil(numerator / denominator)
  }

  // Calculate power given sample size
  const calculatePower = () => {
    const z_alpha = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645
    const p1 = baselineRate / 100
    const p2 = (baselineRate + effectSize) / 100
    const p_avg = (p1 + p2) / 2

    const effect = Math.abs(p2 - p1)
    const se = Math.sqrt((2 * p_avg * (1 - p_avg)) / sampleSize)
    const z_beta = effect / se - z_alpha

    // Convert z-score to power (simplified)
    let calculatedPower = 0.5 + z_beta / 3
    calculatedPower = Math.max(0.05, Math.min(0.99, calculatedPower))

    return calculatedPower
  }

  const [result, setResult] = useState<number>(0)

  useEffect(() => {
    if (calculationType === "sample-size") {
      setResult(calculateSampleSize())
    } else {
      setResult(calculatePower())
    }
  }, [calculationType, baselineRate, effectSize, alpha, power, sampleSize, splitRatio])

  // Generate sensitivity analysis data
  const generateSensitivityData = () => {
    const data = []
    for (let effect = 3; effect <= 15; effect += 1) {
      const p1 = baselineRate / 100
      const p2 = (baselineRate + effect) / 100
      const p_avg = (p1 + p2) / 2
      const z_alpha = 1.96
      const z_beta = 0.84

      const numerator = Math.pow(z_alpha + z_beta, 2) * 2 * p_avg * (1 - p_avg)
      const denominator = Math.pow(p2 - p1, 2)
      const n = Math.ceil(numerator / denominator)

      data.push({
        effect: `${effect}%`,
        sampleSize: n,
      })
    }
    return data
  }

  const generatePowerCurve = () => {
    const data = []
    for (let n = 200; n <= 1000; n += 100) {
      const p1 = baselineRate / 100
      const p2 = (baselineRate + effectSize) / 100
      const p_avg = (p1 + p2) / 2
      const effect = Math.abs(p2 - p1)
      const se = Math.sqrt((2 * p_avg * (1 - p_avg)) / n)
      const z_beta = effect / se - 1.96
      let pow = 0.5 + z_beta / 3
      pow = Math.max(0.05, Math.min(0.99, pow))

      data.push({
        n: n.toString(),
        power: (pow * 100).toFixed(1),
      })
    }
    return data
  }

  return (
    <div className="space-y-6">
      <Tabs value={calculationType} onValueChange={(v) => setCalculationType(v as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sample-size">Calculate Sample Size</TabsTrigger>
          <TabsTrigger value="power">Calculate Power</TabsTrigger>
        </TabsList>

        <TabsContent value="sample-size" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Parameters */}
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Input Parameters</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="baseline">Baseline Adherence Rate (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="baseline"
                      value={[baselineRate]}
                      onValueChange={(v) => setBaselineRate(v[0])}
                      min={40}
                      max={90}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={baselineRate}
                      onChange={(e) => setBaselineRate(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Current MPR in control group</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="effect">Minimum Detectable Effect (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="effect"
                      value={[effectSize]}
                      onValueChange={(v) => setEffectSize(v[0])}
                      min={3}
                      max={20}
                      step={0.5}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={effectSize}
                      onChange={(e) => setEffectSize(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Expected improvement in treatment group</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alpha">Significance Level (α)</Label>
                  <Select value={alpha.toString()} onValueChange={(v) => setAlpha(Number(v))}>
                    <SelectTrigger id="alpha">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.05">0.05 (95% confidence)</SelectItem>
                      <SelectItem value="0.01">0.01 (99% confidence)</SelectItem>
                      <SelectItem value="0.1">0.10 (90% confidence)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Probability of Type I error (false positive)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="power-input">Statistical Power (1-β)</Label>
                  <Select value={power.toString()} onValueChange={(v) => setPower(Number(v))}>
                    <SelectTrigger id="power-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.8">0.80 (80% power)</SelectItem>
                      <SelectItem value="0.9">0.90 (90% power)</SelectItem>
                      <SelectItem value="0.7">0.70 (70% power)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Probability of detecting true effect</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="split">Treatment/Control Split (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="split"
                      value={[splitRatio]}
                      onValueChange={(v) => setSplitRatio(v[0])}
                      min={30}
                      max={70}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-foreground w-20">
                      {splitRatio}/{100 - splitRatio}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Required Sample Size</h3>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Total Participants Needed</p>
                  <p className="text-5xl font-bold text-primary">{result.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.ceil(result * (splitRatio / 100))} treatment, {Math.ceil(result * ((100 - splitRatio) / 100))}{" "}
                    control
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Expected Lift</p>
                    <p className="text-2xl font-bold text-foreground">
                      {baselineRate}% → {baselineRate + effectSize}%
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Effect Size (Cohen's h)</p>
                    <p className="text-2xl font-bold text-foreground">
                      {(
                        2 *
                        (Math.asin(Math.sqrt((baselineRate + effectSize) / 100)) -
                          Math.asin(Math.sqrt(baselineRate / 100)))
                      ).toFixed(3)}
                    </p>
                  </div>
                </div>

                <Card className="p-4 bg-chart-1/5 border-chart-1/20">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-chart-1 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Interpretation</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        With {result.toLocaleString()} participants, you have {(power * 100).toFixed(0)}% probability of
                        detecting a {effectSize}% improvement if it truly exists, with {((1 - alpha) * 100).toFixed(0)}%
                        confidence.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-accent/5 border-accent/20">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Recommendations</p>
                      <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                        <li>• Add 10-15% buffer for potential dropouts</li>
                        <li>• Consider stratification by baseline adherence</li>
                        <li>• Plan interim analyses at 50% enrollment</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>

          {/* Sensitivity Analysis */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Sensitivity Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Sample size requirements across different effect sizes (baseline: {baselineRate}%, power:{" "}
                {(power * 100).toFixed(0)}%)
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={generateSensitivityData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="effect" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="sampleSize" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="power" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Parameters */}
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Input Parameters</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sample-input">Sample Size (per group)</Label>
                  <Input
                    id="sample-input"
                    type="number"
                    value={sampleSize}
                    onChange={(e) => setSampleSize(Number(e.target.value))}
                    min={50}
                    max={5000}
                  />
                  <p className="text-xs text-muted-foreground">Number of participants in each group</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baseline-power">Baseline Adherence Rate (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="baseline-power"
                      value={[baselineRate]}
                      onValueChange={(v) => setBaselineRate(v[0])}
                      min={40}
                      max={90}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={baselineRate}
                      onChange={(e) => setBaselineRate(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="effect-power">Expected Effect Size (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="effect-power"
                      value={[effectSize]}
                      onValueChange={(v) => setEffectSize(v[0])}
                      min={3}
                      max={20}
                      step={0.5}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={effectSize}
                      onChange={(e) => setEffectSize(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alpha-power">Significance Level (α)</Label>
                  <Select value={alpha.toString()} onValueChange={(v) => setAlpha(Number(v))}>
                    <SelectTrigger id="alpha-power">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.05">0.05 (95% confidence)</SelectItem>
                      <SelectItem value="0.01">0.01 (99% confidence)</SelectItem>
                      <SelectItem value="0.1">0.10 (90% confidence)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Statistical Power</h3>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Calculated Power (1-β)</p>
                  <p className="text-5xl font-bold text-primary">{(result * 100).toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground mt-2">Probability of detecting {effectSize}% effect</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Type II Error (β)</p>
                    <p className="text-2xl font-bold text-foreground">{((1 - result) * 100).toFixed(1)}%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Total Sample</p>
                    <p className="text-2xl font-bold text-foreground">{(sampleSize * 2).toLocaleString()}</p>
                  </div>
                </div>

                <Card
                  className={`p-4 ${
                    result >= 0.8
                      ? "bg-chart-1/5 border-chart-1/20"
                      : result >= 0.7
                        ? "bg-accent/5 border-accent/20"
                        : "bg-destructive/5 border-destructive/20"
                  }`}
                >
                  <div className="flex gap-3">
                    <Info
                      className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        result >= 0.8 ? "text-chart-1" : result >= 0.7 ? "text-accent" : "text-destructive"
                      }`}
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Assessment</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {result >= 0.8
                          ? "Excellent power! Your experiment has sufficient sample size to reliably detect the expected effect."
                          : result >= 0.7
                            ? "Moderate power. Consider increasing sample size for more reliable results."
                            : "Low power. Significantly increase sample size or adjust effect size expectations."}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>

          {/* Power Curve */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Power Curve</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Statistical power across different sample sizes (effect: {effectSize}%, α: {alpha})
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generatePowerCurve()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="n"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    label={{ value: "Sample Size per Group", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 100]}
                    label={{ value: "Power (%)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="power" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
