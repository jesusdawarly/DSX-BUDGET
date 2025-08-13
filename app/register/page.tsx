"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, UserPlus, ArrowLeft, Building, User, Lock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { User as UserType } from "@/lib/auth"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    role: "financiero" as UserType["role"],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        password: formData.password,
        role: formData.role,
      })

      if (success) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const roles = [
    { value: "administrador", label: "Administrador", description: "Acceso completo al sistema" },
    { value: "financiero", label: "Financiero", description: "Gestión de presupuestos y reportes" },
    { value: "auditor", label: "Auditor", description: "Solo lectura y auditoría" },
    { value: "invitado", label: "Invitado", description: "Acceso limitado a reportes" },
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
                <h2 className="text-2xl lg:text-3xl font-bold text-[#222222]">Únete a DSX</h2>
                <p className="text-lg text-gray-600">
                  Crea tu cuenta y comienza a transformar tu gestión presupuestaria
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#222222]">¿Por qué elegir DSX?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center">
                  <Building className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#222222]">Tecnología Dominicana</p>
                  <p className="text-xs text-gray-500">Desarrollado con orgullo en RD</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#222222] rounded-lg flex items-center justify-center">
                  <Lock className="h-4 w-4 text-[#ccff00]" />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#222222]">Seguridad Extrema</p>
                  <p className="text-xs text-gray-500">Protección de nivel bancario</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#222222]">Roles Personalizados</p>
                  <p className="text-xs text-gray-500">Control granular de acceso</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>🇩🇴</span>
            <span>Innovación caribeña para el mundo</span>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[#222222]">Crear Cuenta</CardTitle>
              <CardDescription>Completa tus datos para comenzar con DSX</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#222222]">Nombre Completo</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#222222]">Empresa</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                      placeholder="Tu empresa"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#222222]">Correo Electrónico</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                    placeholder="tu@empresa.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#222222]">Rol en la Empresa</label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#222222]">Contraseña</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                        placeholder="Mínimo 6 caracteres"
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#222222]">Confirmar Contraseña</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
                        placeholder="Repite la contraseña"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1 rounded border-gray-300" required />
                  <span className="text-sm text-gray-600">
                    Acepto los{" "}
                    <a href="#" className="text-[#ccff00] hover:underline">
                      términos de servicio
                    </a>{" "}
                    y la{" "}
                    <a href="#" className="text-[#ccff00] hover:underline">
                      política de privacidad
                    </a>
                  </span>
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
                      <span>Creando cuenta...</span>
                    </div>
                  ) : (
                    <>
                      Crear Cuenta
                      <UserPlus className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-[#ccff00] hover:underline font-medium">
                      Inicia sesión aquí
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Badge className="bg-blue-100 text-blue-800">Registro Gratuito</Badge>
            <p className="text-xs text-gray-500 mt-2">Comienza con el Plan Cero sin costo alguno</p>
          </div>
        </div>
      </div>
    </div>
  )
}
