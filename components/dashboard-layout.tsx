"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  FileText,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
  PieChart,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export function DashboardLayout({ children, currentPage = "dashboard" }: DashboardLayoutProps) {
  const { user, logout, canAccess } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: currentPage === "dashboard",
      permission: "reports",
    },
    {
      name: "Presupuestos",
      href: "/dashboard/budgets",
      icon: Wallet,
      current: currentPage === "budgets",
      permission: "budgets",
    },
    {
      name: "Reportes",
      href: "/dashboard/reports",
      icon: BarChart3,
      current: currentPage === "reports",
      permission: "reports",
    },
    {
      name: "Análisis",
      href: "/dashboard/analytics",
      icon: PieChart,
      current: currentPage === "analytics",
      permission: "reports",
    },
    {
      name: "Traspasos",
      href: "/dashboard/transfers",
      icon: TrendingUp,
      current: currentPage === "transfers",
      permission: "transfers",
    },
    {
      name: "Auditoría",
      href: "/dashboard/audit",
      icon: FileText,
      current: currentPage === "audit",
      permission: "audit",
    },
    {
      name: "Usuarios",
      href: "/dashboard/users",
      icon: Users,
      current: currentPage === "users",
      permission: "all",
    },
    {
      name: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
      current: currentPage === "settings",
      permission: "reports",
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "administrador":
        return "bg-red-100 text-red-800"
      case "financiero":
        return "bg-blue-100 text-blue-800"
      case "auditor":
        return "bg-green-100 text-green-800"
      case "invitado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredNavigation = navigation.filter((item) => canAccess(item.permission) || item.permission === "reports")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-[#222222]">DSX</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {filteredNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current ? "bg-[#ccff00] text-black" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">D</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#222222]">DSX</span>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            {filteredNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current ? "bg-[#ccff00] text-black" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* User info at bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-[#ccff00] rounded-full flex items-center justify-center">
                <span className="text-black font-semibold">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#222222] truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.company}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge className={getRoleColor(user?.role || "")} variant="secondary">
                {user?.role}
              </Badge>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              {/* Search */}
              <div className="flex-1 max-w-lg mx-4 lg:mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar presupuestos, partidas..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notifications and user menu (mobile) */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>

                {/* Mobile user info */}
                <div className="lg:hidden flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#ccff00] rounded-full flex items-center justify-center">
                    <span className="text-black font-semibold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      </div>
    </div>
  )
}
