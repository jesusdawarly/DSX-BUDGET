"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { ReportsService, type ReportData, type ExecutionData, type TransferData } from "@/lib/reports-data"
import {
  Plus,
  Search,
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  Trash2,
  FileSpreadsheet,
  FileImage,
} from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ReportsPage() {
  return (
    <ProtectedRoute requiredPermission="reports">
      <DashboardLayout currentPage="reports">
        <ReportsContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function ReportsContent() {
  const { user, canAccess } = useAuth()
  const [reports, setReports] = useState<ReportData[]>([])
  const [executionData, setExecutionData] = useState<ExecutionData[]>([])
  const [transferData, setTransferData] = useState<TransferData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedReportType, setSelectedReportType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReports(ReportsService.getReports())
      setExecutionData(ReportsService.getExecutionData())
      setTransferData(ReportsService.getTransferData())
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case "execution":
        return "Ejecución"
      case "transfers":
        return "Traspasos"
      case "audit":
        return "Auditoría"
      case "custom":
        return "Personalizado"
      default:
        return type
    }
  }

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "execution":
        return "bg-blue-100 text-blue-800"
      case "transfers":
        return "bg-green-100 text-green-800"
      case "audit":
        return "bg-purple-100 text-purple-800"
      case "custom":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleExportReport = (reportId: string, format: "excel" | "pdf") => {
    ReportsService.exportReport(reportId, format)
  }

  const handleDeleteReport = (reportId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
      ReportsService.deleteReport(reportId)
      setReports(ReportsService.getReports())
    }
  }

  const handleGenerateReport = (type: string) => {
    const filters = {
      dateFrom: "2024-01-01",
      dateTo: new Date().toISOString().split("T")[0],
    }
    const newReport = ReportsService.generateReport(type, filters)
    setReports(ReportsService.getReports())
    alert(`Reporte "${newReport.name}" generado exitosamente`)
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedReportType === "all" || report.type === selectedReportType
    return matchesSearch && matchesType
  })

  const pieData = [
    { name: "Ejecutado", value: 85, color: "#ccff00" },
    { name: "Pendiente", value: 15, color: "#222222" },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando reportes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Sistema de Reportes</h1>
          <p className="text-gray-600 mt-1">Genera y gestiona reportes presupuestarios</p>
        </div>
        {canAccess("reports") && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleGenerateReport("execution")}
              className="border-[#ccff00] text-[#222222] hover:bg-[#ccff00] hover:text-black"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Ejecución
            </Button>
            <Button
              variant="outline"
              onClick={() => handleGenerateReport("transfers")}
              className="border-[#ccff00] text-[#222222] hover:bg-[#ccff00] hover:text-black"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Traspasos
            </Button>
            <Button
              className="bg-[#ccff00] text-black hover:bg-[#b8e600]"
              onClick={() => handleGenerateReport("custom")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Personalizado
            </Button>
          </div>
        )}
      </div>

      {/* Dashboard Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#ccff00]" />
              Ejecución Presupuestaria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={executionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Line type="monotone" dataKey="budgeted" stroke="#222222" strokeWidth={2} name="Presupuestado" />
                <Line type="monotone" dataKey="executed" stroke="#ccff00" strokeWidth={2} name="Ejecutado" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#ccff00]" />
              Traspasos por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transferData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="approved" fill="#22c55e" name="Aprobados" />
                <Bar dataKey="pending" fill="#eab308" name="Pendientes" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rechazados" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reportes</p>
                <p className="text-2xl font-bold text-[#222222]">{reports.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mes</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reports.filter((r) => new Date(r.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ejecución Promedio</p>
                <p className="text-2xl font-bold text-green-600">89%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Traspasos Activos</p>
                <p className="text-2xl font-bold text-yellow-600">12</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-yellow-600" />
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
                  placeholder="Buscar reportes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
              >
                <option value="all">Todos los tipos</option>
                <option value="execution">Ejecución</option>
                <option value="transfers">Traspasos</option>
                <option value="audit">Auditoría</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reportes</h3>
                <p className="text-gray-600">No se encontraron reportes que coincidan con los filtros.</p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}
                      >
                        {getReportTypeLabel(report.type)}
                      </span>
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExportReport(report.id, "excel")}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <FileSpreadsheet className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExportReport(report.id, "pdf")}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <FileImage className="h-4 w-4" />
                      </Button>
                      {canAccess("reports") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteReport(report.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                      Creado por: {report.createdBy} • {new Date(report.createdAt).toLocaleDateString("es-DO")}
                    </div>
                    <div className="flex items-center gap-4">
                      {report.filters.dateFrom && (
                        <span>
                          Período: {new Date(report.filters.dateFrom).toLocaleDateString("es-DO")} -{" "}
                          {report.filters.dateTo
                            ? new Date(report.filters.dateTo).toLocaleDateString("es-DO")
                            : "Presente"}
                        </span>
                      )}
                    </div>
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
