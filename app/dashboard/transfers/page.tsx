"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { BudgetService, type BudgetTransfer, type Budget } from "@/lib/budget-data"
import { Plus, Search, CheckCircle, XCircle, Clock, ArrowRight, DollarSign } from "lucide-react"

export default function TransfersPage() {
  return (
    <ProtectedRoute requiredPermission="transfers">
      <DashboardLayout currentPage="transfers">
        <TransfersContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function TransfersContent() {
  const { user, canAccess } = useAuth()
  const [transfers, setTransfers] = useState<BudgetTransfer[]>([])
  const [budget, setBudget] = useState<Budget | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTransfers(BudgetService.getTransfers())
      setBudget(BudgetService.getActiveBudget() || null)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: BudgetTransfer["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: BudgetTransfer["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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

  const getItemName = (itemId: string) => {
    if (!budget) return "Partida desconocida"
    const item = budget.items.find((i) => i.id === itemId)
    return item ? `${item.code} - ${item.name}` : "Partida desconocida"
  }

  const handleApproveTransfer = (transferId: string) => {
    if (confirm("¿Estás seguro de que deseas aprobar este traspaso?")) {
      BudgetService.approveTransfer(transferId, user?.name || "Usuario", "Aprobado desde el dashboard")
      setTransfers(BudgetService.getTransfers())
      setBudget(BudgetService.getActiveBudget() || null)
    }
  }

  const handleRejectTransfer = (transferId: string) => {
    const reason = prompt("Motivo del rechazo (opcional):")
    BudgetService.rejectTransfer(transferId, reason || undefined)
    setTransfers(BudgetService.getTransfers())
  }

  const filteredTransfers = transfers.filter((transfer) => {
    const fromItem = getItemName(transfer.fromItemId)
    const toItem = getItemName(transfer.toItemId)
    const matchesSearch =
      fromItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      toItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || transfer.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando traspasos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Gestión de Traspasos</h1>
          <p className="text-gray-600 mt-1">Administra traspasos entre partidas presupuestarias</p>
        </div>
        {canAccess("transfers") && (
          <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Traspaso
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Traspasos</p>
                <p className="text-2xl font-bold text-[#222222]">{transfers.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {transfers.filter((t) => t.status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprobados</p>
                <p className="text-2xl font-bold text-green-600">
                  {transfers.filter((t) => t.status === "approved").length}
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
                <p className="text-sm font-medium text-gray-600">Monto Total</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {formatCurrency(transfers.reduce((sum, t) => sum + t.amount, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
                  placeholder="Buscar traspasos..."
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
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobados</option>
                <option value="rejected">Rechazados</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfers List */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredTransfers.length === 0 ? (
              <div className="text-center py-12">
                <ArrowRight className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay traspasos</h3>
                <p className="text-gray-600">No se encontraron traspasos que coincidan con los filtros.</p>
              </div>
            ) : (
              filteredTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}
                      >
                        {getStatusIcon(transfer.status)}
                        {transfer.status === "pending"
                          ? "Pendiente"
                          : transfer.status === "approved"
                            ? "Aprobado"
                            : "Rechazado"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(transfer.createdAt).toLocaleDateString("es-DO")}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#222222]">{formatCurrency(transfer.amount)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Desde:</p>
                      <p className="text-sm text-gray-900">{getItemName(transfer.fromItemId)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Hacia:</p>
                      <p className="text-sm text-gray-900">{getItemName(transfer.toItemId)}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-600 mb-1">Motivo:</p>
                    <p className="text-sm text-gray-900">{transfer.reason}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Solicitado por: {transfer.requestedBy}</div>
                    {transfer.status === "pending" && canAccess("transfers") && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectTransfer(transfer.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rechazar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApproveTransfer(transfer.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aprobar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
