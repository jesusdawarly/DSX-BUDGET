export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
        </div>
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  )
}
