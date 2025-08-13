export interface SystemUser {
  id: string
  name: string
  email: string
  role: "administrador" | "financiero" | "auditor" | "invitado"
  status: "active" | "inactive" | "suspended"
  lastLogin?: string
  createdAt: string
  permissions: string[]
  department?: string
  phone?: string
}

export interface SystemConfig {
  companyName: string
  companyLogo?: string
  currency: string
  language: string
  timezone: string
  fiscalYearStart: string
  backupFrequency: "daily" | "weekly" | "monthly"
  notificationsEnabled: boolean
  auditLogRetention: number // days
  maxUsers: number
  currentPlan: "cero" | "brujula" | "soberano"
}

export interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: string
  entity: string
  entityId?: string
  details: string
  ipAddress: string
  userAgent: string
  severity: "low" | "medium" | "high" | "critical"
}

export interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalBudgets: number
  activeBudgets: number
  totalTransfers: number
  pendingTransfers: number
  storageUsed: number // MB
  storageLimit: number // MB
  apiCalls: number
  uptime: number // percentage
}

export class AdminService {
  private static users: SystemUser[] = [
    {
      id: "1",
      name: "María González",
      email: "maria.gonzalez@empresa.com",
      role: "administrador",
      status: "active",
      lastLogin: "2024-03-30T14:30:00Z",
      createdAt: "2024-01-15T10:00:00Z",
      permissions: ["all"],
      department: "Administración",
      phone: "+1-809-555-0101",
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@empresa.com",
      role: "financiero",
      status: "active",
      lastLogin: "2024-03-30T11:15:00Z",
      createdAt: "2024-01-20T09:30:00Z",
      permissions: ["budgets", "transfers", "reports"],
      department: "Finanzas",
      phone: "+1-809-555-0102",
    },
    {
      id: "3",
      name: "Ana Martínez",
      email: "ana.martinez@empresa.com",
      role: "auditor",
      status: "active",
      lastLogin: "2024-03-29T16:45:00Z",
      createdAt: "2024-02-01T14:00:00Z",
      permissions: ["reports", "audit"],
      department: "Auditoría",
      phone: "+1-809-555-0103",
    },
    {
      id: "4",
      name: "Juan Pérez",
      email: "juan.perez@empresa.com",
      role: "invitado",
      status: "inactive",
      lastLogin: "2024-03-25T08:20:00Z",
      createdAt: "2024-02-15T11:30:00Z",
      permissions: ["view"],
      department: "Consultoría",
      phone: "+1-809-555-0104",
    },
  ]

  private static config: SystemConfig = {
    companyName: "Empresa Ejemplo S.A.",
    currency: "USD",
    language: "es-DO",
    timezone: "America/Santo_Domingo",
    fiscalYearStart: "01-01",
    backupFrequency: "daily",
    notificationsEnabled: true,
    auditLogRetention: 365,
    maxUsers: 50,
    currentPlan: "brujula",
  }

  private static auditLogs: AuditLog[] = [
    {
      id: "1",
      timestamp: "2024-03-30T14:30:00Z",
      userId: "1",
      userName: "María González",
      action: "LOGIN",
      entity: "Sistema",
      details: "Inicio de sesión exitoso",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "low",
    },
    {
      id: "2",
      timestamp: "2024-03-30T14:25:00Z",
      userId: "2",
      userName: "Carlos Rodríguez",
      action: "UPDATE_BUDGET",
      entity: "Presupuesto",
      entityId: "1",
      details: "Modificación de partida presupuestaria 001-2024",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium",
    },
    {
      id: "3",
      timestamp: "2024-03-30T14:20:00Z",
      userId: "2",
      userName: "Carlos Rodríguez",
      action: "APPROVE_TRANSFER",
      entity: "Traspaso",
      entityId: "TR-2024-045",
      details: "Aprobación de traspaso por $50,000",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high",
    },
    {
      id: "4",
      timestamp: "2024-03-30T13:45:00Z",
      userId: "1",
      userName: "María González",
      action: "CREATE_USER",
      entity: "Usuario",
      entityId: "4",
      details: "Creación de nuevo usuario: juan.perez@empresa.com",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium",
    },
  ]

  static getUsers(): SystemUser[] {
    return this.users
  }

  static getUser(id: string): SystemUser | undefined {
    return this.users.find((u) => u.id === id)
  }

  static createUser(userData: Omit<SystemUser, "id" | "createdAt">): SystemUser {
    const newUser: SystemUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    this.users.push(newUser)
    this.addAuditLog("CREATE_USER", "Usuario", newUser.id, `Creación de usuario: ${newUser.email}`, "medium")
    return newUser
  }

  static updateUser(id: string, userData: Partial<SystemUser>): SystemUser | null {
    const userIndex = this.users.findIndex((u) => u.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...userData }
    this.addAuditLog("UPDATE_USER", "Usuario", id, `Actualización de usuario: ${this.users[userIndex].email}`, "medium")
    return this.users[userIndex]
  }

  static deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex((u) => u.id === id)
    if (userIndex === -1) return false

    const user = this.users[userIndex]
    this.users.splice(userIndex, 1)
    this.addAuditLog("DELETE_USER", "Usuario", id, `Eliminación de usuario: ${user.email}`, "high")
    return true
  }

  static getSystemConfig(): SystemConfig {
    return this.config
  }

  static updateSystemConfig(configData: Partial<SystemConfig>): SystemConfig {
    this.config = { ...this.config, ...configData }
    this.addAuditLog(
      "UPDATE_CONFIG",
      "Configuración",
      undefined,
      "Actualización de configuración del sistema",
      "medium",
    )
    return this.config
  }

  static getAuditLogs(limit?: number): AuditLog[] {
    return limit ? this.auditLogs.slice(0, limit) : this.auditLogs
  }

  static getSystemStats(): SystemStats {
    return {
      totalUsers: this.users.length,
      activeUsers: this.users.filter((u) => u.status === "active").length,
      totalBudgets: 5,
      activeBudgets: 3,
      totalTransfers: 45,
      pendingTransfers: 8,
      storageUsed: 2500, // MB
      storageLimit: 5000, // MB
      apiCalls: 15420,
      uptime: 99.8,
    }
  }

  private static addAuditLog(
    action: string,
    entity: string,
    entityId: string | undefined,
    details: string,
    severity: AuditLog["severity"],
  ): void {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userId: "1", // Current user ID (simulated)
      userName: "Usuario Actual",
      action,
      entity,
      entityId,
      details,
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (simulated)",
      severity,
    }
    this.auditLogs.unshift(newLog)
  }

  static exportAuditLogs(format: "csv" | "json"): void {
    console.log(`Exportando logs de auditoría en formato ${format}`)
    alert(`Logs de auditoría exportados exitosamente en formato ${format.toUpperCase()}`)
  }

  static performBackup(): void {
    console.log("Realizando backup del sistema...")
    alert("Backup del sistema completado exitosamente")
    this.addAuditLog("SYSTEM_BACKUP", "Sistema", undefined, "Backup manual del sistema", "low")
  }
}
