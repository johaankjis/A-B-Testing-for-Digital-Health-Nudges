"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function ExperimentFilters() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search experiments..." className="pl-9" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Cohort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cohorts</SelectItem>
          <SelectItem value="diabetes">Diabetes</SelectItem>
          <SelectItem value="hypertension">Hypertension</SelectItem>
          <SelectItem value="multi">Multi-condition</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
