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
import { Radar, Settings, Activity } from "lucide-react"

export default function SubdomainFinderTool() {
  const { addLog } = useCerberusStore()
  const [domain, setDomain] = useState("")
  const [method, setMethod] = useState("bruteforce")
  const [wordlist, setWordlist] = useState("common.txt")
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any[]>([])

  const executeFind = async () => {
    if (!domain.trim()) {
      addLog({ level: 'warning', source: 'Subdomain Finder', message: 'Digite um domínio válido' })
      return
    }

    setIsScanning(true)
    setProgress(0)
    setResults([])

    addLog({
      level: 'info',
      source: 'Subdomain Finder',
      message: `Buscando subdomínios de ${domain}`
    })

    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setProgress(i)
    }

    const mockResults = [
      { subdomain: `www.${domain}`, ip: "93.184.216.34", status: "active" },
      { subdomain: `mail.${domain}`, ip: "93.184.216.35", status: "active" },
      { subdomain: `ftp.${domain}`, ip: "93.184.216.36", status: "active" },
      { subdomain: `admin.${domain}`, ip: "93.184.216.37", status: "active" },
      { subdomain: `api.${domain}`, ip: "93.184.216.38", status: "active" },
      { subdomain: `dev.${domain}`, ip: "93.184.216.39", status: "active" },
      { subdomain: `staging.${domain}`, ip: "93.184.216.40", status: "active" },
      { subdomain: `blog.${domain}`, ip: "93.184.216.41", status: "active" },
      { subdomain: `shop.${domain}`, ip: "93.184.216.42", status: "active" },
      { subdomain: `test.${domain}`, ip: null, status: "inactive" }
    ]

    setResults(mockResults)
    setIsScanning(false)

    addLog({
      level: 'success',
      source: 'Subdomain Finder',
      message: `${mockResults.filter(r => r.status === 'active').length} subdomínios ativos encontrados`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `subdomains_${domain}_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'Subdomain Finder', message: 'Resultados exportados' })
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
                title="Subdomain Finder"
                description="Descubra subdomínios de um domínio alvo usando brute force, DNS enumeration ou APIs públicas."
                icon={<Radar className="h-6 w-6 text-primary" />}
                category="Reconnaissance"
                difficulty="Easy"
                onExecute={executeFind}
                onExport={results.length > 0 ? exportResults : undefined}
                isExecuting={isScanning}
                hasResults={results.length > 0}
              >
                {/* Configuration */}
                <ToolSection title="Configuração" icon={<Settings className="h-5 w-5" />}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain">Domínio Alvo</Label>
                      <Input
                        id="domain"
                        placeholder="example.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="bg-terminal-bg border-glass-border font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="method">Método</Label>
                        <Select value={method} onValueChange={setMethod}>
                          <SelectTrigger id="method" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bruteforce">Brute Force</SelectItem>
                            <SelectItem value="dns">DNS Enumeration</SelectItem>
                            <SelectItem value="api">API Search</SelectItem>
                            <SelectItem value="all">Todos os Métodos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="wordlist">Wordlist</Label>
                        <Select value={wordlist} onValueChange={setWordlist}>
                          <SelectTrigger id="wordlist" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="common.txt">Common (1000)</SelectItem>
                            <SelectItem value="medium.txt">Medium (5000)</SelectItem>
                            <SelectItem value="large.txt">Large (10000)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </ToolSection>

                {/* Progress */}
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ToolSection title="Progresso" icon={<Activity className="h-5 w-5" />}>
                      <div className="space-y-3">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Enumerando subdomínios...</span>
                          <span className="text-primary font-semibold">{progress}%</span>
                        </div>
                      </div>
                    </ToolSection>
                  </motion.div>
                )}

                {/* Results */}
                {results.length > 0 ? (
                  <ResultsPanel>
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                          <p className="text-sm text-muted-foreground mb-1">Subdomínios Ativos</p>
                          <p className="text-3xl font-bold text-green-400">
                            {results.filter(r => r.status === 'active').length}
                          </p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Total Encontrados</p>
                          <p className="text-3xl font-bold text-primary">{results.length}</p>
                        </div>
                      </div>

                      {/* Subdomain List */}
                      <div className="space-y-2">
                        {results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-3 bg-foreground/5 rounded-lg border border-glass-border hover:border-primary/30 transition-all"
                          >
                            <div className="flex-1">
                              <p className="font-mono text-foreground font-semibold">{result.subdomain}</p>
                              {result.ip && (
                                <p className="text-sm text-muted-foreground font-mono">{result.ip}</p>
                              )}
                            </div>
                            <Badge className={result.status === 'active' 
                              ? "bg-green-900/50 text-green-400 border-green-800" 
                              : "bg-muted text-muted-foreground"}>
                              {result.status}
                            </Badge>
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
