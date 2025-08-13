export interface BudgetItem {
  id: string
  code: string
  name: string
  category: string
  department: string
  budgetAmount: number
  spentAmount: number
  availableAmount: number
  percentage: number
  status: "healthy" | "warning" | "critical" | "exceeded"
  lastModified: string
  createdBy: string
}

export interface Budget {
  id: string
  name: string
  year: number
  status: "draft" | "active" | "closed" | "archived"
  totalBudget: number
  totalSpent: number
  totalAvailable: number
  currency: string
  createdAt: string
  createdBy: string
  lastModified: string
  items: BudgetItem[]
  approvals: BudgetApproval[]
}

export interface BudgetApproval {
  id: string
  budgetId: string
  approvedBy: string
  approvedAt: string
  status: "pending" | "approved" | "rejected"
  comments?: string
}

export interface BudgetTransfer {
  id: string
  fromItemId: string
  toItemId: string
  amount: number
  reason: string
  requestedBy: string
  requestedAt: string
  approvedBy?: string
  approvedAt?: string
  status: "pending" | "approved" | "rejected"
  comments?: string
}

// Mock data for demonstration
export const mockBudgets: Budget[] = [
  {
    id: "budget-2024",
    name: "Presupuesto Anual 2024",
    year: 2024,
    status: "active",
    totalBudget: 2400000,
    totalSpent: 1872000,
    totalAvailable: 528000,
    currency: "USD",
    createdAt: "2024-01-01T00:00:00Z",
    createdBy: "Carlos Administrador",
    lastModified: "2024-12-15T10:30:00Z",
    items: [
      {
        id: "item-1",
        code: "OP-001",
        name: "Operaciones Generales",
        category: "Operacional",
        department: "Operaciones",
        budgetAmount: 850000,
        spentAmount: 722500,
        availableAmount: 127500,
        percentage: 85,
        status: "warning",
        lastModified: "2024-12-15T08:00:00Z",
        createdBy: "María Financiera",
      },
      {
        id: "item-2",
        code: "MK-001",
        name: "Marketing Digital",
        category: "Marketing",
        department: "Marketing",
        budgetAmount: 320000,
        spentAmount: 198400,
        availableAmount: 121600,
        percentage: 62,
        status: "healthy",
        lastModified: "2024-12-15T09:15:00Z",
        createdBy: "María Financiera",
      },
      {
        id: "item-3",
        code: "TI-001",
        name: "Infraestructura Tecnológica",
        category: "Tecnología",
        department: "Tecnología",
        budgetAmount: 450000,
        spentAmount: 337500,
        availableAmount: 112500,
        percentage: 75,
        status: "healthy",
        lastModified: "2024-12-15T07:45:00Z",
        createdBy: "Carlos Administrador",
      },
      {
        id: "item-4",
        code: "RH-001",
        name: "Recursos Humanos",
        category: "Personal",
        department: "Recursos Humanos",
        budgetAmount: 280000,
        spentAmount: 266000,
        availableAmount: 14000,
        percentage: 95,
        status: "critical",
        lastModified: "2024-12-15T10:30:00Z",
        createdBy: "María Financiera",
      },
      {
        id: "item-5",
        code: "AD-001",
        name: "Administración General",
        category: "Administrativo",
        department: "Administración",
        budgetAmount: 180000,
        spentAmount: 126000,
        availableAmount: 54000,
        percentage: 70,
        status: "healthy",
        lastModified: "2024-12-14T16:20:00Z",
        createdBy: "Carlos Administrador",
      },
      {
        id: "item-6",
        code: "PU-001",
        name: "Publicidad Tradicional",
        category: "Marketing",
        department: "Marketing",
        budgetAmount: 150000,
        spentAmount: 87000,
        availableAmount: 63000,
        percentage: 58,
        status: "healthy",
        lastModified: "2024-12-13T14:10:00Z",
        createdBy: "María Financiera",
      },
    ],
    approvals: [
      {
        id: "approval-1",
        budgetId: "budget-2024",
        approvedBy: "Carlos Administrador",
        approvedAt: "2024-01-05T10:00:00Z",
        status: "approved",
        comments: "Presupuesto aprobado para el año fiscal 2024",
      },
    ],
  },
  {
    id: "budget-2025",
    name: "Presupuesto Anual 2025",
    year: 2025,
    status: "draft",
    totalBudget: 3200000,
    totalSpent: 0,
    totalAvailable: 3200000,
    currency: "USD",
    createdAt: "2024-12-01T00:00:00Z",
    createdBy: "María Financiera",
    lastModified: "2024-12-15T11:00:00Z",
    items: [],
    approvals: [],
  },
]

export const mockTransfers: BudgetTransfer[] = [
  {
    id: "transfer-1",
    fromItemId: "item-2",
    toItemId: "item-1",
    amount: 15000,
    reason: "Refuerzo para operaciones críticas",
    requestedBy: "María Financiera",
    requestedAt: "2024-12-15T08:00:00Z",
    approvedBy: "Carlos Administrador",
    approvedAt: "2024-12-15T10:00:00Z",
    status: "approved",
    comments: "Aprobado para cubrir gastos operacionales urgentes",
  },
  {
    id: "transfer-2",
    fromItemId: "item-5",
    toItemId: "item-4",
    amount: 25000,
    reason: "Contratación de personal adicional",
    requestedBy: "Juan Auditor",
    requestedAt: "2024-12-15T09:30:00Z",
    status: "pending",
  },
]

export class BudgetService {
  static getBudgets(): Budget[] {
    return mockBudgets
  }

  static getBudgetById(id: string): Budget | undefined {
    return mockBudgets.find((budget) => budget.id === id)
  }

  static getActiveBudget(): Budget | undefined {
    return mockBudgets.find((budget) => budget.status === "active")
  }

  static createBudget(budgetData: Partial<Budget>): Budget {
    const newBudget: Budget = {
      id: `budget-${Date.now()}`,
      name: budgetData.name || "Nuevo Presupuesto",
      year: budgetData.year || new Date().getFullYear(),
      status: "draft",
      totalBudget: 0,
      totalSpent: 0,
      totalAvailable: 0,
      currency: "USD",
      createdAt: new Date().toISOString(),
      createdBy: "Usuario Actual",
      lastModified: new Date().toISOString(),
      items: [],
      approvals: [],
      ...budgetData,
    }

    mockBudgets.push(newBudget)
    return newBudget
  }

  static updateBudget(id: string, updates: Partial<Budget>): Budget | null {
    const budgetIndex = mockBudgets.findIndex((budget) => budget.id === id)
    if (budgetIndex === -1) return null

    mockBudgets[budgetIndex] = {
      ...mockBudgets[budgetIndex],
      ...updates,
      lastModified: new Date().toISOString(),
    }

    return mockBudgets[budgetIndex]
  }

  static deleteBudget(id: string): boolean {
    const budgetIndex = mockBudgets.findIndex((budget) => budget.id === id)
    if (budgetIndex === -1) return false

    mockBudgets.splice(budgetIndex, 1)
    return true
  }

  static addBudgetItem(budgetId: string, item: Omit<BudgetItem, "id">): BudgetItem | null {
    const budget = this.getBudgetById(budgetId)
    if (!budget) return null

    const newItem: BudgetItem = {
      ...item,
      id: `item-${Date.now()}`,
      availableAmount: item.budgetAmount - item.spentAmount,
      percentage: item.budgetAmount > 0 ? Math.round((item.spentAmount / item.budgetAmount) * 100) : 0,
      status: this.calculateItemStatus(item.spentAmount, item.budgetAmount),
      lastModified: new Date().toISOString(),
    }

    budget.items.push(newItem)
    this.recalculateBudgetTotals(budgetId)
    return newItem
  }

  static updateBudgetItem(budgetId: string, itemId: string, updates: Partial<BudgetItem>): BudgetItem | null {
    const budget = this.getBudgetById(budgetId)
    if (!budget) return null

    const itemIndex = budget.items.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) return null

    const updatedItem = {
      ...budget.items[itemIndex],
      ...updates,
      lastModified: new Date().toISOString(),
    }

    // Recalculate derived fields
    updatedItem.availableAmount = updatedItem.budgetAmount - updatedItem.spentAmount
    updatedItem.percentage =
      updatedItem.budgetAmount > 0 ? Math.round((updatedItem.spentAmount / updatedItem.budgetAmount) * 100) : 0
    updatedItem.status = this.calculateItemStatus(updatedItem.spentAmount, updatedItem.budgetAmount)

    budget.items[itemIndex] = updatedItem
    this.recalculateBudgetTotals(budgetId)
    return updatedItem
  }

  static deleteBudgetItem(budgetId: string, itemId: string): boolean {
    const budget = this.getBudgetById(budgetId)
    if (!budget) return false

    const itemIndex = budget.items.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) return false

    budget.items.splice(itemIndex, 1)
    this.recalculateBudgetTotals(budgetId)
    return true
  }

  static getTransfers(): BudgetTransfer[] {
    return mockTransfers
  }

  static createTransfer(transferData: Omit<BudgetTransfer, "id" | "requestedAt" | "status">): BudgetTransfer {
    const newTransfer: BudgetTransfer = {
      ...transferData,
      id: `transfer-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      status: "pending",
    }

    mockTransfers.push(newTransfer)
    return newTransfer
  }

  static approveTransfer(transferId: string, approvedBy: string, comments?: string): BudgetTransfer | null {
    const transfer = mockTransfers.find((t) => t.id === transferId)
    if (!transfer) return null

    transfer.status = "approved"
    transfer.approvedBy = approvedBy
    transfer.approvedAt = new Date().toISOString()
    if (comments) transfer.comments = comments

    // Apply the transfer to budget items
    this.applyTransfer(transfer)
    return transfer
  }

  static rejectTransfer(transferId: string, comments?: string): BudgetTransfer | null {
    const transfer = mockTransfers.find((t) => t.id === transferId)
    if (!transfer) return null

    transfer.status = "rejected"
    if (comments) transfer.comments = comments
    return transfer
  }

  private static applyTransfer(transfer: BudgetTransfer): void {
    // Find the budget items and apply the transfer
    const activeBudget = this.getActiveBudget()
    if (!activeBudget) return

    const fromItem = activeBudget.items.find((item) => item.id === transfer.fromItemId)
    const toItem = activeBudget.items.find((item) => item.id === transfer.toItemId)

    if (fromItem && toItem) {
      fromItem.budgetAmount -= transfer.amount
      toItem.budgetAmount += transfer.amount

      // Recalculate derived fields
      fromItem.availableAmount = fromItem.budgetAmount - fromItem.spentAmount
      fromItem.percentage =
        fromItem.budgetAmount > 0 ? Math.round((fromItem.spentAmount / fromItem.budgetAmount) * 100) : 0
      fromItem.status = this.calculateItemStatus(fromItem.spentAmount, fromItem.budgetAmount)

      toItem.availableAmount = toItem.budgetAmount - toItem.spentAmount
      toItem.percentage = toItem.budgetAmount > 0 ? Math.round((toItem.spentAmount / toItem.budgetAmount) * 100) : 0
      toItem.status = this.calculateItemStatus(toItem.spentAmount, toItem.budgetAmount)

      fromItem.lastModified = new Date().toISOString()
      toItem.lastModified = new Date().toISOString()
    }
  }

  private static calculateItemStatus(spent: number, budget: number): BudgetItem["status"] {
    if (budget === 0) return "healthy"
    const percentage = (spent / budget) * 100

    if (percentage > 100) return "exceeded"
    if (percentage >= 90) return "critical"
    if (percentage >= 75) return "warning"
    return "healthy"
  }

  private static recalculateBudgetTotals(budgetId: string): void {
    const budget = this.getBudgetById(budgetId)
    if (!budget) return

    budget.totalBudget = budget.items.reduce((sum, item) => sum + item.budgetAmount, 0)
    budget.totalSpent = budget.items.reduce((sum, item) => sum + item.spentAmount, 0)
    budget.totalAvailable = budget.totalBudget - budget.totalSpent
    budget.lastModified = new Date().toISOString()
  }

  static importFromExcel(
    budgetId: string,
    file: File,
  ): Promise<{ success: boolean; message: string; items?: BudgetItem[] }> {
    // Simulate Excel import process
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful import
        const mockImportedItems: Omit<BudgetItem, "id">[] = [
          {
            code: "IMP-001",
            name: "Partida Importada 1",
            category: "Importado",
            department: "Varios",
            budgetAmount: 50000,
            spentAmount: 0,
            availableAmount: 50000,
            percentage: 0,
            status: "healthy",
            lastModified: new Date().toISOString(),
            createdBy: "Importación Excel",
          },
          {
            code: "IMP-002",
            name: "Partida Importada 2",
            category: "Importado",
            department: "Varios",
            budgetAmount: 75000,
            spentAmount: 0,
            availableAmount: 75000,
            percentage: 0,
            status: "healthy",
            lastModified: new Date().toISOString(),
            createdBy: "Importación Excel",
          },
        ]

        const addedItems: BudgetItem[] = []
        mockImportedItems.forEach((item) => {
          const addedItem = this.addBudgetItem(budgetId, item)
          if (addedItem) addedItems.push(addedItem)
        })

        resolve({
          success: true,
          message: `Se importaron ${addedItems.length} partidas correctamente`,
          items: addedItems,
        })
      }, 2000) // Simulate processing time
    })
  }
}
