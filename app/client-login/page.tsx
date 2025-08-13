"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Heart,
  Landmark,
  Calculator,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ClientLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [selectedClientType, setSelectedClientType] = useState("corporate")
  const router = useRouter()

  // Demo client credentials
  const clientCredentials = {
    corporate: {
      email: "finance@techcorp.com",
      password: "techcorp2024",
      name: "TechCorp Solutions",
      type: "Corporate",
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Enterprise budget management for technology companies",
    },
    ngo: {
      email: "admin@greenfuture.org",
      password: "green2024",
      name: "Green Future NGO",
      type: "Non-Profit Organization",
      icon: Heart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Sustainable development and environmental programs",
    },
    government: {
      email: "budget@citydev.gov",
      password: "city2024",
      name: "City Development Agency",
      type: "Government Agency",
      icon: Landmark,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Public sector infrastructure and development projects",
    },
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Check credentials against all client types
    const clientType = Object.entries(clientCredentials).find(
      ([_, client]) => client.email === credentials.email && client.password === credentials.password,
    )

    if (clientType) {
      // Store client info in localStorage for demo purposes
      localStorage.setItem(
        "clientAuth",
        JSON.stringify({
          isAuthenticated: true,
          clientType: clientType[0],
          clientData: clientType[1],
        }),
      )

      // Redirect to client dashboard
      router.push("/client-dashboard")
    } else {
      alert("Invalid credentials. Please check your email and password.")
    }
  }

  const fillDemoCredentials = (type: keyof typeof clientCredentials) => {
    const client = clientCredentials[type]
    setCredentials({
      email: client.email,
      password: client.password,
    })
    setSelectedClientType(type)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center animate-glow">
                <Calculator className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">DSX</h1>
                <p className="text-sm text-muted-foreground">Client Portal</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-border text-muted-foreground hover:bg-muted bg-transparent"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">Welcome Back</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access your personalized budget management dashboard. Enter your credentials to continue.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Login Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">Client Login</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your email and password to access your budget management system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        className="pl-10 bg-background border-border text-foreground"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="pl-10 pr-10 bg-background border-border text-foreground"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover-lift"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Access Dashboard
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Need help accessing your account?{" "}
                    <a href="#contact" className="text-primary hover:underline">
                      Contact Support
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Demo Credentials */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">Demo Access</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Try our system with these demo accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(clientCredentials).map(([type, client]) => (
                    <div
                      key={type}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fillDemoCredentials(type as keyof typeof clientCredentials)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${client.bgColor} rounded-xl flex items-center justify-center`}>
                          <client.icon className={`h-5 w-5 ${client.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{client.name}</div>
                          <div className="text-sm text-muted-foreground">{client.type}</div>
                        </div>
                        <Badge variant="outline" className="border-border text-muted-foreground">
                          Demo
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 ml-13">{client.description}</p>
                      <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                        <div>Email: {client.email}</div>
                        <div>Password: {client.password}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground font-[family-name:var(--font-heading)]">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Security Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Multi-factor authentication</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Session timeout protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Audit trail logging</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Section */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-heading)]">
                  Need Assistance?
                </h3>
                <p className="text-muted-foreground">
                  Our support team is available to help you with any login issues or questions about your account.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                  >
                    View Help Center
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
