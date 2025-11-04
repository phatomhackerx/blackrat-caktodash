import { useState } from "react"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { ToolDetailLayout, ToolSection, ResultsPanel } from "@/components/ToolDetailLayout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useCerberusStore } from "@/store/cerberus-store"
import { Network, Activity, Shield, Settings } from "lucide-react"

export default function PortScannerTool() {
  const { addLog } = useCerberusStore()
  const [target, setTarget] = useState("")
  const [scanType, setScanType] = useState("quick")
  const [portRange, setPortRange] = useState("1-1000")
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any[]>([])

  const mockResults = [
    { port: 22, service: "SSH", state: "open", version: "OpenSSH 8.2p1", risk: "Medium" },
    { port: 80, service: "HTTP", state: "open", version: "Apache 2.4.41", risk: "Low" },
    { port: 443, service: "HTTPS", state: "open", version: "nginx 1.18.0", risk: "Low" },
    { port: 3306, service: "MySQL", state: "open", version: "MySQL 8.0.28", risk: "High" },
    { port: 8080, service: "HTTP-Proxy", state: "open", version: "Tomcat 9.0", risk: "Medium" },
    { port: 21, service: "FTP", state: "closed", version: "-", risk: "-" },
    { port: 23, service: "Telnet", state: "filtered", version: "-", risk: "-" },
    { port: 3389, service: "RDP", state: "open", version: "Windows RDP", risk: "High" },
  ]

  const executePortScan = async () => {
    if (!target.trim()) {
      addLog({ level: 'warning', source: 'Port Scanner', message: 'Digite um alvo válido' })
      return
    }

    setIsScanning(true)
    setProgress(0)
    setResults([])

    addLog({
      level: 'info',
      source: 'Port Scanner',
      message: `Iniciando scan de portas em ${target} (tipo: ${scanType})`
    })

    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setProgress(i)
    }

    setResults(mockResults)
    setIsScanning(false)

    addLog({
      level: 'success',
      source: 'Port Scanner',
      message: `Scan concluído: ${mockResults.filter(r => r.state === 'open').length} portas abertas encontradas`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `port_scan_${target}_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'Port Scanner', message: 'Resultados exportados com sucesso' })
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'Medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'Low': return 'bg-green-900/50 text-green-400 border-green-800'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case 'open': return 'text-green-400'
      case 'closed': return 'text-muted-foreground'
      case 'filtered': return 'text-yellow-400'
      default: return 'text-foreground'
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
            </header>

            <main className="flex-1 p-6">
              <ToolDetailLayout
                title="Port Scanner"
                description="Escaneie portas abertas em um alvo específico para identificar serviços em execução e possíveis vulnerabilidades."
                icon={<Network className="h-6 w-6 text-primary" />}
                category="Network Analysis"
                difficulty="Easy"
                onExecute={executePortScan}
                onExport={results.length > 0 ? exportResults : undefined}
                isExecuting={isScanning}
                hasResults={results.length > 0}
              >
                {/* Configuration Section */}
                <ToolSection title="Configuração" icon={<Settings className="h-5 w-5" />}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target">Alvo (IP ou Domínio)</Label>
                        <Input
                          id="target"
                          placeholder="192.168.1.1 ou example.com"
                          value={target}
                          onChange={(e) => setTarget(e.target.value)}
                          className="bg-terminal-bg border-glass-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scanType">Tipo de Scan</Label>
                        <Select value={scanType} onValueChange={setScanType}>
                          <SelectTrigger id="scanType" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quick">Quick Scan (Top 100 portas)</SelectItem>
                            <SelectItem value="full">Full Scan (Todas as portas)</SelectItem>
                            <SelectItem value="stealth">Stealth Scan (SYN)</SelectItem>
                            <SelectItem value="aggressive">Aggressive Scan (Detalhado)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portRange">Range de Portas</Label>
                      <Input
                        id="portRange"
                        placeholder="1-1000 ou 80,443,8080"
                        value={portRange}
                        onChange={(e) => setPortRange(e.target.value)}
                        className="bg-terminal-bg border-glass-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use formato: 1-1000 ou portas específicas separadas por vírgula
                      </p>
                    </div>
                  </div>
                </ToolSection>

                {/* Progress Section */}
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ToolSection title="Progresso do Scan" icon={<Activity className="h-5 w-5" />}>
                      <div className="space-y-3">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Scaneando portas...</span>
                          <span className="text-primary font-semibold">{progress}%</span>
                        </div>
                      </div>
                    </ToolSection>
                  </motion.div>
                )}

                {/* Results Section */}
                {results.length > 0 ? (
                  <ResultsPanel>
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground">Portas Abertas</p>
                          <p className="text-2xl font-bold text-green-400">
                            {results.filter(r => r.state === 'open').length}
                          </p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground">Portas Filtradas</p>
                          <p className="text-2xl font-bold text-yellow-400">
                            {results.filter(r => r.state === 'filtered').length}
                          </p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground">Risco Alto</p>
                          <p className="text-2xl font-bold text-red-400">
                            {results.filter(r => r.risk === 'High').length}
                          </p>
                        </div>
                      </div>

                      {/* Port List */}
                      <div className="space-y-2">
                        {results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-3 bg-foreground/5 rounded-lg border border-glass-border hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-2xl font-mono font-bold text-primary w-16">
                                {result.port}
                              </span>
                              <div>
                                <p className="font-semibold text-foreground">{result.service}</p>
                                <p className="text-sm text-muted-foreground">{result.version}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={`${getStateColor(result.state)} border-0`}>
                                {result.state}
                              </Badge>
                              {result.risk !== '-' && (
                                <Badge className={getRiskColor(result.risk)}>
                                  {result.risk}
                                </Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </ResultsPanel>
                ) : !isScanning && (
                  <ResultsPanel isEmpty />
                )}
              </ToolDetailLayout>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
