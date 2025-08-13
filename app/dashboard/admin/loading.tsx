export default function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600">Cargando panel de administración...</p>
      </div>
    </div>
  )
}
