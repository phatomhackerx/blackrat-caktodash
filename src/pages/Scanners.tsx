import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCerberusStore } from "@/store/cerberus-store"
import { 
  Search, 
  Play, 
  Target, 
  Clock, 
  Activity, 
  Settings,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"

const Scanners = () => {
  const { t } = useTranslation()
  const { addLog } = useCerberusStore()
  const [scanTarget, setScanTarget] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<any>(null)

  const scanTypes = [
    { 
      name: "Nmap TCP SYN", 
      command: "nmap -sS", 
      description: "Varredura stealth TCP SYN para detecção de portas abertas",
      speed: "Rápida",
      stealth: "Alta"
    },
    { 
      name: "Nmap UDP", 
      command: "nmap -sU", 
      description: "Varredura de portas UDP para serviços ocultos",
      speed: "Lenta",
      stealth: "Média"
    },
    { 
      name: "Nmap Agressivo", 
      command: "nmap -A", 
      description: "Detecção de SO, versão de serviços e scripts",
      speed: "Média",
      stealth: "Baixa"
    },
    { 
      name: "Masscan", 
      command: "masscan", 
      description: "Scanner de alta velocidade para grandes redes",
      speed: "Muito Rápida",
      stealth: "Baixa"
    },
    { 
      name: "Rustscan", 
      command: "rustscan", 
      description: "Scanner moderno com integração Nmap",
      speed: "Muito Rápida",
      stealth: "Média"
    },
    { 
      name: "Zmap", 
      command: "zmap", 
      description: "Scanner para toda a Internet",
      speed: "Extrema",
      stealth: "Baixa"
    }
  ]

  const [recentScans, setRecentScans] = useState([
    { 
      target: "192.168.1.0/24", 
      type: "TCP SYN", 
      status: "concluído", 
      time: "2m atrás", 
      ports: 12,
      vulnerabilities: 3
    },
    { 
      target: "10.0.0.50", 
      type: "Agressivo", 
      status: "executando", 
      time: "5m atrás", 
      ports: 8,
      vulnerabilities: 1
    },
    { 
      target: "company.com", 
      type: "UDP", 
      status: "concluído", 
      time: "1h atrás", 
      ports: 5,
      vulnerabilities: 0
    }
  ])

  const handleScan = () => {
    if (!scanTarget.trim()) return
    
    setIsScanning(true)
    addLog({
      level: 'info',
      source: 'Scanners',
      message: `Iniciando varredura em ${scanTarget}`
    })

    // Simulate scan
    setTimeout(() => {
      const mockResults = {
        target: scanTarget,
        openPorts: [
          { port: 22, service: "SSH", version: "OpenSSH 8.2" },
          { port: 80, service: "HTTP", version: "Apache 2.4.41" },
          { port: 443, service: "HTTPS", version: "nginx 1.18.0" },
          { port: 3306, service: "MySQL", version: "8.0.23" }
        ],
        os: "Linux 5.4.0-42-generic",
        vulnerabilities: 2
      }
      
      setScanResults(mockResults)
      setIsScanning(false)
      
      const newScan = {
        target: scanTarget,
        type: "TCP SYN",
        status: "concluído",
        time: "Agora",
        ports: mockResults.openPorts.length,
        vulnerabilities: mockResults.vulnerabilities
      }
      
      setRecentScans([newScan, ...recentScans])
      
      addLog({
        level: 'success',
        source: 'Scanners',
        message: `Varredura concluída: ${mockResults.openPorts.length} portas encontradas`
      })
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluído": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "executando": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "falha": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-foreground/10 text-foreground"
    }
  }

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case "Muito Rápida":
      case "Extrema": return "text-green-400"
      case "Rápida": return "text-blue-400"
      case "Média": return "text-yellow-400"
      case "Lenta": return "text-orange-400"
      default: return "text-foreground"
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative"
    >
      <StarfieldBackground />
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CerberusSidebar />
          
          <div className="flex-1 flex flex-col relative z-10">
            <header className="h-16 border-b border-foreground/10 bg-background/80 backdrop-blur-xl flex items-center px-4 md:px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-3">
                <Search className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h1 className="text-lg md:text-xl font-bold text-primary">
                  {t('scanners.title', 'Scanners de Rede')}
                </h1>
              </div>
            </header>

            <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
              {/* Quick Scan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                    <Target className="h-4 w-4 md:h-5 md:w-5" />
                    <span>{t('scanners.quickScan', 'Varredura Rápida')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder={t('scanners.targetPlaceholder', 'Digite o alvo (IP, range ou domínio)')}
                      value={scanTarget}
                      onChange={(e) => setScanTarget(e.target.value)}
                      className="flex-1"
                      disabled={isScanning}
                    />
                    <Button 
                      onClick={handleScan}
                      disabled={isScanning || !scanTarget.trim()}
                      className="w-full sm:w-auto"
                    >
                      {isScanning ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Escaneando...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Iniciar Varredura
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Scan Results */}
                  {scanResults && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-foreground/5 rounded-lg border border-foreground/10"
                    >
                      <h3 className="font-semibold text-primary mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                        Resultados da Varredura
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Alvo:</span>
                          <p className="font-mono text-foreground">{scanResults.target}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Sistema Operacional:</span>
                          <p className="font-mono text-foreground">{scanResults.os}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground mb-2 block">Portas Abertas:</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {scanResults.openPorts.map((port: any) => (
                              <div key={port.port} className="flex items-center justify-between p-2 bg-foreground/5 rounded border border-foreground/10">
                                <span className="font-mono text-primary">{port.port}/{port.service}</span>
                                <span className="text-xs text-muted-foreground">{port.version}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {scanResults.vulnerabilities > 0 && (
                          <div className="flex items-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                            <span className="text-sm text-yellow-400">
                              {scanResults.vulnerabilities} vulnerabilidades potenciais detectadas
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Scan Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">
                    {t('scanners.available', 'Scanners Disponíveis')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {scanTypes.map((scan) => (
                      <motion.div 
                        key={scan.name}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-foreground/5 border border-foreground/10 rounded-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
                      >
                        <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">{scan.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">
                          {scan.description}
                        </p>
                        <code className="text-xs font-mono bg-foreground/10 px-2 py-1 rounded block mb-3 overflow-x-auto">
                          {scan.command}
                        </code>
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <div>
                            <span className="text-muted-foreground">Velocidade: </span>
                            <span className={`font-medium ${getSpeedColor(scan.speed)}`}>
                              {scan.speed}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Stealth: </span>
                            <span className="font-medium text-foreground">{scan.stealth}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="h-3 w-3 mr-2" />
                          Configurar & Executar
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Scans */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                    <Clock className="h-4 w-4 md:h-5 md:w-5" />
                    <span>{t('scanners.recent', 'Varreduras Recentes')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentScans.map((scan, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-foreground/5 border border-foreground/10 rounded-lg hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-center space-x-3 md:space-x-4 mb-3 sm:mb-0">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            scan.status === 'executando' ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                          }`}></div>
                          <div className="min-w-0">
                            <p className="font-semibold font-mono text-foreground text-sm md:text-base truncate">
                              {scan.target}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground">{scan.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-4">
                          <Badge className={getStatusColor(scan.status)}>
                            {scan.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-xs md:text-sm text-muted-foreground">{scan.time}</p>
                            <p className="text-xs md:text-sm font-semibold text-foreground">
                              {scan.ports} portas
                            </p>
                          </div>
                          {scan.vulnerabilities > 0 && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              {scan.vulnerabilities} vuln
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </motion.div>
  )
}

export default Scanners