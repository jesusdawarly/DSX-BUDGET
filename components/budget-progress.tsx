"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface BudgetItem {
  id: string
  department: string
  budget: number
  spent: number
  percentage: number
  status: "healthy" | "warning" | "critical"
  lastUpdated: string
}

interface BudgetProgressProps {
  budgets: BudgetItem[]
  title?: string
  showDetails?: boolean
}

export function BudgetProgress({
  budgets,
  title = "Ejecución Presupuestaria",
  showDetails = true,
}: BudgetProgressProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-[#ccff00]"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#222222]">{title}</CardTitle>
            <CardDescription>Progreso por departamento</CardDescription>
          </div>
          {showDetails && (
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Detalles
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgets.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-[#222222]">{item.department}</span>
                  {getStatusIcon(item.status)}
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-[#222222]">{item.percentage}%</span>
                  <p className="text-xs text-gray-500">
                    {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />
              </div>

              {showDetails && (
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Actualizado {item.lastUpdated}</span>
                  <Badge
                    variant="secondary"
                    className={`${
                      item.status === "healthy"
                        ? "bg-green-100 text-green-800"
                        : item.status === "warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status === "healthy" ? "Saludable" : item.status === "warning" ? "Atención" : "Crítico"}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
