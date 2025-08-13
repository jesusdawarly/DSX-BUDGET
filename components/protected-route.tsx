"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { User } from "@/lib/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: User["role"]
  requiredPermission?: string
  fallbackPath?: string
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole, canAccess } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackPath)
        return
      }

      if (requiredRole && !hasRole(requiredRole)) {
        router.push("/dashboard") // Redirect to dashboard if insufficient role
        return
      }

      if (requiredPermission && !canAccess(requiredPermission)) {
        router.push("/dashboard") // Redirect to dashboard if insufficient permission
        return
      }
    }
  }, [isAuthenticated, isLoading, requiredRole, requiredPermission, hasRole, canAccess, router, fallbackPath])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-[#ccff00] rounded-xl flex items-center justify-center mx-auto">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Cargando DSX...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return null // Will redirect via useEffect
  }

  if (requiredPermission && !canAccess(requiredPermission)) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}
