import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight, BookOpen, TrendingUp, Shield, Zap } from "lucide-react"

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: "Guía Completa: Cómo Implementar un Presupuesto Empresarial Efectivo",
      excerpt:
        "Descubre los pasos fundamentales para crear y gestionar presupuestos que impulsen el crecimiento de tu empresa.",
      category: "Gestión Financiera",
      author: "Equipo DSX",
      date: "15 Dic 2024",
      readTime: "8 min",
      featured: true,
    },
    {
      id: 2,
      title: "5 Errores Comunes en la Gestión Presupuestaria y Cómo Evitarlos",
      excerpt:
        "Aprende de los errores más frecuentes que cometen las empresas al manejar sus presupuestos y cómo DSX te ayuda a evitarlos.",
      category: "Mejores Prácticas",
      author: "Equipo DSX",
      date: "12 Dic 2024",
      readTime: "6 min",
      featured: false,
    },
    {
      id: 3,
      title: "Transformación Digital en las Finanzas: El Caso Dominicano",
      excerpt: "Cómo las empresas dominicanas están adoptando tecnología para modernizar su gestión financiera.",
      category: "Casos de Éxito",
      author: "Equipo DSX",
      date: "10 Dic 2024",
      readTime: "10 min",
      featured: false,
    },
    {
      id: 4,
      title: "Seguridad en la Gestión Presupuestaria: Protege tus Datos Financieros",
      excerpt:
        "Todo lo que necesitas saber sobre seguridad financiera y cómo DSX protege la información más sensible de tu empresa.",
      category: "Seguridad",
      author: "Equipo DSX",
      date: "8 Dic 2024",
      readTime: "7 min",
      featured: false,
    },
  ]

  const resources = [
    {
      title: "Plantilla de Presupuesto Anual",
      description: "Plantilla Excel gratuita para crear tu presupuesto empresarial",
      type: "Excel",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Checklist de Implementación",
      description: "Lista de verificación para implementar DSX en tu empresa",
      type: "PDF",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Guía de Mejores Prácticas",
      description: "Manual completo de gestión presupuestaria empresarial",
      type: "PDF",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">D</span>
                </div>
                <span className="text-xl font-bold text-[#222222]">DSX</span>
                <span className="text-sm text-gray-600 hidden sm:inline">Dawarly</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/#features" className="text-gray-700 hover:text-[#222222] transition-colors">
                Características
              </a>
              <a href="/#pricing" className="text-gray-700 hover:text-[#222222] transition-colors">
                Precios
              </a>
              <a href="/blog" className="text-[#222222] font-semibold">
                Blog
              </a>
              <a href="/#about" className="text-gray-700 hover:text-[#222222] transition-colors">
                Nosotros
              </a>
              <Button
                variant="outline"
                className="border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white bg-transparent"
              >
                Iniciar Sesión
              </Button>
              <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600] font-semibold">Prueba Gratis</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-[#ccff00] text-black font-semibold">Blog y Recursos</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#222222]">
              Conocimiento que Transforma
              <span className="block text-[#ccff00]">tu Gestión Financiera</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre guías, mejores prácticas y recursos gratuitos para optimizar la gestión presupuestaria de tu
              empresa con la experiencia dominicana de DSX.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {articles
        .filter((article) => article.featured)
        .map((article) => (
          <section key={article.id} className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge className="bg-[#ccff00] text-black font-semibold">Artículo Destacado</Badge>
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#222222] leading-tight">{article.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime} lectura</span>
                    </div>
                  </div>
                  <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600] font-semibold">
                    Leer Artículo Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Card className="bg-white shadow-xl border-2 border-gray-200">
                    <div className="aspect-video bg-gradient-to-br from-[#ccff00] to-[#b8e600] rounded-t-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <BookOpen className="h-16 w-16 text-black mx-auto" />
                        <p className="text-black font-semibold">Guía Completa</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge className="bg-blue-100 text-blue-800 mb-3">{article.category}</Badge>
                      <h3 className="font-bold text-[#222222] mb-2">Vista Previa del Contenido</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Planificación estratégica de presupuestos</li>
                        <li>• Herramientas y metodologías probadas</li>
                        <li>• Casos de éxito empresariales</li>
                        <li>• Implementación paso a paso</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        ))}

      {/* Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222222]">Últimos Artículos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mantente al día con las últimas tendencias y mejores prácticas en gestión presupuestaria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles
              .filter((article) => !article.featured)
              .map((article) => (
                <Card key={article.id} className="border-2 hover:border-[#ccff00] transition-colors cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      {article.category === "Mejores Prácticas" && <Zap className="h-12 w-12 text-[#ccff00] mx-auto" />}
                      {article.category === "Casos de Éxito" && (
                        <TrendingUp className="h-12 w-12 text-[#ccff00] mx-auto" />
                      )}
                      {article.category === "Seguridad" && <Shield className="h-12 w-12 text-[#ccff00] mx-auto" />}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="space-y-2">
                      <Badge className="bg-gray-100 text-gray-800 w-fit">{article.category}</Badge>
                      <CardTitle className="text-[#222222] leading-tight">{article.title}</CardTitle>
                      <CardDescription className="text-gray-600">{article.excerpt}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#ccff00] hover:text-black hover:bg-[#ccff00]">
                        Leer más
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-[#ccff00] text-black font-semibold">Recursos Gratuitos</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222222]">Herramientas para tu Éxito</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descarga recursos gratuitos creados por nuestro equipo para impulsar tu gestión presupuestaria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="border-2 hover:border-[#ccff00] transition-colors text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#ccff00] rounded-full flex items-center justify-center mx-auto mb-4">
                    {resource.icon}
                  </div>
                  <CardTitle className="text-[#222222]">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Badge className="bg-gray-100 text-gray-800">{resource.type}</Badge>
                    <Button className="w-full bg-[#ccff00] text-black hover:bg-[#b8e600] font-semibold">
                      Descargar Gratis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-[#222222] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">No Te Pierdas Nuestras Actualizaciones</h2>
            <p className="text-xl text-gray-300">
              Recibe los últimos artículos, recursos y noticias sobre DSX directamente en tu bandeja de entrada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:border-transparent"
              />
              <Button className="bg-[#ccff00] text-black hover:bg-[#b8e600] font-semibold px-6">Suscribirse</Button>
            </div>
            <p className="text-sm text-gray-400">Sin spam. Cancela tu suscripción en cualquier momento.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#222222] text-white border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">DSX</span>
              <span className="text-sm text-gray-400">by Dawarly</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/" className="hover:text-[#ccff00] transition-colors">
                Inicio
              </a>
              <a href="/#about" className="hover:text-[#ccff00] transition-colors">
                Nosotros
              </a>
              <a href="/#pricing" className="hover:text-[#ccff00] transition-colors">
                Precios
              </a>
              <a href="/blog" className="hover:text-[#ccff00] transition-colors">
                Blog
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Powered by DSX · Dawarly Software de Gestión Presupuestaria 🇩🇴</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
