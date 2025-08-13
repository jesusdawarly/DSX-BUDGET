"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  Users,
  DollarSign,
  TrendingUp,
  Building2,
  Heart,
  Landmark,
  Eye,
  Edit,
  Plus,
  Search,
  Download,
  Settings,
  BarChart3,
  CheckCircle,
} from "lucide-react"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [selectedClient, setSelectedClient] = useState<any>(null)

  // Mock admin credentials
  const adminCredentials = {
    username: "admin",
    password: "dsx2024",
  }

  // Mock client data
  const clients = [
    {
      id: 1,
      name: "TechCorp Solutions",
      type: "Corporate",
      email: "finance@techcorp.com",
      totalBudget: 5250000,
      allocated: 85,
      status: "Active",
      lastLogin: "2024-01-15",
      departments: 5,
      projects: 23,
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      name: "Green Future NGO",
      type: "NGO",
      email: "admin@greenfuture.org",
      totalBudget: 850000,
      allocated: 92,
      status: "Active",
      lastLogin: "2024-01-14",
      departments: 4,
      projects: 12,
      icon: Heart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      name: "City Development Agency",
      type: "Government",
      email: "budget@citydev.gov",
      totalBudget: 12500000,
      allocated: 78,
      status: "Active",
      lastLogin: "2024-01-13",
      departments: 6,
      projects: 45,
      icon: Landmark,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 4,
      name: "Healthcare Alliance",
      type: "NGO",
      email: "finance@healthalliance.org",
      totalBudget: 1200000,
      allocated: 67,
      status: "Pending Setup",
      lastLogin: "Never",
      departments: 3,
      projects: 8,
      icon: Heart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === adminCredentials.username && credentials.password === adminCredentials.password) {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const totalBudgets = clients.reduce((sum, client) => sum + client.totalBudget, 0)
  const activeClients = clients.filter((client) => client.status === "Active").length
  const avgAllocation = clients.reduce((sum, client) => sum + client.allocated, 0) / clients.length

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">DSX Admin Panel</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your administrator credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="bg-background border-border text-foreground"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="bg-background border-border text-foreground"
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Shield className="h-4 w-4 mr-2" />
                Access Admin Panel
              </Button>
            </form>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">Demo credentials: admin / dsx2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                  DSX Admin Panel
                </h1>
                <p className="text-sm text-muted-foreground">Budget Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/10 text-primary">Administrator</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="border-border text-muted-foreground hover:bg-muted"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    {clients.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    {activeClients}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budgets</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    ${(totalBudgets / 1000000).toFixed(1)}M
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
                  <p className="text-sm text-muted-foreground">Avg Allocation</p>
                  <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                    {avgAllocation.toFixed(0)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="clients" className="data-[state=active]:bg-background">
              <Users className="h-4 w-4 mr-2" />
              Client Management
            </TabsTrigger>
            <TabsTrigger value="budgets" className="data-[state=active]:bg-background">
              <BarChart3 className="h-4 w-4 mr-2" />
              Budget Overview
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-background">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </TabsTrigger>
          </TabsList>

          {/* Client Management Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                Client Management
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    className="pl-10 bg-background border-border text-foreground"
                  />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </div>
            </div>

            <Card className="bg-card border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-foreground">Client</TableHead>
                    <TableHead className="text-foreground">Type</TableHead>
                    <TableHead className="text-foreground">Budget</TableHead>
                    <TableHead className="text-foreground">Allocation</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Last Login</TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${client.bgColor} rounded-xl flex items-center justify-center`}>
                            <client.icon className={`h-5 w-5 ${client.color}`} />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{client.name}</div>
                            <div className="text-sm text-muted-foreground">{client.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border text-muted-foreground">
                          {client.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">${client.totalBudget.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${client.allocated}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-foreground">{client.allocated}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            client.status === "Active"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                          }
                        >
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{client.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                                onClick={() => setSelectedClient(client)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl bg-background border-border">
                              <DialogHeader>
                                <DialogTitle className="flex items-center space-x-3 text-foreground font-[family-name:var(--font-heading)]">
                                  <div
                                    className={`w-10 h-10 ${client.bgColor} rounded-xl flex items-center justify-center`}
                                  >
                                    <client.icon className={`h-6 w-6 ${client.color}`} />
                                  </div>
                                  <span>{client.name} - Budget Details</span>
                                </DialogTitle>
                              </DialogHeader>

                              {selectedClient && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Card className="bg-card border-border">
                                      <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">
                                          ${selectedClient.totalBudget.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Total Budget</div>
                                      </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border">
                                      <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                                          {selectedClient.allocated}%
                                        </div>
                                        <div className="text-sm text-muted-foreground">Allocated</div>
                                      </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border">
                                      <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                                          {selectedClient.departments}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Departments</div>
                                      </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border">
                                      <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                                          {selectedClient.projects}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Projects</div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  <div className="flex justify-center space-x-4">
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Budget
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                                    >
                                      <Download className="h-4 w-4 mr-2" />
                                      Export Data
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Budget Overview Tab */}
          <TabsContent value="budgets" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Budget Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Budget Distribution by Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Corporate</span>
                      <span className="font-semibold text-foreground">$5.25M</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Government</span>
                      <span className="font-semibold text-foreground">$12.5M</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">NGO</span>
                      <span className="font-semibold text-foreground">$2.05M</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">TechCorp updated budget allocation</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">New client Healthcare Alliance added</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">City Development exported budget report</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              System Settings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">System Name</Label>
                    <Input
                      defaultValue="DSX Budget Management"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Default Currency</Label>
                    <Input defaultValue="USD" className="bg-background border-border text-foreground" />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Session Timeout (minutes)</Label>
                    <Input defaultValue="30" type="number" className="bg-background border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Max Login Attempts</Label>
                    <Input defaultValue="3" type="number" className="bg-background border-border text-foreground" />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Security</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
