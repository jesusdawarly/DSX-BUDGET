"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthService, type User, type AuthState } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: {
    email: string
    password: string
    name: string
    company: string
    role?: User["role"]
  }) => Promise<boolean>
  logout: () => void
  hasRole: (role: User["role"]) => boolean
  canAccess: (resource: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session on mount
    const user = AuthService.getCurrentUser()
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }))
      const result = await AuthService.login(email, password)

      if (result) {
        setAuthState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        })
        return true
      }

      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const register = async (userData: {
    email: string
    password: string
    name: string
    company: string
    role?: User["role"]
  }): Promise<boolean> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }))
      const result = await AuthService.register(userData)

      if (result) {
        setAuthState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        })
        return true
      }

      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = () => {
    AuthService.logout()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const hasRole = (role: User["role"]): boolean => {
    return AuthService.hasRole(role)
  }

  const canAccess = (resource: string): boolean => {
    return AuthService.canAccess(resource)
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        hasRole,
        canAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
