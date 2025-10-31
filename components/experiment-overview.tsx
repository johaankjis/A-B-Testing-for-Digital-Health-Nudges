import { Card } from "@/components/ui/card"

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.3334 5.83334L11.6667 12.5L8.33341 9.16667L1.66675 15.8333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 5.83334H18.3333V10.8333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8334 12.5H4.16675C3.28269 12.5 2.43484 12.8512 1.80972 13.4763C1.1846 14.1014 0.833415 14.9493 0.833415 15.8333V17.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.49992 9.16667C9.34087 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34087 2.5 7.49992 2.5C5.65897 2.5 4.16659 3.99238 4.16659 5.83333C4.16659 7.67428 5.65897 9.16667 7.49992 9.16667Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.1667 17.5V15.8333C19.1662 15.0948 18.9204 14.3773 18.4679 13.7936C18.0154 13.2099 17.3819 12.793 16.6667 12.6083"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 2.60834C14.0503 2.79192 14.6858 3.20892 15.1397 3.79359C15.5935 4.37827 15.8398 5.09736 15.8398 5.8375C15.8398 6.57765 15.5935 7.29674 15.1397 7.88141C14.6858 8.46609 14.0503 8.88309 13.3333 9.06667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14.1667C12.3012 14.1667 14.1667 12.3012 14.1667 10C14.1667 7.69882 12.3012 5.83334 10 5.83334C7.69882 5.83334 5.83334 7.69882 5.83334 10C5.83334 12.3012 7.69882 14.1667 10 14.1667Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 11.6667C10.9205 11.6667 11.6667 10.9205 11.6667 10C11.6667 9.07953 10.9205 8.33334 10 8.33334C9.07953 8.33334 8.33334 9.07953 8.33334 10C8.33334 10.9205 9.07953 11.6667 10 11.6667Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DollarSignIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.66667V18.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M14.1667 4.16667H7.91675C7.14312 4.16667 6.40125 4.47396 5.85427 5.02094C5.30729 5.56792 5.00008 6.30978 5.00008 7.08334C5.00008 7.8569 5.30729 8.59876 5.85427 9.14574C6.40125 9.69272 7.14312 10 7.91675 10H12.0834C12.8571 10 13.5989 10.3072 14.1459 10.8542C14.6929 11.4012 15.0001 12.143 15.0001 12.9167C15.0001 13.6903 14.6929 14.4321 14.1459 14.9791C13.5989 15.5261 12.8571 15.8333 12.0834 15.8333H5.00008"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function ExperimentOverview() {
  const stats = [
    {
      label: "Active Experiments",
      value: "3",
      change: "+1 this month",
      icon: TargetIcon,
      trend: "up",
    },
    {
      label: "Total Participants",
      value: "2,847",
      change: "+12% from last month",
      icon: UsersIcon,
      trend: "up",
    },
    {
      label: "Avg. MPR Lift",
      value: "9.2%",
      change: "Target: 9.0%",
      icon: TrendingUpIcon,
      trend: "up",
    },
    {
      label: "Projected Savings",
      value: "$500K",
      change: "Annual estimate",
      icon: DollarSignIcon,
      trend: "neutral",
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground text-balance">Digital Health Nudges Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor A/B testing experiments for medication adherence improvement
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs ${stat.trend === "up" ? "text-chart-1" : "text-muted-foreground"}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
