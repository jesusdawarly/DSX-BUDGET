"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  TrendingUp,
  Lightbulb,
  Leaf,
  Scale,
  Building,
  Users,
  DollarSign,
  Clock,
  Target,
  Globe,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                <Link href="/register">Start Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">UN SDG Aligned</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight font-[family-name:var(--font-heading)]">
              Impact & Sustainability
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              DSX is committed to the United Nations Sustainable Development Goals, creating technology that drives
              positive change across organizations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* SDG Alignment Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Our SDG Commitment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We align our technology and business practices with four key Sustainable Development Goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* SDG 8 */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">SDG 8</Badge>
                    <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                      Decent Work & Economic Growth
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  DSX drives efficiency in resource management, reducing financial losses and fostering sustainable
                  business growth. Our platform helps organizations optimize their budgets, leading to better resource
                  allocation and economic stability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Reduce budget waste by up to 25%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Improve financial decision-making speed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Enable sustainable growth strategies</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SDG 9 */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">SDG 9</Badge>
                    <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                      Industry, Innovation & Infrastructure
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  As Dominican innovation, DSX promotes digital transformation in financial management across Latin
                  America. We're building the infrastructure for modern budget management in emerging markets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      Digital transformation for Latin American organizations
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Cloud-based financial infrastructure</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Innovation hub in the Caribbean</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SDG 12 */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">SDG 12</Badge>
                    <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                      Responsible Consumption & Production
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  Our platform promotes responsible budget usage and minimizes resource waste through intelligent
                  planning, forecasting, and real-time monitoring of financial resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Eliminate unnecessary expenditures</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Optimize resource allocation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Promote sustainable spending patterns</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SDG 16 */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Scale className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">SDG 16</Badge>
                    <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                      Peace, Justice & Strong Institutions
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  DSX promotes financial transparency, traceability, and accountability. Our audit trails and reporting
                  capabilities strengthen institutional governance and public trust.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Complete financial transparency</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Comprehensive audit trails</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Enhanced accountability measures</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Expected Impact Indicators
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Measurable outcomes that demonstrate our commitment to sustainable development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-border text-center hover-lift">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)] mb-2">25%</div>
                <div className="text-muted-foreground text-sm">Reduction in Unjustified Expenses</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center hover-lift">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)] mb-2">60%</div>
                <div className="text-muted-foreground text-sm">Time Saved in Audit Processes</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center hover-lift">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)] mb-2">100+</div>
                <div className="text-muted-foreground text-sm">Organizations to Impact by 2025</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center hover-lift">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)] mb-2">5</div>
                <div className="text-muted-foreground text-sm">Latin American Countries</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Projected Impact Scenarios
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world examples of how DSX can transform organizations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                  Medium Enterprise
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manufacturing company with $5M annual budget
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Annual Savings</span>
                    <span className="text-primary font-semibold">$125,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Audit Time Reduction</span>
                    <span className="text-primary font-semibold">40 hours/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transparency Score</span>
                    <span className="text-primary font-semibold">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                  NGO Organization
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  International development NGO with $2M budget
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Program Efficiency</span>
                    <span className="text-primary font-semibold">+30%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Donor Confidence</span>
                    <span className="text-primary font-semibold">Increased</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compliance Score</span>
                    <span className="text-primary font-semibold">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground font-[family-name:var(--font-heading)]">
                  Public Institution
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Municipal government with $10M annual budget
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Public Trust</span>
                    <span className="text-primary font-semibold">Enhanced</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Process Efficiency</span>
                    <span className="text-primary font-semibold">+50%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accountability</span>
                    <span className="text-primary font-semibold">Full Transparency</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                Join the Sustainable Finance Revolution
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Be part of the movement towards more transparent, efficient, and sustainable financial management.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover-lift animate-glow"
              >
                <Link href="/register">Start Your Impact Journey</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-muted-foreground hover:bg-muted hover:text-primary hover-lift bg-transparent"
              >
                <Link href="#contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
