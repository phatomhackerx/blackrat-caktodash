import { useState } from "react"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { ToolDetailLayout, ToolSection, ResultsPanel } from "@/components/ToolDetailLayout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useCerberusStore } from "@/store/cerberus-store"
import { Globe, Settings } from "lucide-react"

export default function DNSEnumerationTool() {
  const { addLog } = useCerberusStore()
  const [domain, setDomain] = useState("")
  const [isEnumerating, setIsEnumerating] = useState(false)
  const [results, setResults] = useState<any>(null)

  const executeEnumeration = async () => {
    if (!domain.trim()) {
      addLog({ level: 'warning', source: 'DNS Enumeration', message: 'Digite um domínio válido' })
      return
    }

    setIsEnumerating(true)
    setResults(null)

    addLog({
      level: 'info',
      source: 'DNS Enumeration',
      message: `Enumerando registros DNS de ${domain}`
    })

    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockResults = {
      domain: domain,
      records: {
        A: [
          { host: domain, ip: "93.184.216.34", ttl: 3600 },
          { host: `www.${domain}`, ip: "93.184.216.34", ttl: 3600 }
        ],
        AAAA: [
          { host: domain, ip: "2606:2800:220:1:248:1893:25c8:1946", ttl: 3600 }
        ],
        MX: [
          { host: domain, priority: 10, server: "mail1.example.com", ttl: 3600 },
          { host: domain, priority: 20, server: "mail2.example.com", ttl: 3600 }
        ],
        NS: [
          { host: domain, nameserver: "ns1.example.com", ttl: 86400 },
          { host: domain, nameserver: "ns2.example.com", ttl: 86400 }
        ],
        TXT: [
          { host: domain, text: "v=spf1 include:_spf.google.com ~all", ttl: 3600 },
          { host: domain, text: "google-site-verification=abc123", ttl: 3600 }
        ],
        CNAME: [
          { host: `www.${domain}`, target: domain, ttl: 3600 }
        ]
      },
      summary: {
        totalRecords: 11,
        recordTypes: 6
      }
    }

    setResults(mockResults)
    setIsEnumerating(false)

    addLog({
      level: 'success',
      source: 'DNS Enumeration',
      message: `${mockResults.summary.totalRecords} registros DNS encontrados`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `dns_enum_${domain}_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'DNS Enumeration', message: 'Resultados exportados' })
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
                title="DNS Enumeration"
                description="Enumere e analise registros DNS de um domínio. Descubra servidores, IPs, emails e configurações DNS."
                icon={<Globe className="h-6 w-6 text-primary" />}
                category="Information Gathering"
                difficulty="Easy"
                onExecute={executeEnumeration}
                onExport={results ? exportResults : undefined}
                isExecuting={isEnumerating}
                hasResults={!!results}
              >
                {/* Configuration */}
                <ToolSection title="Configuração" icon={<Settings className="h-5 w-5" />}>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domínio</Label>
                    <Input
                      id="domain"
                      placeholder="example.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="bg-terminal-bg border-glass-border font-mono"
                    />
                  </div>
                </ToolSection>

                {/* Results */}
                {results ? (
                  <ResultsPanel>
                    <div className="space-y-6">
                      {/* Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Total de Registros</p>
                          <p className="text-3xl font-bold text-primary">{results.summary.totalRecords}</p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Tipos de Registro</p>
                          <p className="text-3xl font-bold text-primary">{results.summary.recordTypes}</p>
                        </div>
                      </div>

                      {/* A Records */}
                      {results.records.A.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 flex items-center">
                            <Badge className="mr-2 bg-blue-900/50 text-blue-400 border-blue-800">A</Badge>
                            IPv4 Addresses
                          </h3>
                          <div className="space-y-2">
                            {results.records.A.map((record: any, i: number) => (
                              <div key={i} className="p-3 bg-terminal-bg rounded border border-glass-border flex justify-between items-center">
                                <span className="text-muted-foreground">{record.host}</span>
                                <code className="text-green-400 font-mono">{record.ip}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AAAA Records */}
                      {results.records.AAAA.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 flex items-center">
                            <Badge className="mr-2 bg-purple-900/50 text-purple-400 border-purple-800">AAAA</Badge>
                            IPv6 Addresses
                          </h3>
                          <div className="space-y-2">
                            {results.records.AAAA.map((record: any, i: number) => (
                              <div key={i} className="p-3 bg-terminal-bg rounded border border-glass-border">
                                <code className="text-green-400 font-mono text-sm break-all">{record.ip}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* MX Records */}
                      {results.records.MX.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 flex items-center">
                            <Badge className="mr-2 bg-green-900/50 text-green-400 border-green-800">MX</Badge>
                            Mail Servers
                          </h3>
                          <div className="space-y-2">
                            {results.records.MX.map((record: any, i: number) => (
                              <div key={i} className="p-3 bg-terminal-bg rounded border border-glass-border flex justify-between items-center">
                                <code className="text-green-400">{record.server}</code>
                                <Badge className="bg-foreground/10 text-foreground">Priority: {record.priority}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* NS Records */}
                      {results.records.NS.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 flex items-center">
                            <Badge className="mr-2 bg-orange-900/50 text-orange-400 border-orange-800">NS</Badge>
                            Name Servers
                          </h3>
                          <div className="space-y-2">
                            {results.records.NS.map((record: any, i: number) => (
                              <div key={i} className="p-3 bg-terminal-bg rounded border border-glass-border">
                                <code className="text-green-400">{record.nameserver}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* TXT Records */}
                      {results.records.TXT.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 flex items-center">
                            <Badge className="mr-2 bg-yellow-900/50 text-yellow-400 border-yellow-800">TXT</Badge>
                            Text Records
                          </h3>
                          <div className="space-y-2">
                            {results.records.TXT.map((record: any, i: number) => (
                              <div key={i} className="p-3 bg-terminal-bg rounded border border-glass-border">
                                <code className="text-green-400 text-sm break-all">{record.text}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </ResultsPanel>
                ) : !isEnumerating && (
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
