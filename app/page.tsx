"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  MessageCircle,
  Calendar,
  Download,
  Building2,
  Heart,
  Landmark,
  BarChart3,
  PieChart,
  Send,
  TrendingUp,
  Leaf,
  Award,
  Menu,
  FileText,
} from "lucide-react"
import { useState, useEffect } from "react"

const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // In a real implementation, this would send to your analytics service
  console.log("Analytics Event:", eventName, properties)

  // Example: Google Analytics 4
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName, properties)
  }

  // Example: Custom analytics
  if (typeof window !== "undefined") {
    const event = {
      timestamp: new Date().toISOString(),
      event: eventName,
      properties: properties || {},
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    }

    // Store locally for demo purposes
    const events = JSON.parse(localStorage.getItem("dsx_analytics") || "[]")
    events.push(event)
    localStorage.setItem("dsx_analytics", JSON.stringify(events.slice(-100))) // Keep last 100 events
  }
}

const LeadCaptureForm = ({
  showLeadForm,
  setShowLeadForm,
  formSubmitted,
  leadFormData,
  setLeadFormData,
  handleLeadFormSubmit,
  isSubmitting,
  submitError,
}: {
  showLeadForm: boolean
  setShowLeadForm: (show: boolean) => void
  formSubmitted: boolean
  leadFormData: any
  setLeadFormData: (data: any) => void
  handleLeadFormSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  submitError: string | null
}) => (
  <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
    <DialogContent className="max-w-md bg-background border-border">
      <DialogHeader>
        <DialogTitle className="text-foreground font-[family-name:var(--font-heading)]">
          {formSubmitted ? "Thank You!" : "Get Started with DSX"}
        </DialogTitle>
      </DialogHeader>

      {formSubmitted ? (
        <div className="text-center space-y-4 py-8">
          <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          <p className="text-muted-foreground">
            We've received your information and will contact you within 24 hours to schedule your consultation.
          </p>
          <div className="text-sm text-muted-foreground">
            A confirmation email has been sent to {leadFormData.email}
          </div>
        </div>
      ) : (
        <form onSubmit={handleLeadFormSubmit} className="space-y-4">
          {submitError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{submitError}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name *
            </Label>
            <Input
              id="name"
              required
              disabled={isSubmitting}
              value={leadFormData.name}
              onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
              className="bg-background border-border text-foreground disabled:opacity-50"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              required
              disabled={isSubmitting}
              value={leadFormData.email}
              onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
              className="bg-background border-border text-foreground disabled:opacity-50"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization" className="text-foreground">
              Organization Name *
            </Label>
            <Input
              id="organization"
              required
              disabled={isSubmitting}
              value={leadFormData.organization}
              onChange={(e) => setLeadFormData({ ...leadFormData, organization: e.target.value })}
              className="bg-background border-border text-foreground disabled:opacity-50"
              placeholder="Your organization"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizationType" className="text-foreground">
              Organization Type *
            </Label>
            <select
              id="organizationType"
              required
              disabled={isSubmitting}
              value={leadFormData.organizationType}
              onChange={(e) => setLeadFormData({ ...leadFormData, organizationType: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground disabled:opacity-50"
            >
              <option value="">Select type</option>
              <option value="corporate">Corporate/Business</option>
              <option value="ngo">NGO/Non-Profit</option>
              <option value="government">Government/Public Sector</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              disabled={isSubmitting}
              value={leadFormData.message}
              onChange={(e) => setLeadFormData({ ...leadFormData, message: e.target.value })}
              className="bg-background border-border text-foreground disabled:opacity-50"
              placeholder="Tell us about your budget management needs..."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Information Request
              </>
            )}
          </Button>
        </form>
      )}
    </DialogContent>
  </Dialog>
)

export default function DSXLandingPage() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null)
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    email: "",
    organization: "",
    organizationType: "",
    message: "",
  })
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    trackEvent("page_view", {
      page_title: "DSX Homepage",
      page_location: window.location.href,
    })
  }, [])

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    trackEvent("lead_form_submit", {
      organization_type: leadFormData.organizationType,
      has_message: leadFormData.message.length > 0,
      form_location: "main_cta",
    })

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to send email. Please try again.")
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to send email")
      }

      // Store in localStorage for demo purposes (simulating CRM integration)
      const existingLeads = JSON.parse(localStorage.getItem("dsx_leads") || "[]")
      const newLead = {
        ...leadFormData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: "new",
        source: "website_form",
      }
      existingLeads.push(newLead)
      localStorage.setItem("dsx_leads", JSON.stringify(existingLeads))

      console.log("Lead captured and email sent successfully")

      setFormSubmitted(true)
      setIsSubmitting(false)

      // Auto-close form after success
      setTimeout(() => {
        setShowLeadForm(false)
        setFormSubmitted(false)
        setLeadFormData({
          name: "",
          email: "",
          organization: "",
          organizationType: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      setIsSubmitting(false)
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.")

      trackEvent("form_submission_error", {
        error_message: error instanceof Error ? error.message : "Unknown error",
        organization_type: leadFormData.organizationType,
      })
    }
  }

  const handleExampleClick = (exampleType: string) => {
    trackEvent("budget_example_view", {
      example_type: exampleType,
      location: "hero_section",
    })
    setSelectedExample(exampleType)
  }

  const handleCTAClick = (ctaType: string, location: string) => {
    trackEvent("cta_click", {
      cta_type: ctaType,
      location: location,
    })

    if (ctaType === "schedule_meeting" || ctaType === "get_in_touch" || ctaType === "request_information") {
      setShowLeadForm(true)
    }
  }

  const budgetExamples = {
    corporate: {
      title: "Corporate Budget Example",
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      totalBudget: "$5,250,000",
      departments: [
        { name: "Operations", allocated: 2100000, percentage: 40, color: "bg-blue-500" },
        { name: "Marketing", allocated: 1050000, percentage: 20, color: "bg-green-500" },
        { name: "R&D", allocated: 1312500, percentage: 25, color: "bg-purple-500" },
        { name: "HR", allocated: 525000, percentage: 10, color: "bg-orange-500" },
        { name: "IT", allocated: 262500, percentage: 5, color: "bg-red-500" },
      ],
      metrics: {
        allocated: 85,
        remaining: 15,
        departments: 5,
        projects: 23,
      },
    },
    ngo: {
      title: "NGO Budget Example",
      icon: Heart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      totalBudget: "$850,000",
      departments: [
        { name: "Programs", allocated: 510000, percentage: 60, color: "bg-green-500" },
        { name: "Operations", allocated: 127500, percentage: 15, color: "bg-blue-500" },
        { name: "Fundraising", allocated: 102000, percentage: 12, color: "bg-purple-500" },
        { name: "Administration", allocated: 85000, percentage: 10, color: "bg-orange-500" },
        { name: "Emergency Fund", allocated: 25500, percentage: 3, color: "bg-red-500" },
      ],
      metrics: {
        allocated: 92,
        remaining: 8,
        departments: 5,
        projects: 12,
      },
    },
    government: {
      title: "Government Agency Budget",
      icon: Landmark,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      totalBudget: "$12,500,000",
      departments: [
        { name: "Public Services", allocated: 5000000, percentage: 40, color: "bg-purple-500" },
        { name: "Infrastructure", allocated: 3750000, percentage: 30, color: "bg-blue-500" },
        { name: "Education", allocated: 2000000, percentage: 16, color: "bg-green-500" },
        { name: "Healthcare", allocated: 1250000, percentage: 10, color: "bg-orange-500" },
        { name: "Administration", allocated: 500000, percentage: 4, color: "bg-red-500" },
      ],
      metrics: {
        allocated: 78,
        remaining: 22,
        departments: 5,
        projects: 45,
      },
    },
  }

  const BudgetExampleModal = ({ type, data }: { type: string; data: any }) => (
    <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-3 text-foreground font-[family-name:var(--font-heading)]">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 ${data.bgColor} rounded-xl flex items-center justify-center`}>
            <data.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${data.color}`} />
          </div>
          <span className="text-lg sm:text-xl">{data.title}</span>
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 sm:space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">
                {data.totalBudget}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Budget</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                {data.metrics.allocated}%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Allocated</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                {data.metrics.departments}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Departments</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                {data.metrics.projects}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground font-[family-name:var(--font-heading)]">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Budget Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.departments.map((dept: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{dept.name}</span>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${dept.allocated.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{dept.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`${dept.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Key Features Showcase */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground font-[family-name:var(--font-heading)]">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Available Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Real-time budget tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Automated alerts & notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Excel import/export</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Custom reporting</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Multi-user access control</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Audit trail & compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Mobile-friendly interface</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">24/7 support access</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover-lift animate-glow"
            onClick={() => handleCTAClick("schedule_demo", "budget_example_modal")}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Schedule Demo for This Solution
          </Button>
        </div>
      </div>
    </DialogContent>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - Simplified for consultative approach */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)] tracking-wider">
                DSX
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => trackEvent("nav_click", { section: "how_it_works" })}
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => trackEvent("nav_click", { section: "about" })}
              >
                Who We Are
              </a>
              <a
                href="#impact"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => trackEvent("nav_click", { section: "impact" })}
              >
                Impact & SDGs
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => trackEvent("nav_click", { section: "contact" })}
              >
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Button
                className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover-lift"
                onClick={() => handleCTAClick("get_in_touch", "nav")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Get In Touch
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#how-it-works"
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => {
                    trackEvent("nav_click", { section: "how_it_works" })
                    setIsMobileMenuOpen(false)
                  }}
                >
                  How It Works
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => {
                    trackEvent("nav_click", { section: "about" })
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Who We Are
                </a>
                <a
                  href="#impact"
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => {
                    trackEvent("nav_click", { section: "impact" })
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Impact & SDGs
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => {
                    trackEvent("nav_click", { section: "contact" })
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Contact
                </a>
                <div className="px-3 py-2">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    onClick={() => {
                      handleCTAClick("get_in_touch", "nav")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Get In Touch
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Consultative focus */}
      <section className="py-12 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-6 sm:space-y-8">
                <Badge className="bg-primary/10 text-primary border-primary/20 font-medium glow-effect">
                  Professional Budget Management Services
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight font-[family-name:var(--font-heading)]">
                  Transform Your
                  <span className="block gradient-text">Budget Management</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  We craft smart budget solutions that actually work. Whether you're importing from Excel or starting
                  fresh, we'll help you turn numbers into strategy—with the kind of personal attention that makes all
                  the difference.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover-lift animate-glow"
                  onClick={() => handleCTAClick("schedule_meeting", "hero")}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule a Meeting
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted hover-lift bg-transparent"
                  onClick={() => handleCTAClick("request_information", "hero")}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Request Information
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-8">
                <Button
                  variant="ghost"
                  className="justify-start p-3 sm:p-4 h-auto border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  onClick={() => setSelectedExample("corporate")}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground text-sm sm:text-base">Corporate</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">See Example</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="justify-start p-3 sm:p-4 h-auto border border-border hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300"
                  onClick={() => setSelectedExample("ngo")}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground text-sm sm:text-base">NGO</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">See Example</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="justify-start p-3 sm:p-4 h-auto border border-border hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
                  onClick={() => setSelectedExample("government")}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Landmark className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground text-sm sm:text-base">Government</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">See Example</div>
                    </div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">5 min</div>
                  <div className="text-sm text-muted-foreground">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">24h</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-card border border-border rounded-3xl p-8 hover-lift">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Budget Overview</h3>
                    <Badge className="bg-primary/10 text-primary">Live Demo</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Budget</span>
                      <span className="font-semibold text-foreground">$2,450,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Allocated: 75%</span>
                      <span className="text-primary">Available: 25%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary rounded-full opacity-10 blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-12 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">Who We Are</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Where Financial Expertise Meets Personal Care
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're a close-knit team of financial strategists and tech innovators who believe great budget management
              isn't just about the numbers—it's about understanding your story and helping you write the next chapter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-card border-border hover-lift">
              <CardHeader>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                To be your trusted partner in financial clarity. We believe every organization deserves tools that work
                as hard as they do, and guidance that feels like having a financial expert right at your side.
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift">
              <CardHeader>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                To transform how organizations think about their finances—making budget management feel less like a
                chore and more like a strategic advantage that drives real growth and impact.
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift">
              <CardHeader>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">Our Values</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We lead with heart, think with our heads, and deliver with precision. Honesty, creativity, and genuine
                care for your success aren't just values—they're how we do business, every single day.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">Trust & Credibility</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Ready to Deliver What You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're a new company with experienced people. Our team brings years of expertise from previous roles, and
              we're ready to channel that knowledge into building something great for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                  Corporate Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Our team brings experience from managing complex corporate budgets. We understand the challenges of
                  multi-department coordination and can build systems that actually work for your business.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Multi-department budget coordination</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Financial compliance knowledge</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Enterprise-level thinking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                  Non-Profit Understanding
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  We get it—every dollar matters when you're trying to change the world. Our approach focuses on
                  maximizing impact while maintaining the transparency donors and stakeholders expect.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Grant management expertise</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Donor reporting best practices</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Impact measurement focus</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Landmark className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                  Public Sector Ready
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Government and public organizations have unique needs. We're prepared to deliver solutions that meet
                  strict compliance requirements while being user-friendly for your team.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Compliance-first approach</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Transparency by design</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Public accountability tools</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)] text-center mb-8">
              What We're Building For You
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card border-border hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                        Smart Automation
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">What we're capable of delivering</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We know you're drowning in spreadsheets. We're building systems that replace manual chaos with smart
                    automation that actually makes sense to your team—no more late nights fixing formulas.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Eliminate manual errors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Real-time budget tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Faster decision-making</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                        Impact Storytelling
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">What we're excited to build</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Your mission deserves better than boring spreadsheets. We're creating systems that not only manage
                    your budget but help you tell your impact story in ways that inspire and engage.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Automated impact reporting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Visual storytelling tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Stakeholder engagement features</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-muted/30 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)] text-center mb-8">
              Our Commitments to You
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="font-semibold text-foreground">Fort Knox-Level Security</div>
                <div className="text-sm text-muted-foreground">Your data stays yours, always</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="font-semibold text-foreground">24-Hour Response</div>
                <div className="text-sm text-muted-foreground">We're here when you need us</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="font-semibold text-foreground">Your Success, Our Reputation</div>
                <div className="text-sm text-muted-foreground">We succeed when you succeed</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="font-semibold text-foreground">No Surprises Pricing</div>
                <div className="text-sm text-muted-foreground">Clear, honest, upfront costs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">Impact & SDGs</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Building a Better Tomorrow, One Budget at a Time
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to the UN Sustainable Development Goals, helping organizations across Latin America manage
              resources more effectively to create lasting positive impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-card border-border hover-lift text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)] text-lg">SDG 8</CardTitle>
                <p className="text-sm text-muted-foreground">Decent Work & Economic Growth</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Helping organizations optimize resource allocation to create sustainable employment and drive economic
                  development.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)] text-lg">SDG 9</CardTitle>
                <p className="text-sm text-muted-foreground">Industry, Innovation & Infrastructure</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Promoting technological innovation and building resilient infrastructure through smart financial
                  planning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)] text-lg">SDG 12</CardTitle>
                <p className="text-sm text-muted-foreground">Responsible Consumption & Production</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enabling sustainable resource management and reducing waste through efficient budget allocation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)] text-lg">SDG 16</CardTitle>
                <p className="text-sm text-muted-foreground">Peace, Justice & Strong Institutions</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Promoting transparency, accountability, and effective governance through clear financial reporting.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)] text-center mb-8">
              Our Impact Commitment
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">100%</div>
                <div className="font-semibold text-foreground">Transparency</div>
                <div className="text-sm text-muted-foreground">
                  Every budget decision tracked and reported with complete transparency
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">50%</div>
                <div className="font-semibold text-foreground">Efficiency Gain</div>
                <div className="text-sm text-muted-foreground">
                  Target improvement in budget management efficiency for our clients
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">24/7</div>
                <div className="font-semibold text-foreground">Support</div>
                <div className="text-sm text-muted-foreground">
                  Continuous support to ensure your mission never stops
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">Contact</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Ready to Transform Your Budget Management?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's have a conversation about your needs. We'll listen, understand, and show you exactly how DSX can
              make your financial management smoother and more strategic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)] mb-2">
                      Let's Talk
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Schedule a 30-minute consultation where we'll discuss your current challenges and explore how DSX
                      can help.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)] mb-2">
                      Schedule a Meeting
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Book a 30-minute consultation where we'll discuss your specific needs and show you exactly how DSX
                      can work for your organization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)] mb-2">
                      Get Information
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Request detailed information about our services, pricing, and how we can customize a solution for
                      your specific requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover-lift animate-glow"
                  onClick={() => handleCTAClick("schedule_meeting", "contact_section")}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule a Meeting
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-muted-foreground hover:bg-muted hover:text-primary hover-lift bg-transparent"
                  onClick={() => handleCTAClick("request_information", "contact_section")}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Request Information
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-card border border-border p-8 hover-lift">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-heading)] mb-2">
                      Quick Response Guarantee
                    </h3>
                    <p className="text-muted-foreground">
                      We respond to all inquiries within 24 hours, usually much sooner.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="font-semibold text-primary">&lt; 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                      <span className="text-muted-foreground">Consultation</span>
                      <span className="font-semibold text-foreground">Free</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                      <span className="text-muted-foreground">Custom Quote</span>
                      <span className="font-semibold text-foreground">Same Day</span>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Badge className="bg-primary/10 text-primary">No Commitment Required</Badge>
                  </div>
                </div>
              </Card>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary rounded-full opacity-10 blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)] tracking-wider">
                DSX
              </div>
              <p className="text-muted-foreground">
                Transforming budget management with smart solutions that work for organizations of all sizes.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Santo Domingo, Dominican Republic</p>
                <p>contact@dsx-budget.com</p>
                <p>+1 (849) 397-0258</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                © 2024 DSX - Dawarly Budget Management Software. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lead Capture Form */}
      <Dialog open={selectedExample !== null} onOpenChange={() => setSelectedExample(null)}>
        <BudgetExampleModal type="corporate" data={budgetExamples.corporate} />
      </Dialog>
      <LeadCaptureForm
        showLeadForm={showLeadForm}
        setShowLeadForm={setShowLeadForm}
        formSubmitted={formSubmitted}
        leadFormData={leadFormData}
        setLeadFormData={setLeadFormData}
        handleLeadFormSubmit={handleLeadFormSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  )
}
