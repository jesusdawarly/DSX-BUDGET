export interface ReportData {
  id: string
  name: string
  type: "execution" | "transfers" | "audit" | "custom"
  description: string
  createdAt: string
  createdBy: string
  data: any
  filters: ReportFilters
}

export interface ReportFilters {
  dateFrom?: string
  dateTo?: string
  budgetId?: string
  itemIds?: string[]
  status?: string
  category?: string
}

export interface ExecutionData {
  month: string
  budgeted: number
  executed: number
  remaining: number
  percentage: number
}

export interface TransferData {
  month: string
  approved: number
  pending: number
  rejected: number
  total: number
}

export interface AuditData {
  date: string
  user: string
  action: string
  entity: string
  details: string
  impact: "low" | "medium" | "high"
}

export class ReportsService {
  private static reports: ReportData[] = [
    {
      id: "1",
      name: "Ejecución Presupuestaria Q1 2024",
      type: "execution",
      description: "Reporte de ejecución del primer trimestre",
      createdAt: "2024-03-31T10:00:00Z",
      createdBy: "María González",
      data: {},
      filters: {
        dateFrom: "2024-01-01",
        dateTo: "2024-03-31",
        budgetId: "1",
      },
    },
    {
      id: "2",
      name: "Traspasos Marzo 2024",
      type: "transfers",
      description: "Análisis de traspasos del mes de marzo",
      createdAt: "2024-03-31T15:30:00Z",
      createdBy: "Carlos Rodríguez",
      data: {},
      filters: {
        dateFrom: "2024-03-01",
        dateTo: "2024-03-31",
      },
    },
    {
      id: "3",
      name: "Auditoría de Cambios",
      type: "audit",
      description: "Registro de cambios y modificaciones",
      createdAt: "2024-03-30T09:15:00Z",
      createdBy: "Ana Martínez",
      data: {},
      filters: {
        dateFrom: "2024-03-01",
        dateTo: "2024-03-30",
      },
    },
  ]

  static getReports(): ReportData[] {
    return this.reports
  }

  static getExecutionData(): ExecutionData[] {
    return [
      { month: "Ene", budgeted: 1000000, executed: 850000, remaining: 150000, percentage: 85 },
      { month: "Feb", budgeted: 1200000, executed: 1100000, remaining: 100000, percentage: 92 },
      { month: "Mar", budgeted: 1100000, executed: 950000, remaining: 150000, percentage: 86 },
      { month: "Abr", budgeted: 1300000, executed: 1200000, remaining: 100000, percentage: 92 },
      { month: "May", budgeted: 1150000, executed: 980000, remaining: 170000, percentage: 85 },
      { month: "Jun", budgeted: 1250000, executed: 1180000, remaining: 70000, percentage: 94 },
    ]
  }

  static getTransferData(): TransferData[] {
    return [
      { month: "Ene", approved: 15, pending: 3, rejected: 2, total: 20 },
      { month: "Feb", approved: 22, pending: 5, rejected: 1, total: 28 },
      { month: "Mar", approved: 18, pending: 7, rejected: 3, total: 28 },
      { month: "Abr", approved: 25, pending: 4, rejected: 2, total: 31 },
      { month: "May", approved: 20, pending: 6, rejected: 1, total: 27 },
      { month: "Jun", approved: 19, pending: 8, rejected: 2, total: 29 },
    ]
  }

  static getAuditData(): AuditData[] {
    return [
      {
        date: "2024-03-30T14:30:00Z",
        user: "María González",
        action: "Modificar presupuesto",
        entity: "Presupuesto 2024",
        details: "Actualización de partida 001-2024",
        impact: "medium",
      },
      {
        date: "2024-03-30T11:15:00Z",
        user: "Carlos Rodríguez",
        action: "Aprobar traspaso",
        entity: "Traspaso #TR-2024-045",
        details: "Traspaso de $50,000 entre partidas",
        impact: "high",
      },
      {
        date: "2024-03-29T16:45:00Z",
        user: "Ana Martínez",
        action: "Crear usuario",
        entity: "Usuario: jperez",
        details: "Nuevo usuario con rol financiero",
        impact: "low",
      },
      {
        date: "2024-03-29T09:20:00Z",
        user: "María González",
        action: "Exportar reporte",
        entity: "Reporte de ejecución",
        details: "Exportación a Excel del Q1 2024",
        impact: "low",
      },
    ]
  }

  static generateReport(type: string, filters: ReportFilters): ReportData {
    const newReport: ReportData = {
      id: Date.now().toString(),
      name: `Reporte ${type} - ${new Date().toLocaleDateString("es-DO")}`,
      type: type as any,
      description: `Reporte generado automáticamente`,
      createdAt: new Date().toISOString(),
      createdBy: "Usuario actual",
      data: {},
      filters,
    }

    this.reports.unshift(newReport)
    return newReport
  }

  static exportReport(reportId: string, format: "excel" | "pdf"): void {
    // Simulate export functionality
    console.log(`Exportando reporte ${reportId} en formato ${format}`)
    alert(`Reporte exportado exitosamente en formato ${format.toUpperCase()}`)
  }

  static deleteReport(reportId: string): void {
    this.reports = this.reports.filter((r) => r.id !== reportId)
  }
}
