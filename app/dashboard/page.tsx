"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsGrid } from "@/components/dashboard-stats"
import { BudgetProgress } from "@/components/budget-progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import {
  DollarSign,
  TrendingUp,
  FileText,
  Users,
  Plus,
  Settings,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  Eye,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout currentPage="dashboard">
        <DashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { user, canAccess } = useAuth()

  const stats = [
    {
      title: "Total Budget",
      value: "$2,400,000",
      change: "+12%",
      changeType: "positive" as const,
      icon: <DollarSign className="h-4 w-4" />,
      description: "Annual budget 2024",
    },
    {
      title: "Executed",
      value: "78%",
      change: "+5%",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4" />,
      description: "$1,872,000 allocated",
    },
    {
      title: "Active Items",
      value: "247",
      change: "+23",
      changeType: "positive" as const,
      icon: <FileText className="h-4 w-4" />,
      description: "15 departments",
    },
    {
      title: "SDG Impact Score",
      value: "8.4/10",
      change: "+0.3",
      changeType: "positive" as const,
      icon: <Users className="h-4 w-4" />,
      description: "Sustainability index",
    },
  ]

  const budgetData = [
    {
      id: "1",
      department: "Operations",
      budget: 850000,
      spent: 722500,
      percentage: 85,
      status: "warning" as const,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      department: "Marketing",
      budget: 320000,
      spent: 198400,
      percentage: 62,
      status: "healthy" as const,
      lastUpdated: "1 hour ago",
    },
    {
      id: "3",
      department: "Technology",
      budget: 450000,
      spent: 337500,
      percentage: 75,
      status: "healthy" as const,
      lastUpdated: "3 hours ago",
    },
    {
      id: "4",
      department: "Human Resources",
      budget: 280000,
      spent: 266000,
      percentage: 95,
      status: "critical" as const,
      lastUpdated: "30 min ago",
    },
    {
      id: "5",
      department: "Administration",
      budget: 180000,
      spent: 126000,
      percentage: 70,
      status: "healthy" as const,
      lastUpdated: "4 hours ago",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Transfer approved",
      description: "Marketing → Digital Advertising",
      amount: "$15,000",
      time: "2 hours ago",
      status: "approved",
      user: "Carlos Admin",
    },
    {
      id: 2,
      action: "New budget created",
      description: "Q1 2025 Budget with SDG alignment",
      amount: "$3,200,000",
      time: "4 hours ago",
      status: "pending",
      user: "María Finance",
    },
    {
      id: 3,
      action: "Limit alert",
      description: "HR at 95% of budget limit",
      amount: "$266,000",
      time: "30 min ago",
      status: "warning",
      user: "System",
    },
    {
      id: 4,
      action: "Impact report generated",
      description: "Monthly SDG impact assessment",
      amount: "247 items",
      time: "6 hours ago",
      status: "completed",
      user: "Juan Auditor",
    },
  ]

  const quickActions = [
    {
      title: "New Budget",
      description: "Create annual budget",
      icon: <Plus className="h-5 w-5" />,
      href: "/dashboard/budgets/new",
      permission: "budgets",
      primary: true,
    },
    {
      title: "Impact Report",
      description: "Generate SDG impact data",
      icon: <Download className="h-5 w-5" />,
      href: "/dashboard/reports",
      permission: "reports",
      primary: false,
    },
    {
      title: "View Projections",
      description: "Predictive analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      href: "/dashboard/analytics",
      permission: "reports",
      primary: false,
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: <Settings className="h-5 w-5" />,
      href: "/dashboard/settings",
      permission: "reports",
      primary: false,
    },
  ]

  const filteredActions = quickActions.filter((action) => canAccess(action.permission))

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Welcome, {user?.name?.split(" ")[0]}</h1>
          <p className="text-gray-600 mt-1">Budget management overview at {user?.company}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="border-[#ccff00] text-[#ccff00]">
            <Calendar className="h-3 w-3 mr-1" />
            December 2024
          </Badge>
          <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600]">
            <Eye className="h-4 w-4 mr-2" />
            Full View
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Budget Progress */}
          <BudgetProgress budgets={budgetData} />

          {/* Quick Actions */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-[#222222]">Quick Actions</CardTitle>
              <CardDescription>Common tasks for your {user?.role} role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.primary ? "default" : "outline"}
                    className={`h-20 flex-col justify-center space-y-2 ${
                      action.primary ? "bg-[#ccff00] text-black hover:bg-[#b8e600]" : "bg-transparent hover:bg-gray-50"
                    }`}
                    onClick={() => (window.location.href = action.href)}
                  >
                    {action.icon}
                    <div className="text-center">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs opacity-70">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-[#222222]">Recent Activity</CardTitle>
              <CardDescription>Latest system actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "approved"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-yellow-500"
                            : activity.status === "completed"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#222222]">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        <span className="text-sm font-medium text-[#ccff00]">{activity.amount}</span>
                      </div>
                      <p className="text-xs text-gray-400">by {activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-[#222222] flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">Critical Limit</p>
                  <p className="text-xs text-red-600">HR at 95% of budget</p>
                  <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                    View Details
                  </Button>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">Attention Required</p>
                  <p className="text-xs text-yellow-600">Operations at 85% of limit</p>
                  <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                    Review
                  </Button>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Pending Approval</p>
                  <p className="text-xs text-blue-600">2 transfers awaiting approval</p>
                  <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                    Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-[#222222]">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Synchronization</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Backup</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Completed</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Connected users</span>
                  <span className="text-sm font-medium text-[#222222]">8/12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last update</span>
                  <span className="text-sm text-gray-500">2 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
