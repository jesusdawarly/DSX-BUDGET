export interface User {
  id: string
  email: string
  name: string
  role: "administrador" | "financiero" | "auditor" | "invitado"
  company: string
  avatar?: string
  createdAt: string
  lastLogin: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock users database (in real app this would be backend)
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@empresa.com",
    name: "Carlos Administrador",
    role: "administrador",
    company: "Empresa Demo",
    createdAt: "2024-01-01",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    email: "financiero@empresa.com",
    name: "María Financiera",
    role: "financiero",
    company: "Empresa Demo",
    createdAt: "2024-01-01",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    email: "auditor@empresa.com",
    name: "Juan Auditor",
    role: "auditor",
    company: "Empresa Demo",
    createdAt: "2024-01-01",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "4",
    email: "invitado@empresa.com",
    name: "Ana Invitada",
    role: "invitado",
    company: "Empresa Demo",
    createdAt: "2024-01-01",
    lastLogin: new Date().toISOString(),
  },
]

export class AuthService {
  private static readonly STORAGE_KEY = "dsx_auth_user"
  private static readonly SESSION_KEY = "dsx_auth_session"

  static async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user in mock database
    const user = MOCK_USERS.find((u) => u.email === email)

    if (user && password === "demo123") {
      // Simple password check for demo
      const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }))
      const updatedUser = { ...user, lastLogin: new Date().toISOString() }

      // Store in localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser))
      localStorage.setItem(this.SESSION_KEY, token)

      return { user: updatedUser, token }
    }

    return null
  }

  static async register(userData: {
    email: string
    password: string
    name: string
    company: string
    role?: "administrador" | "financiero" | "auditor" | "invitado"
  }): Promise<{ user: User; token: string } | null> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === userData.email)
    if (existingUser) {
      throw new Error("El usuario ya existe")
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role || "financiero",
      company: userData.company,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    // Add to mock database
    MOCK_USERS.push(newUser)

    const token = btoa(JSON.stringify({ userId: newUser.id, timestamp: Date.now() }))

    // Store in localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser))
    localStorage.setItem(this.SESSION_KEY, token)

    return { user: newUser, token }
  }

  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEY)
    localStorage.removeItem(this.SESSION_KEY)
  }

  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.STORAGE_KEY)
      const token = localStorage.getItem(this.SESSION_KEY)

      if (!userStr || !token) return null

      const user = JSON.parse(userStr)

      // Validate token (simple check for demo)
      const tokenData = JSON.parse(atob(token))
      const isExpired = Date.now() - tokenData.timestamp > 24 * 60 * 60 * 1000 // 24 hours

      if (isExpired) {
        this.logout()
        return null
      }

      return user
    } catch {
      return null
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static hasRole(requiredRole: User["role"]): boolean {
    const user = this.getCurrentUser()
    if (!user) return false

    // Role hierarchy: administrador > financiero > auditor > invitado
    const roleHierarchy = {
      administrador: 4,
      financiero: 3,
      auditor: 2,
      invitado: 1,
    }

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
  }

  static canAccess(resource: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false

    // Define permissions by role
    const permissions = {
      administrador: ["all"],
      financiero: ["budgets", "reports", "transfers"],
      auditor: ["reports", "audit"],
      invitado: ["reports"],
    }

    const userPermissions = permissions[user.role]
    return userPermissions.includes("all") || userPermissions.includes(resource)
  }
}
