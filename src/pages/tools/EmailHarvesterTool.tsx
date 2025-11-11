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
import { useCerberusStore } from "@/store/cerberus-store"
import { Mail, Settings } from "lucide-react"

export default function EmailHarvesterTool() {
  const { addLog } = useCerberusStore()
  const [domain, setDomain] = useState("")
  const [source, setSource] = useState("all")
  const [limit, setLimit] = useState("100")
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const executeHarvest = async () => {
    if (!domain.trim()) {
      addLog({ level: 'warning', source: 'Email Harvester', message: 'Digite um domínio válido' })
      return
    }

    setIsHarvesting(true)
    setResults([])

    addLog({
      level: 'info',
      source: 'Email Harvester',
      message: `Coletando emails de ${domain}`
    })

    await new Promise(resolve => setTimeout(resolve, 2500))

    const mockResults = [
      { email: `admin@${domain}`, source: "Website", verified: true },
      { email: `contact@${domain}`, source: "Website", verified: true },
      { email: `info@${domain}`, source: "WHOIS", verified: true },
      { email: `support@${domain}`, source: "Search Engine", verified: false },
      { email: `sales@${domain}`, source: "Website", verified: true },
      { email: `john.doe@${domain}`, source: "LinkedIn", verified: false },
      { email: `jane.smith@${domain}`, source: "LinkedIn", verified: false },
      { email: `tech@${domain}`, source: "GitHub", verified: false },
      { email: `hr@${domain}`, source: "Website", verified: true },
      { email: `marketing@${domain}`, source: "Search Engine", verified: false }
    ]

    setResults(mockResults)
    setIsHarvesting(false)

    addLog({
      level: 'success',
      source: 'Email Harvester',
      message: `${mockResults.length} emails coletados (${mockResults.filter(r => r.verified).length} verificados)`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `emails_${domain}_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'Email Harvester', message: 'Emails exportados' })
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website': return 'bg-blue-900/50 text-blue-400 border-blue-800'
      case 'WHOIS': return 'bg-green-900/50 text-green-400 border-green-800'
      case 'LinkedIn': return 'bg-purple-900/50 text-purple-400 border-purple-800'
      case 'GitHub': return 'bg-orange-900/50 text-orange-400 border-orange-800'
      default: return 'bg-foreground/10 text-foreground'
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
                title="Email Harvester"
                description="Colete endereços de email associados a um domínio através de diversas fontes públicas como websites, WHOIS e redes sociais."
                icon={<Mail className="h-6 w-6 text-primary" />}
                category="OSINT"
                difficulty="Easy"
                onExecute={executeHarvest}
                onExport={results.length > 0 ? exportResults : undefined}
                isExecuting={isHarvesting}
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
                        <Label htmlFor="source">Fonte</Label>
                        <Select value={source} onValueChange={setSource}>
                          <SelectTrigger id="source" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas as Fontes</SelectItem>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="search">Search Engines</SelectItem>
                            <SelectItem value="social">Redes Sociais</SelectItem>
                            <SelectItem value="whois">WHOIS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="limit">Limite de Resultados</Label>
                        <Select value={limit} onValueChange={setLimit}>
                          <SelectTrigger id="limit" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">50 emails</SelectItem>
                            <SelectItem value="100">100 emails</SelectItem>
                            <SelectItem value="250">250 emails</SelectItem>
                            <SelectItem value="500">500 emails</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </ToolSection>

                {/* Results */}
                {results.length > 0 ? (
                  <ResultsPanel>
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Total de Emails</p>
                          <p className="text-3xl font-bold text-primary">{results.length}</p>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                          <p className="text-sm text-muted-foreground mb-1">Verificados</p>
                          <p className="text-3xl font-bold text-green-400">
                            {results.filter(r => r.verified).length}
                          </p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Fontes Únicas</p>
                          <p className="text-3xl font-bold text-primary">
                            {new Set(results.map(r => r.source)).size}
                          </p>
                        </div>
                      </div>

                      {/* Email List */}
                      <div className="space-y-2">
                        {results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-3 bg-foreground/5 rounded-lg border border-glass-border hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                              <code className="text-foreground font-mono text-sm">{result.email}</code>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getSourceColor(result.source)}>
                                {result.source}
                              </Badge>
                              {result.verified && (
                                <Badge className="bg-green-900/50 text-green-400 border-green-800">
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </ResultsPanel>
                ) : !isHarvesting && (
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
