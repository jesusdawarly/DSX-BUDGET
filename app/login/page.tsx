"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn, ArrowLeft, Shield, Users, BarChart3, FileText } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Credenciales inválidas. Intenta con demo123 como contraseña.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    { email: "admin@empresa.com", role: "Administrador", icon: <Shield className="h-4 w-4" /> },
    { email: "financiero@empresa.com", role: "Financiero", icon: <BarChart3 className="h-4 w-4" /> },
    { email: "auditor@empresa.com", role: "Auditor", icon: <FileText className="h-4 w-4" /> },
    { email: "invitado@empresa.com", role: "Invitado", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8">
          <div className="space-y-6">
            <a
              href="/"
              className="inline-flex items-center space-x-2 text-[#222222] hover:text-[#ccff00] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al inicio</span>
            </a>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#ccff00] rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-xl">D</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#222222]">DSX</h1>
                  <p className="text-gray-600">Dawarly Software</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#222222]">Bienvenido de Vuelta</h2>
                <p className="text-lg text-gray-600">Accede a tu plataforma de gestión presupuestaria dominicana</p>
              </div>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#222222]">Cuentas de Demostración</h3>
            <div className="grid grid-cols-2 gap-3">
              {demoAccounts.map((account) => (
                <Card
                  key={account.email}
                  className="border-2 hover:border-[#ccff00] transition-colors cursor-pointer"
                  onClick={() => setEmail(account.email)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      {account.icon}
                      <div>
                        <p className="font-medium text-sm text-[#222222]">{account.role}</p>
                        <p className="text-xs text-gray-500">{account.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Contraseña para todas las cuentas: <code className="bg-gray-100 px-2 py-1 rounded">demo123</code>
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>🇩🇴</span>
            <span>Tecnología dominicana de confianza</span>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[#222222]">Iniciar Sesión</CardTitle>
              <CardDescription>Ingresa tus credenciales para acceder a DSX</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#222222]">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                    placeholder="tu@empresa.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#222222]">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                      placeholder="Tu contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-600">Recordarme</span>
                  </label>
                  <a href="#" className="text-sm text-[#ccff00] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ccff00] text-black hover:bg-[#b8e600] font-semibold"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Iniciando sesión...</span>
                    </div>
                  ) : (
                    <>
                      Iniciar Sesión
                      <LogIn className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <a href="/register" className="text-[#ccff00] hover:underline font-medium">
                      Regístrate aquí
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Badge className="bg-green-100 text-green-800">Entorno de Demostración</Badge>
            <p className="text-xs text-gray-500 mt-2">Esta es una versión de demostración. Los datos no son reales.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
