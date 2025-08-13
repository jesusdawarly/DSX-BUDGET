"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: React.ReactNode
  description?: string
}

export function StatCard({ title, value, change, changeType, icon, description }: StatCardProps) {
  return (
    <Card className="border-2 hover:border-[#ccff00] transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-[#222222]">{value}</p>
            {description && <p className="text-xs text-gray-500">{description}</p>}
          </div>
          <div className="w-12 h-12 bg-[#ccff00] rounded-lg flex items-center justify-center">{icon}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div
            className={`flex items-center space-x-1 ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}
          >
            {changeType === "positive" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span className="text-sm font-medium">{change}</span>
          </div>
          <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  stats: Array<{
    title: string
    value: string
    change: string
    changeType: "positive" | "negative"
    icon: React.ReactNode
    description?: string
  }>
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
