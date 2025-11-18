import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Shield, 
  Code,
  Palette,
  Globe,
  Smartphone,
  ArrowRight
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const Documentation = () => {
  const navigate = useNavigate()

  const mainPages = [
    { 
      name: "Dashboard", 
      route: "/", 
      status: "✅ Completo",
      features: ["Estatísticas em tempo real", "Quick access", "Gráficos", "Terminal integrado"]
    },
    { 
      name: "Scanners", 
      route: "/scanners", 
      status: "✅ Completo",
      features: ["6 tipos de scanners", "Resultados detalhados", "Export de dados"]
    },
    { 
      name: "Exploits", 
      route: "/exploits", 
      status: "✅ Completo",
      features: ["847+ exploits", "Categorias organizadas", "CVE tracking"]
    },
    { 
      name: "Phishing", 
      route: "/phishing", 
      status: "✅ Completo",
      features: ["4 templates profissionais", "Campanhas ativas", "Métricas em tempo real"]
    },
    { 
      name: "Payloads", 
      route: "/payloads", 
      status: "✅ Completo",
      features: ["Arsenal completo", "Download de payloads", "Generator customizado"]
    },
    { 
      name: "Terminal", 
      route: "/terminal", 
      status: "✅ Completo",
      features: ["15+ comandos", "Múltiplas sessões", "Output colorido"]
    },
    { 
      name: "Monitoring", 
      route: "/monitoring", 
      status: "✅ Completo",
      features: ["Métricas em tempo real", "Sistema de alertas", "Performance tracking"]
    },
    { 
      name: "Watchlist", 
      route: "/watchlist", 
      status: "✅ Completo",
      features: ["Gestão de alvos", "Status tracking", "Risk assessment"]
    },
    { 
      name: "Network", 
      route: "/network", 
      status: "✅ Completo",
      features: ["Topology visualization", "Device discovery", "Traffic stats"]
    },
    { 
      name: "Logs", 
      route: "/logs", 
      status: "✅ Completo",
      features: ["Filtros avançados", "Export JSON", "Real-time updates"]
    },
    { 
      name: "OSINT", 
      route: "/osint", 
      status: "✅ Completo",
      features: ["4 categorias", "Domain analysis", "Dark web monitoring"]
    }
  ]

  const tools = [
    { name: "Port Scanner", route: "/tools/port-scanner", difficulty: "Fácil" },
    { name: "Vulnerability Scanner", route: "/tools/vulnerability-scanner", difficulty: "Médio" },
    { name: "Payload Generator", route: "/tools/payload-generator", difficulty: "Médio" },
    { name: "Hash Cracker", route: "/tools/hash-cracker", difficulty: "Avançado" },
    { name: "SQL Injection", route: "/tools/sql-injection", difficulty: "Avançado" },
    { name: "XSS Tester", route: "/tools/xss-tester", difficulty: "Médio" },
    { name: "DNS Enumeration", route: "/tools/dns-enumeration", difficulty: "Fácil" },
    { name: "WHOIS Lookup", route: "/tools/whois-lookup", difficulty: "Fácil" },
    { name: "Subdomain Finder", route: "/tools/subdomain-finder", difficulty: "Médio" },
    { name: "Email Harvester", route: "/tools/email-harvester", difficulty: "Médio" }
  ]

  const stats = [
    { label: "Total de Páginas", value: "23", icon: Layers },
    { label: "Ferramentas", value: "10", icon: Zap },
    { label: "Componentes", value: "60+", icon: Code },
    { label: "Idiomas", value: "2", icon: Globe }
  ]

  const features = [
    {
      title: "Design System Completo",
      icon: Palette,
      items: ["Tokens semânticos", "Glassmorphism style", "Animações fluidas", "Dark theme"]
    },
    {
      title: "Componentes Reutilizáveis",
      icon: Code,
      items: ["shadcn/ui base", "Custom components", "Tool layouts", "Form elements"]
    },
    {
      title: "Segurança & Performance",
      icon: Shield,
      items: ["Estado global (Zustand)", "React Router", "Lazy loading", "Optimized renders"]
    },
    {
      title: "Responsividade Total",
      icon: Smartphone,
      items: ["Mobile first", "Tablet optimized", "Desktop enhanced", "Touch friendly"]
    }
  ]

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Fácil': return 'bg-green-900/50 text-green-400 border-green-800'
      case 'Médio': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'Avançado': return 'bg-red-900/50 text-red-400 border-red-800'
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <StarfieldBackground />
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CerberusSidebar />
          
          <div className="flex-1 flex flex-col relative z-10">
            <header className="h-16 border-b border-foreground/10 bg-background/80 backdrop-blur-xl flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Documentação do Projeto</h1>
                <Badge className="bg-green-900/50 text-green-400 border-green-800">
                  100% Completo
                </Badge>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Stats Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
                          </div>
                          <stat.icon className="h-8 w-8 text-primary/50" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border h-full">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <feature.icon className="h-5 w-5 text-primary" />
                          <span>{feature.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feature.items.map((item, i) => (
                            <li key={i} className="flex items-center space-x-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Main Pages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <Layers className="h-6 w-6 text-primary" />
                      <span>Páginas Principais ({mainPages.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mainPages.map((page, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9 + index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          className="group"
                        >
                          <Card className="bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                                onClick={() => navigate(page.route)}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {page.name}
                                </h3>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <Badge className="bg-green-900/50 text-green-400 border-green-800 mb-3">
                                {page.status}
                              </Badge>
                              <ul className="space-y-1">
                                {page.features.map((feature, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-center space-x-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-400" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-primary" />
                      <span>Ferramentas Dedicadas ({tools.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                      {tools.map((tool, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.1 + index * 0.03 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-auto p-4 flex flex-col items-start space-y-2 bg-background/50 hover:bg-background/80 hover:border-primary/50"
                            onClick={() => navigate(tool.route)}
                          >
                            <span className="font-semibold text-sm">{tool.name}</span>
                            <Badge className={getDifficultyColor(tool.difficulty)}>
                              {tool.difficulty}
                            </Badge>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 backdrop-blur-glass border border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-primary" />
                      <span>Próximos Passos: Backend Integration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Backend Essencial:</h4>
                        <ul className="space-y-1">
                          {["Autenticação (JWT)", "Database (PostgreSQL/MySQL)", "API Real (substituir mocks)", "File Storage", "WebSockets"].map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Integrações:</h4>
                        <ul className="space-y-1">
                          {["Scanners Reais (Nmap, Masscan)", "Email Service (Phishing)", "Cron Jobs (Scans agendados)", "Notifications (Push, Email)", "Security (CSRF, XSS, Rate limiting)"].map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Documentation
