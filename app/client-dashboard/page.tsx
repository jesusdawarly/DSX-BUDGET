"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DollarSign,
  TrendingUp,
  Target,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Building2,
  Calculator,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  TrendingDown,
  Activity,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  BookOpen,
  Info,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ClientData {
  isAuthenticated: boolean
  clientType: string
  clientData: {
    name: string
    type: string
    email: string
    icon: any
    color: string
    bgColor: string
  }
}

interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string
  action?: string
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to DSX!",
    description: "Let's take a quick tour to help you get started with your budget management system.",
  },
  {
    id: "overview",
    title: "Dashboard Overview",
    description: "This is your main dashboard where you can see budget summaries, key metrics, and recent activity.",
    target: "overview-stats",
  },
  {
    id: "ai-insights",
    title: "AI-Powered Insights",
    description: "Our AI analyzes your budget data to provide smart recommendations and predictions.",
    target: "ai-insights-tab",
  },
  {
    id: "departments",
    title: "Department Management",
    description: "Manage your budget allocation across different departments and track spending.",
    target: "departments-tab",
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "Generate comprehensive reports and export your budget data in various formats.",
    target: "reports-tab",
  },
  {
    id: "quick-actions",
    title: "Quick Actions",
    description: "Use these buttons for common tasks like importing Excel files and generating reports.",
    target: "quick-actions",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "You've completed the tour. Start exploring your budget management system!",
  },
]

export default function ClientDashboard() {
  const [clientAuth, setClientAuth] = useState<ClientData | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)
  const [aiPredictions, setAiPredictions] = useState<any>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)
  const router = useRouter()

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "budget_alert",
      title: "Budget Threshold Alert",
      message: "Marketing department has exceeded 85% of allocated budget",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "ai_insight",
      title: "AI Recommendation",
      message: "Consider reallocating $15,000 from Operations to Technology for better ROI",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "system_update",
      title: "Monthly Report Ready",
      message: "Your October budget analysis report is now available for download",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "budget_alert",
      title: "Approval Required",
      message: "Budget transfer request of $8,500 pending your approval",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: false,
      priority: "high",
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "budget_alert":
        return AlertTriangle
      case "ai_insight":
        return Lightbulb
      case "system_update":
        return Info
      default:
        return Bell
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-blue-400"
      default:
        return "text-muted-foreground"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const intervalRef = useRef<number | null>(null)
  const handleClickOutsideRef = useRef<(event: MouseEvent) => void>(() => {})

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = window.setInterval(() => {
        const randomNotifications = [
          {
            type: "ai_insight",
            title: "Smart Insight",
            message: "AI detected potential savings of $3,200 in office supplies budget",
            priority: "medium",
          },
          {
            type: "budget_alert",
            title: "Budget Update",
            message: "Q4 budget projections updated based on current spending patterns",
            priority: "low",
          },
          {
            type: "system_update",
            title: "Data Sync Complete",
            message: "Latest financial data has been synchronized successfully",
            priority: "low",
          },
        ]

        if (Math.random() > 0.7) {
          // 30% chance every 30 seconds
          const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)]
          const newNotification = {
            id: Date.now(),
            ...randomNotification,
            timestamp: new Date(),
            read: false,
          }

          setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications
        }
      }, 30000) // Check every 30 seconds
    }

    startInterval()

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const authData = localStorage.getItem("clientAuth")
    if (authData) {
      setClientAuth(JSON.parse(authData))
      generateAIPredictions(JSON.parse(authData).clientType)

      const onboardingStatus = localStorage.getItem(`onboarding_${JSON.parse(authData).clientData.email}`)
      if (!onboardingStatus) {
        setShowOnboarding(true)
      } else {
        setOnboardingCompleted(true)
      }
    } else {
      router.push("/client-login")
    }
  }, [router])

  const nextOnboardingStep = () => {
    if (currentOnboardingStep < onboardingSteps.length - 1) {
      setCurrentOnboardingStep(currentOnboardingStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const prevOnboardingStep = () => {
    if (currentOnboardingStep > 0) {
      setCurrentOnboardingStep(currentOnboardingStep - 1)
    }
  }

  const skipOnboarding = () => {
    completeOnboarding()
  }

  const completeOnboarding = () => {
    if (clientAuth) {
      localStorage.setItem(`onboarding_${clientAuth.clientData.email}`, "completed")
    }
    setShowOnboarding(false)
    setOnboardingCompleted(true)
  }

  const restartOnboarding = () => {
    setCurrentOnboardingStep(0)
    setShowOnboarding(true)
  }

  const generateAIPredictions = (clientType: string) => {
    const predictions = {
      corporate: {
        nextMonthSpend: 1250000,
        budgetRisk: "medium",
        recommendations: [
          {
            type: "optimization",
            text: "Reduce Operations spending by 8% to improve efficiency",
            impact: "+$168K savings",
          },
          { type: "opportunity", text: "Increase R&D investment for Q2 product launch", impact: "+15% ROI potential" },
          { type: "alert", text: "Marketing budget trending 12% over target", impact: "Risk: $126K overspend" },
        ],
        trends: {
          operations: { trend: "decreasing", percentage: -5.2 },
          marketing: { trend: "increasing", percentage: 12.3 },
          rd: { trend: "stable", percentage: 2.1 },
          hr: { trend: "increasing", percentage: 8.7 },
          it: { trend: "decreasing", percentage: -3.4 },
        },
        forecast: [
          { month: "Jan", predicted: 1180000, actual: 1150000 },
          { month: "Feb", predicted: 1220000, actual: 1200000 },
          { month: "Mar", predicted: 1250000, actual: null },
          { month: "Apr", predicted: 1280000, actual: null },
          { month: "May", predicted: 1310000, actual: null },
          { month: "Jun", predicted: 1290000, actual: null },
        ],
      },
      ngo: {
        nextMonthSpend: 78000,
        budgetRisk: "low",
        recommendations: [
          {
            type: "optimization",
            text: "Reallocate 5% from Operations to Programs for greater impact",
            impact: "+250 beneficiaries",
          },
          { type: "opportunity", text: "Apply for sustainability grant matching", impact: "+$45K potential funding" },
          { type: "alert", text: "Emergency fund unused - consider reallocation", impact: "Opportunity: $25K" },
        ],
        trends: {
          programs: { trend: "stable", percentage: 1.8 },
          operations: { trend: "decreasing", percentage: -3.2 },
          fundraising: { trend: "increasing", percentage: 15.6 },
          administration: { trend: "stable", percentage: 0.9 },
          emergency: { trend: "stable", percentage: 0 },
        },
        forecast: [
          { month: "Jan", predicted: 72000, actual: 71500 },
          { month: "Feb", predicted: 75000, actual: 74200 },
          { month: "Mar", predicted: 78000, actual: null },
          { month: "Apr", predicted: 81000, actual: null },
          { month: "May", predicted: 79000, actual: null },
          { month: "Jun", predicted: 76000, actual: null },
        ],
      },
      government: {
        nextMonthSpend: 1650000,
        budgetRisk: "high",
        recommendations: [
          {
            type: "optimization",
            text: "Accelerate Infrastructure projects to meet fiscal year targets",
            impact: "On-track delivery",
          },
          { type: "opportunity", text: "Federal matching funds available for Education", impact: "+$300K potential" },
          {
            type: "alert",
            text: "Public Services overspending requires immediate attention",
            impact: "Risk: $450K deficit",
          },
        ],
        trends: {
          publicServices: { trend: "increasing", percentage: 18.2 },
          infrastructure: { trend: "stable", percentage: 3.1 },
          education: { trend: "decreasing", percentage: -2.8 },
          healthcare: { trend: "increasing", percentage: 7.4 },
          administration: { trend: "stable", percentage: 1.2 },
        },
        forecast: [
          { month: "Jan", predicted: 1580000, actual: 1620000 },
          { month: "Feb", predicted: 1620000, actual: 1650000 },
          { month: "Mar", predicted: 1650000, actual: null },
          { month: "Apr", predicted: 1680000, actual: null },
          { month: "May", predicted: 1720000, actual: null },
          { month: "Jun", predicted: 1690000, actual: null },
        ],
      },
    }

    setAiPredictions(predictions[clientType as keyof typeof predictions] || predictions.corporate)
  }

  const handleLogout = () => {
    localStorage.removeItem("clientAuth")
    router.push("/client-login")
  }

  if (!clientAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Mock data based on client type
  const getBudgetData = () => {
    switch (clientAuth.clientType) {
      case "corporate":
        return {
          totalBudget: 5250000,
          allocated: 85,
          remaining: 787500,
          departments: [
            { name: "Operations", budget: 2100000, spent: 1785000, percentage: 40, color: "bg-blue-500" },
            { name: "Marketing", budget: 1050000, spent: 892500, percentage: 20, color: "bg-green-500" },
            { name: "R&D", budget: 1312500, spent: 1050000, percentage: 25, color: "bg-purple-500" },
            { name: "HR", budget: 525000, spent: 420000, percentage: 10, color: "bg-orange-500" },
            { name: "IT", budget: 262500, sent: 210000, percentage: 5, color: "bg-red-500" },
          ],
          projects: 23,
          employees: 150,
        }
      case "ngo":
        return {
          totalBudget: 850000,
          allocated: 92,
          remaining: 68000,
          departments: [
            { name: "Programs", budget: 510000, spent: 469200, percentage: 60, color: "bg-green-500" },
            { name: "Operations", budget: 127500, spent: 114750, percentage: 15, color: "bg-blue-500" },
            { name: "Fundraising", budget: 102000, spent: 91800, percentage: 12, color: "bg-purple-500" },
            { name: "Administration", budget: 85000, spent: 76500, percentage: 10, color: "bg-orange-500" },
            { name: "Emergency Fund", budget: 25500, spent: 0, percentage: 3, color: "bg-red-500" },
          ],
          projects: 12,
          beneficiaries: 2500,
        }
      case "government":
        return {
          totalBudget: 12500000,
          allocated: 78,
          remaining: 2750000,
          departments: [
            { name: "Public Services", budget: 5000000, spent: 3900000, percentage: 40, color: "bg-purple-500" },
            { name: "Infrastructure", budget: 3750000, spent: 2925000, percentage: 30, color: "bg-blue-500" },
            { name: "Education", budget: 2000000, spent: 1560000, percentage: 16, color: "bg-green-500" },
            { name: "Healthcare", budget: 1250000, spent: 975000, percentage: 10, color: "bg-orange-500" },
            { name: "Administration", budget: 500000, spent: 390000, percentage: 4, color: "bg-red-500" },
          ],
          projects: 45,
          citizens: 50000,
        }
      default:
        return {
          totalBudget: 1000000,
          allocated: 75,
          remaining: 250000,
          departments: [],
          projects: 0,
          employees: 0,
        }
    }
  }

  const budgetData = getBudgetData()
  const IconComponent = clientAuth.clientData.icon

  const OnboardingTour = () => {
    const currentStep = onboardingSteps[currentOnboardingStep]

    return (
      <Dialog open={showOnboarding} onOpenChange={() => {}}>
        <DialogContent className="max-w-md bg-background border-border">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-foreground font-[family-name:var(--font-heading)]">
                {currentStep.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipOnboarding}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-muted-foreground">
                  {currentOnboardingStep + 1} of {onboardingSteps.length}
                </span>
              </div>
              <Progress value={((currentOnboardingStep + 1) / onboardingSteps.length) * 100} className="h-2" />
            </div>

            {/* Step content */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                {currentStep.id === "welcome" && <Play className="h-8 w-8 text-primary" />}
                {currentStep.id === "overview" && <BarChart3 className="h-8 w-8 text-primary" />}
                {currentStep.id === "ai-insights" && <Brain className="h-8 w-8 text-primary" />}
                {currentStep.id === "departments" && <Building2 className="h-8 w-8 text-primary" />}
                {currentStep.id === "reports" && <PieChart className="h-8 w-8 text-primary" />}
                {currentStep.id === "quick-actions" && <Zap className="h-8 w-8 text-primary" />}
                {currentStep.id === "complete" && <CheckCircle className="h-8 w-8 text-primary" />}
              </div>

              <p className="text-muted-foreground text-center leading-relaxed">{currentStep.description}</p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevOnboardingStep}
                disabled={currentOnboardingStep === 0}
                className="border-border text-muted-foreground hover:bg-muted bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={skipOnboarding}
                  className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                >
                  Skip Tour
                </Button>
                <Button onClick={nextOnboardingStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {currentOnboardingStep === onboardingSteps.length - 1 ? "Finish" : "Next"}
                  {currentOnboardingStep !== onboardingSteps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  useEffect(() => {
    handleClickOutsideRef.current = (event: MouseEvent) => {
      if (showNotifications && !(event.target as Element).closest(".relative")) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideRef.current)
    return () => document.removeEventListener("mousedown", handleClickOutsideRef.current)
  }, [showNotifications])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 ${clientAuth.clientData.bgColor} rounded-xl flex items-center justify-center`}>
                <IconComponent className={`h-6 w-6 ${clientAuth.clientData.color}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                  {clientAuth.clientData.name}
                </h1>
                <p className="text-sm text-muted-foreground">{clientAuth.clientData.type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {onboardingCompleted && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={restartOnboarding}
                  className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                  title="Restart Tour"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              )}

              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="border-border text-muted-foreground hover:bg-muted bg-transparent relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#a8e600] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Notifications</h3>
                        {unreadCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs text-[#a8e600] hover:bg-muted"
                          >
                            Mark all read
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notification) => {
                          const IconComponent = getNotificationIcon(notification.type)
                          return (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                                !notification.read ? "bg-muted/20" : ""
                              }`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg bg-muted ${getPriorityColor(notification.priority)}`}>
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p
                                      className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                                    >
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-[#a8e600] rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {formatTimestamp(notification.timestamp)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>

                    <div className="p-3 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-[#a8e600] hover:bg-muted"
                        onClick={() => setShowNotifications(false)}
                      >
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-border text-muted-foreground hover:bg-muted bg-transparent"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-border text-muted-foreground hover:bg-muted bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div id="overview-stats" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    ${(budgetData.totalBudget / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Allocated</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    {budgetData.allocated}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    ${(budgetData.remaining / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    {budgetData.projects}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger id="ai-insights-tab" value="ai-insights" className="data-[state=active]:bg-background">
              <Brain className="h-4 w-4 mr-2" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger id="departments-tab" value="departments" className="data-[state=active]:bg-background">
              <Building2 className="h-4 w-4 mr-2" />
              Departments
            </TabsTrigger>
            <TabsTrigger id="reports-tab" value="reports" className="data-[state=active]:bg-background">
              <PieChart className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-background">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Budget Allocation Chart */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Budget Allocation
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Distribution across departments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {budgetData.departments.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{dept.name}</span>
                          {aiPredictions?.trends[dept.name.toLowerCase().replace(/\s+/g, "")] && (
                            <div className="flex items-center space-x-1">
                              {aiPredictions.trends[dept.name.toLowerCase().replace(/\s+/g, "")].trend ===
                              "increasing" ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : aiPredictions.trends[dept.name.toLowerCase().replace(/\s+/g, "")].trend ===
                                "decreasing" ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : (
                                <Activity className="h-3 w-3 text-blue-500" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {Math.abs(aiPredictions.trends[dept.name.toLowerCase().replace(/\s+/g, "")].percentage)}
                                %
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">${dept.budget.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{dept.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={dept.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    AI Insights & Activity
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Smart recommendations and recent updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* AI Recommendations */}
                  {aiPredictions?.recommendations.slice(0, 2).map((rec: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          rec.type === "optimization"
                            ? "bg-blue-500/10"
                            : rec.type === "opportunity"
                              ? "bg-green-500/10"
                              : "bg-orange-500/10"
                        }`}
                      >
                        {rec.type === "optimization" ? (
                          <Zap
                            className={`h-4 w-4 ${
                              rec.type === "optimization"
                                ? "text-blue-500"
                                : rec.type === "opportunity"
                                  ? "text-green-500"
                                  : "text-orange-500"
                            }`}
                          />
                        ) : rec.type === "opportunity" ? (
                          <Lightbulb className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{rec.text}</p>
                        <p className="text-xs text-muted-foreground">{rec.impact}</p>
                      </div>
                      <div className="text-xs text-primary">AI</div>
                    </div>
                  ))}

                  {/* Regular Activity */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Budget allocation approved</p>
                      <p className="text-xs text-muted-foreground">Operations department - $50,000</p>
                    </div>
                    <div className="text-xs text-muted-foreground">2h ago</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Download className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Monthly report generated</p>
                      <p className="text-xs text-muted-foreground">Budget performance summary</p>
                    </div>
                    <div className="text-xs text-muted-foreground">1d ago</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {aiPredictions && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    AI Budget Forecast
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Next month prediction: ${aiPredictions.nextMonthSpend.toLocaleString()}
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        aiPredictions.budgetRisk === "low"
                          ? "bg-green-500/10 text-green-500"
                          : aiPredictions.budgetRisk === "medium"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {aiPredictions.budgetRisk} risk
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-4">
                    {aiPredictions.forecast.map((month: any, index: number) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">{month.month}</div>
                        <div
                          className={`h-16 w-full rounded flex items-end justify-center ${
                            month.actual ? "bg-primary/20" : "bg-muted"
                          }`}
                        >
                          <div className="text-xs font-medium text-foreground">
                            ${(month.predicted / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {month.actual ? "Actual" : "Predicted"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card id="quick-actions" className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">Quick Actions</CardTitle>
                <CardDescription className="text-muted-foreground">Common tasks and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col space-y-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Upload className="h-6 w-6" />
                    <span>Import Excel</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2 border-border text-muted-foreground hover:bg-muted bg-transparent"
                  >
                    <Download className="h-6 w-6" />
                    <span>Export Report</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2 border-border text-muted-foreground hover:bg-muted bg-transparent"
                  >
                    <Plus className="h-6 w-6" />
                    <span>New Project</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2 border-border text-muted-foreground hover:bg-muted bg-transparent"
                  >
                    <Brain className="h-6 w-6" />
                    <span>AI Analysis</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                AI-Powered Insights
              </h2>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Brain className="h-4 w-4 mr-2" />
                Refresh Analysis
              </Button>
            </div>

            {aiPredictions && (
              <>
                {/* AI Recommendations */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                      Smart Recommendations
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      AI-generated suggestions to optimize your budget performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiPredictions.recommendations.map((rec: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          rec.type === "optimization"
                            ? "border-blue-500/20 bg-blue-500/5"
                            : rec.type === "opportunity"
                              ? "border-green-500/20 bg-green-500/5"
                              : "border-orange-500/20 bg-orange-500/5"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              rec.type === "optimization"
                                ? "bg-blue-500/10"
                                : rec.type === "opportunity"
                                  ? "bg-green-500/10"
                                  : "bg-orange-500/10"
                            }`}
                          >
                            {rec.type === "optimization" ? (
                              <Zap
                                className={`h-4 w-4 ${
                                  rec.type === "optimization"
                                    ? "text-blue-500"
                                    : rec.type === "opportunity"
                                      ? "text-green-500"
                                      : "text-orange-500"
                                }`}
                              />
                            ) : rec.type === "opportunity" ? (
                              <Lightbulb className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  rec.type === "optimization"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : rec.type === "opportunity"
                                      ? "bg-green-500/10 text-green-500"
                                      : "bg-orange-500/10 text-orange-500"
                                }`}
                              >
                                {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                              </span>
                            </div>
                            <p className="font-medium text-foreground mb-1">{rec.text}</p>
                            <p className="text-sm text-muted-foreground">{rec.impact}</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Department Trends */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                      Department Trend Analysis
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      AI-detected spending patterns and trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(aiPredictions.trends).map(([dept, trend]: [string, any]) => (
                        <div key={dept} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground capitalize">
                              {dept.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <div className="flex items-center space-x-1">
                              {trend.trend === "increasing" ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : trend.trend === "decreasing" ? (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              ) : (
                                <Activity className="h-4 w-4 text-blue-500" />
                              )}
                              <span
                                className={`text-sm font-medium ${
                                  trend.trend === "increasing"
                                    ? "text-green-500"
                                    : trend.trend === "decreasing"
                                      ? "text-red-500"
                                      : "text-blue-500"
                                }`}
                              >
                                {trend.percentage > 0 ? "+" : ""}
                                {trend.percentage}%
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {trend.trend === "increasing"
                              ? "Spending increasing"
                              : trend.trend === "decreasing"
                                ? "Spending decreasing"
                                : "Spending stable"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Forecast */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                      6-Month Budget Forecast
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      AI-powered predictions based on historical data and trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-6 gap-4">
                        {aiPredictions.forecast.map((month: any, index: number) => (
                          <div key={index} className="text-center">
                            <div className="text-sm font-medium text-foreground mb-2">{month.month}</div>
                            <div
                              className={`h-24 w-full rounded-lg flex flex-col items-center justify-end p-2 ${
                                month.actual
                                  ? "bg-primary/20 border border-primary/30"
                                  : "bg-muted border border-border"
                              }`}
                            >
                              <div className="text-sm font-bold text-foreground">
                                ${(month.predicted / 1000).toFixed(0)}K
                              </div>
                              {month.actual && (
                                <div className="text-xs text-muted-foreground">
                                  Actual: ${(month.actual / 1000).toFixed(0)}K
                                </div>
                              )}
                            </div>
                            <div className={`text-xs mt-1 ${month.actual ? "text-primary" : "text-muted-foreground"}`}>
                              {month.actual ? "Actual" : "Predicted"}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary/20 border border-primary/30 rounded"></div>
                          <span className="text-sm text-muted-foreground">Actual Data</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-muted border border-border rounded"></div>
                          <span className="text-sm text-muted-foreground">AI Predictions</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                Department Management
              </h2>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgetData.departments.map((dept, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                        {dept.name}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-medium text-foreground">${dept.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Spent</span>
                        <span className="font-medium text-foreground">${dept.spent?.toLocaleString() || "0"}</span>
                      </div>
                      <Progress value={dept.spent ? (dept.spent / dept.budget) * 100 : 0} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {dept.spent ? Math.round((dept.spent / dept.budget) * 100) : 0}% used
                        </span>
                        <span className="text-muted-foreground">
                          ${((dept.budget - (dept.spent || 0)) / 1000).toFixed(0)}K remaining
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                Reports & Analytics
              </h2>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Available Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Monthly Budget Summary</div>
                      <div className="text-sm text-muted-foreground">Comprehensive budget overview</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Department Performance</div>
                      <div className="text-sm text-muted-foreground">Individual department analysis</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Expense Tracking</div>
                      <div className="text-sm text-muted-foreground">Detailed expense breakdown</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Forecast Analysis</div>
                      <div className="text-sm text-muted-foreground">Future budget projections</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Export Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">Excel (.xlsx) format</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">PDF reports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">CSV data export</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">Custom date ranges</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">Automated scheduling</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Automated Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Account Settings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Organization Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Organization Name</Label>
                    <Input
                      defaultValue={clientAuth.clientData.name}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Email Address</Label>
                    <Input
                      defaultValue={clientAuth.clientData.email}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Organization Type</Label>
                    <Input
                      defaultValue={clientAuth.clientData.type}
                      className="bg-background border-border text-foreground"
                      disabled
                    />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Information</Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Budget Alerts</div>
                      <div className="text-sm text-muted-foreground">Notify when budgets exceed thresholds</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Monthly Reports</div>
                      <div className="text-sm text-muted-foreground">Automated monthly budget summaries</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">System Updates</div>
                      <div className="text-sm text-muted-foreground">New features and maintenance notices</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <OnboardingTour />
    </div>
  )
}
