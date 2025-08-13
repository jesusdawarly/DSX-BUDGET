"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { BudgetService, type Budget } from "@/lib/budget-data"
import {
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function BudgetsPage() {
  return (
    <ProtectedRoute requiredPermission="budgets">
      <DashboardLayout currentPage="budgets">
        <BudgetsContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function BudgetsContent() {
  const { user, canAccess } = useAuth()
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBudgets(BudgetService.getBudgets())
      setIsLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: Budget["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      case "archived":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Budget["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "draft":
        return <Clock className="h-4 w-4" />
      case "closed":
        return <AlertTriangle className="h-4 w-4" />
      case "archived":
        return <Calendar className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
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

  const filteredBudgets = budgets.filter((budget) => {
    const matchesSearch =
      budget.name.toLowerCase().includes(searchTerm.toLowerCase()) || budget.year.toString().includes(searchTerm)
    const matchesFilter = filterStatus === "all" || budget.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleCreateBudget = () => {
    window.location.href = "/dashboard/budgets/new"
  }

  const handleEditBudget = (budgetId: string) => {
    window.location.href = `/dashboard/budgets/${budgetId}/edit`
  }

  const handleViewBudget = (budgetId: string) => {
    window.location.href = `/dashboard/budgets/${budgetId}`
  }

  const handleDeleteBudget = (budgetId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este presupuesto?")) {
      BudgetService.deleteBudget(budgetId)
      setBudgets(BudgetService.getBudgets())
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando presupuestos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Gestión de Presupuestos</h1>
          <p className="text-gray-600 mt-1">Administra y controla todos los presupuestos de {user?.company}</p>
        </div>
        {canAccess("budgets") && (
          <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]" onClick={handleCreateBudget}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Presupuesto
          </Button>
        )}
      </div>

      {/* Filters and Search */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar presupuestos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="draft">Borradores</option>
                <option value="closed">Cerrados</option>
                <option value="archived">Archivados</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Presupuestos</p>
                <p className="text-2xl font-bold text-[#222222]">{budgets.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presupuesto Activo</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {formatCurrency(budgets.find((b) => b.status === "active")?.totalBudget || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ejecutado</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {formatCurrency(budgets.find((b) => b.status === "active")?.totalSpent || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponible</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {formatCurrency(budgets.find((b) => b.status === "active")?.totalAvailable || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budgets List */}
      <div className="grid gap-6">
        {filteredBudgets.length === 0 ? (
          <Card className="border-2">
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron presupuestos</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Comienza creando tu primer presupuesto"}
              </p>
              {canAccess("budgets") && (
                <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]" onClick={handleCreateBudget}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Presupuesto
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredBudgets.map((budget) => (
            <Card key={budget.id} className="border-2 hover:border-[#ccff00] transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-[#222222]">{budget.name}</CardTitle>
                      <Badge className={getStatusColor(budget.status)} variant="secondary">
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(budget.status)}
                          <span className="capitalize">{budget.status}</span>
                        </div>
                      </Badge>
                    </div>
                    <CardDescription>
                      Año {budget.year} • Creado por {budget.createdBy} • {budget.items.length} partidas
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewBudget(budget.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {canAccess("budgets") && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleEditBudget(budget.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                    <p className="text-2xl font-bold text-[#222222]">{formatCurrency(budget.totalBudget)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Ejecutado</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(budget.totalSpent)}</p>
                    <p className="text-sm text-gray-500">
                      {budget.totalBudget > 0 ? Math.round((budget.totalSpent / budget.totalBudget) * 100) : 0}% del
                      total
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Disponible</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(budget.totalAvailable)}</p>
                    <p className="text-sm text-gray-500">
                      {budget.totalBudget > 0 ? Math.round((budget.totalAvailable / budget.totalBudget) * 100) : 0}%
                      restante
                    </p>
                  </div>
                </div>

                {budget.status === "active" && budget.totalBudget > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progreso de Ejecución</span>
                      <span className="text-sm text-gray-600">
                        {Math.round((budget.totalSpent / budget.totalBudget) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#ccff00] h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((budget.totalSpent / budget.totalBudget) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Última modificación: {new Date(budget.lastModified).toLocaleDateString("es-DO")}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewBudget(budget.id)}>
                      Ver Detalles
                    </Button>
                    {canAccess("budgets") && budget.status === "draft" && (
                      <Button size="sm" className="bg-[#ccff00] text-black hover:bg-[#b8e600]">
                        Activar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
