"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { AdminService, type SystemUser, type SystemConfig, type AuditLog, type SystemStats } from "@/lib/admin-data"
import {
  Users,
  Settings,
  Shield,
  Activity,
  Database,
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  Eye,
  EyeOff,
} from "lucide-react"

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="administrador">
      <DashboardLayout currentPage="admin">
        <AdminContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function AdminContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState<SystemUser[]>([])
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateUserModal, setShowCreateUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setUsers(AdminService.getUsers())
      setSystemConfig(AdminService.getSystemConfig())
      setAuditLogs(AdminService.getAuditLogs(10))
      setSystemStats(AdminService.getSystemStats())
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleDeleteUser = (userId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      AdminService.deleteUser(userId)
      setUsers(AdminService.getUsers())
    }
  }

  const handleToggleUserStatus = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      const newStatus = user.status === "active" ? "inactive" : "active"
      AdminService.updateUser(userId, { status: newStatus })
      setUsers(AdminService.getUsers())
    }
  }

  const handleUpdateConfig = (configData: Partial<SystemConfig>) => {
    const updatedConfig = AdminService.updateSystemConfig(configData)
    setSystemConfig(updatedConfig)
    alert("Configuración actualizada exitosamente")
  }

  const handleBackup = () => {
    AdminService.performBackup()
    setAuditLogs(AdminService.getAuditLogs(10))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "administrador":
        return "bg-red-100 text-red-800"
      case "financiero":
        return "bg-blue-100 text-blue-800"
      case "auditor":
        return "bg-purple-100 text-purple-800"
      case "invitado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Gestiona usuarios, configuración y monitoreo del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBackup}
            className="border-[#ccff00] text-[#222222] hover:bg-[#ccff00] hover:text-black bg-transparent"
          >
            <Database className="h-4 w-4 mr-2" />
            Backup
          </Button>
          <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]" onClick={() => setShowCreateUserModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", label: "Resumen", icon: Activity },
            { id: "users", label: "Usuarios", icon: Users },
            { id: "config", label: "Configuración", icon: Settings },
            { id: "audit", label: "Auditoría", icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-[#ccff00] text-[#222222]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && systemStats && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                    <p className="text-2xl font-bold text-[#222222]">{systemStats.totalUsers}</p>
                    <p className="text-xs text-green-600">{systemStats.activeUsers} activos</p>
                  </div>
                  <div className="w-12 h-12 bg-[#ccff00] rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Presupuestos</p>
                    <p className="text-2xl font-bold text-[#222222]">{systemStats.totalBudgets}</p>
                    <p className="text-xs text-blue-600">{systemStats.activeBudgets} activos</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Almacenamiento</p>
                    <p className="text-2xl font-bold text-[#222222]">
                      {Math.round((systemStats.storageUsed / systemStats.storageLimit) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">
                      {systemStats.storageUsed} MB / {systemStats.storageLimit} MB
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Database className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Uptime</p>
                    <p className="text-2xl font-bold text-[#222222]">{systemStats.uptime}%</p>
                    <p className="text-xs text-green-600">Sistema estable</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#ccff00]" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}
                      >
                        {log.severity}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <p className="text-xs text-gray-500">{log.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{log.userName}</p>
                      <p className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString("es-DO")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar usuarios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ccff00] rounded-full flex items-center justify-center">
                          <span className="font-medium text-black">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                        >
                          {user.role}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                        >
                          {user.status === "active" ? "Activo" : user.status === "inactive" ? "Inactivo" : "Suspendido"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-600">Departamento:</p>
                        <p className="font-medium">{user.department || "No asignado"}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Teléfono:</p>
                        <p className="font-medium">{user.phone || "No disponible"}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Último acceso:</p>
                        <p className="font-medium">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("es-DO") : "Nunca"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Creado: {new Date(user.createdAt).toLocaleDateString("es-DO")}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleUserStatus(user.id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          {user.status === "active" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUser(user)}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Configuration Tab */}
      {activeTab === "config" && systemConfig && (
        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#ccff00]" />
                Configuración del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
                  <input
                    type="text"
                    value={systemConfig.companyName}
                    onChange={(e) => handleUpdateConfig({ companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                  <select
                    value={systemConfig.currency}
                    onChange={(e) => handleUpdateConfig({ currency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  >
                    <option value="USD">USD - Dólar Estadounidense</option>
                    <option value="DOP">DOP - Peso Dominicano</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                  <select
                    value={systemConfig.language}
                    onChange={(e) => handleUpdateConfig({ language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  >
                    <option value="es-DO">Español (República Dominicana)</option>
                    <option value="es-ES">Español (España)</option>
                    <option value="en-US">English (United States)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zona Horaria</label>
                  <select
                    value={systemConfig.timezone}
                    onChange={(e) => handleUpdateConfig({ timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  >
                    <option value="America/Santo_Domingo">América/Santo Domingo</option>
                    <option value="America/New_York">América/Nueva York</option>
                    <option value="Europe/Madrid">Europa/Madrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frecuencia de Backup</label>
                  <select
                    value={systemConfig.backupFrequency}
                    onChange={(e) => handleUpdateConfig({ backupFrequency: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  >
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retención de Logs (días)</label>
                  <input
                    type="number"
                    value={systemConfig.auditLogRetention}
                    onChange={(e) => handleUpdateConfig({ auditLogRetention: Number.parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={systemConfig.notificationsEnabled}
                    onChange={(e) => handleUpdateConfig({ notificationsEnabled: e.target.checked })}
                    className="rounded border-gray-300 text-[#ccff00] focus:ring-[#ccff00]"
                  />
                  <span className="text-sm font-medium text-gray-700">Habilitar notificaciones</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Audit Tab */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#ccff00]" />
                  Logs de Auditoría
                </CardTitle>
                <Button
                  variant="outline"
                  onClick={() => AdminService.exportAuditLogs("csv")}
                  className="border-[#ccff00] text-[#222222] hover:bg-[#ccff00] hover:text-black"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}
                        >
                          {log.severity}
                        </span>
                        <span className="font-medium text-gray-900">{log.action}</span>
                        <span className="text-sm text-gray-600">en {log.entity}</span>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString("es-DO")}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{log.details}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Usuario: {log.userName}</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
