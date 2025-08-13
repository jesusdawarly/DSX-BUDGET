"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { BudgetService, type Budget, type BudgetItem } from "@/lib/budget-data"
import {
  ArrowLeft,
  Edit,
  Download,
  Upload,
  Plus,
  Search,
  MoreHorizontal,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react"

export default function BudgetDetailPage() {
  return (
    <ProtectedRoute requiredPermission="budgets">
      <DashboardLayout currentPage="budgets">
        <BudgetDetailContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function BudgetDetailContent() {
  const params = useParams()
  const { user, canAccess } = useAuth()
  const [budget, setBudget] = useState<Budget | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showImportModal, setShowImportModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      setTimeout(() => {
        const foundBudget = BudgetService.getBudgetById(params.id as string)
        setBudget(foundBudget || null)
        setIsLoading(false)
      }, 1000)
    }
  }, [params.id])

  const getStatusColor = (status: BudgetItem["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      case "exceeded":
        return "bg-red-200 text-red-900"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: BudgetItem["status"]) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <Clock className="h-4 w-4" />
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "exceeded":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
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

  const handleImportExcel = async (file: File) => {
    if (!budget) return

    setIsLoading(true)
    try {
      const result = await BudgetService.importFromExcel(budget.id, file)
      if (result.success) {
        // Refresh budget data
        const updatedBudget = BudgetService.getBudgetById(budget.id)
        setBudget(updatedBudget || null)
        alert(result.message)
      } else {
        alert("Error al importar: " + result.message)
      }
    } catch (error) {
      alert("Error al procesar el archivo")
    } finally {
      setIsLoading(false)
      setShowImportModal(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando presupuesto...</p>
        </div>
      </div>
    )
  }

  if (!budget) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Presupuesto no encontrado</h2>
        <p className="text-gray-600 mb-6">El presupuesto que buscas no existe o no tienes permisos para verlo.</p>
        <Button onClick={() => (window.location.href = "/dashboard/budgets")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Presupuestos
        </Button>
      </div>
    )
  }

  const departments = Array.from(new Set(budget.items.map((item) => item.department)))
  const filteredItems = budget.items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || item.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => (window.location.href = "/dashboard/budgets")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#222222]">{budget.name}</h1>
            <p className="text-gray-600 mt-1">
              Año {budget.year} • {budget.items.length} partidas • Creado por {budget.createdBy}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(budget.status as any)} variant="secondary">
            <span className="capitalize">{budget.status}</span>
          </Badge>
          {canAccess("budgets") && (
            <>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" onClick={() => setShowImportModal(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Importar Excel
              </Button>
              <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                <p className="text-2xl font-bold text-[#222222]">{formatCurrency(budget.totalBudget)}</p>
              </div>
              <div className="w-12 h-12 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ejecutado</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(budget.totalSpent)}</p>
                <p className="text-sm text-gray-500">
                  {budget.totalBudget > 0 ? Math.round((budget.totalSpent / budget.totalBudget) * 100) : 0}% del total
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
                <p className="text-2xl font-bold text-green-600">{formatCurrency(budget.totalAvailable)}</p>
                <p className="text-sm text-gray-500">
                  {budget.totalBudget > 0 ? Math.round((budget.totalAvailable / budget.totalBudget) * 100) : 0}%
                  restante
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Partidas</p>
                <p className="text-2xl font-bold text-[#222222]">{budget.items.length}</p>
                <p className="text-sm text-gray-500">{departments.length} departamentos</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      {budget.totalBudget > 0 && (
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#222222]">Progreso de Ejecución</h3>
                <span className="text-2xl font-bold text-[#222222]">
                  {Math.round((budget.totalSpent / budget.totalBudget) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-[#ccff00] h-4 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((budget.totalSpent / budget.totalBudget) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatCurrency(budget.totalSpent)} ejecutado</span>
                <span>{formatCurrency(budget.totalAvailable)} disponible</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar partidas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
              >
                <option value="all">Todos los departamentos</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {canAccess("budgets") && (
                <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Partida
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Items Table */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-[#222222]">Partidas Presupuestarias</CardTitle>
          <CardDescription>
            {filteredItems.length} de {budget.items.length} partidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron partidas</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterDepartment !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Este presupuesto no tiene partidas aún"}
              </p>
              {canAccess("budgets") && (
                <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Partida
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Código</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Partida</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Departamento</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Presupuesto</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Ejecutado</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Disponible</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Estado</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-gray-600">{item.code}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-[#222222]">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{item.department}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-medium text-[#222222]">{formatCurrency(item.budgetAmount)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div>
                          <span className="font-medium text-blue-600">{formatCurrency(item.spentAmount)}</span>
                          <p className="text-xs text-gray-500">{item.percentage}%</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-medium text-green-600">{formatCurrency(item.availableAmount)}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={getStatusColor(item.status)} variant="secondary">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(item.status)}
                            <span className="capitalize">
                              {item.status === "healthy"
                                ? "Saludable"
                                : item.status === "warning"
                                  ? "Atención"
                                  : item.status === "critical"
                                    ? "Crítico"
                                    : "Excedido"}
                            </span>
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {canAccess("budgets") && (
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-[#222222]">Importar desde Excel</CardTitle>
              <CardDescription>Selecciona un archivo Excel para importar partidas presupuestarias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-[#ccff00] rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-[#ccff00] mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-4">Arrastra tu archivo Excel aquí o haz clic para seleccionar</p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleImportExcel(file)
                    }
                  }}
                  className="hidden"
                  id="excel-upload"
                />
                <label htmlFor="excel-upload">
                  <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]" asChild>
                    <span>Seleccionar Archivo</span>
                  </Button>
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowImportModal(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
