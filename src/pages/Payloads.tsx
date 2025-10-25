import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCerberusStore } from "@/store/cerberus-store"
import { Package, Download, Code, Shield, Skull, Wifi } from "lucide-react"

const Payloads = () => {
  const { addLog } = useCerberusStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const payloadTypes = [
    { name: "Reverse Shell", count: 145, icon: Code, description: "Payloads de acesso remoto" },
    { name: "Keylogger", count: 67, icon: Shield, description: "Ferramentas de captura" }, 
    { name: "Backdoor", count: 89, icon: Skull, description: "Backdoors persistentes" },
    { name: "Ferramentas de Rede", count: 123, icon: Wifi, description: "Ferramentas de infiltração" }
  ]

  const featuredPayloads = [
    {
      name: "Python Reverse Shell",
      type: "Reverse Shell",
      platform: "Linux/Windows/macOS",
      size: "2.3 KB",
      downloads: 1247,
      description: "Cross-platform reverse shell with encryption",
      language: "Python"
    },
    {
      name: "PowerShell Empire Agent", 
      type: "Post-Exploitation",
      platform: "Windows",
      size: "45.7 KB", 
      downloads: 892,
      description: "PowerShell-based post-exploitation agent",
      language: "PowerShell"
    },
    {
      name: "Metasploit Meterpreter",
      type: "Advanced Payload",
      platform: "Multi-platform",
      size: "1.2 MB",
      downloads: 2156,
      description: "Advanced multi-stage payload with C2",
      language: "C/Assembly"
    },
    {
      name: "Web Shell (PHP)",
      type: "Web Backdoor", 
      platform: "Web Servers",
      size: "8.9 KB",
      downloads: 567,
      description: "Minimal PHP web shell for web app compromise",
      language: "PHP"
    }
  ]

  const recentActivity = [
    { action: "Payload generated", name: "Custom TCP Shell", user: "admin", time: "5m ago" },
    { action: "Payload deployed", name: "PowerShell Agent", user: "redteam1", time: "15m ago" },
    { action: "Callback received", name: "Python Reverse Shell", user: "operator", time: "1h ago" }
  ]

  const downloadPayload = (payload: any) => {
    addLog({
      level: 'info',
      source: 'Payloads',
      message: `Baixando payload: ${payload.name}`
    })
    
    setTimeout(() => {
      addLog({
        level: 'success',
        source: 'Payloads',
        message: `Payload ${payload.name} baixado com sucesso`
      })
    }, 1000)
  }

  const generateCustomPayload = () => {
    setIsGenerating(true)
    addLog({
      level: 'info',
      source: 'Payloads',
      message: 'Iniciando gerador de payload personalizado'
    })
    
    setTimeout(() => {
      setIsGenerating(false)
      addLog({
        level: 'success',
        source: 'Payloads',
        message: 'Payload personalizado gerado com sucesso'
      })
    }, 3000)
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Python': return 'bg-blue-900/50 text-blue-400 border-blue-800'
      case 'PowerShell': return 'bg-purple-900/50 text-purple-400 border-purple-800'
      case 'C/Assembly': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'PHP': return 'bg-green-900/50 text-green-400 border-green-800'
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
                <Package className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Payload Arsenal</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Search & Generate */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardContent className="pt-6">
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Search payloads by type, platform, or language..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-terminal-bg border-glass-border text-primary"
                    />
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Buscar
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-glass-border hover:border-primary/30"
                      onClick={generateCustomPayload}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Gerando...' : 'Gerar Personalizado'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payload Types */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Payload Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {payloadTypes.map((type) => (
                      <div key={type.name} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-2">
                          <type.icon className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-foreground">{type.name}</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">{type.count}</p>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Payloads */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Featured Payloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredPayloads.map((payload) => (
                      <div key={payload.name} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground">{payload.name}</h3>
                            <Badge className={getLanguageColor(payload.language)}>
                              {payload.language}
                            </Badge>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-glass-border hover:border-primary/30"
                            onClick={() => downloadPayload(payload)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Baixar
                          </Button>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{payload.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="text-foreground">{payload.type}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Platform:</span>
                            <span className="text-foreground">{payload.platform}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="text-foreground">{payload.size}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Downloads:</span>
                            <span className="text-primary font-semibold">{payload.downloads.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-glass-border hover:border-primary/30"
                            onClick={() => addLog({
                              level: 'info',
                              source: 'Payloads',
                              message: `Visualizando código do payload: ${payload.name}`
                            })}
                          >
                            Ver Código
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => addLog({
                              level: 'info',
                              source: 'Payloads',
                              message: `Configurando payload: ${payload.name}`
                            })}
                          >
                            Configurar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
                          <div>
                            <p className="font-semibold text-foreground">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.name} • by {activity.user}</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Payloads