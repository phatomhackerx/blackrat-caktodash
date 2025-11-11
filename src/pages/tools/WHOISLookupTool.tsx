import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { ToolDetailLayout, ToolSection, ResultsPanel } from "@/components/ToolDetailLayout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCerberusStore } from "@/store/cerberus-store"
import { Search, Settings } from "lucide-react"

export default function WHOISLookupTool() {
  const { addLog } = useCerberusStore()
  const [domain, setDomain] = useState("")
  const [isLooking, setIsLooking] = useState(false)
  const [results, setResults] = useState<any>(null)

  const executeLookup = async () => {
    if (!domain.trim()) {
      addLog({ level: 'warning', source: 'WHOIS Lookup', message: 'Digite um domínio válido' })
      return
    }

    setIsLooking(true)
    setResults(null)

    addLog({
      level: 'info',
      source: 'WHOIS Lookup',
      message: `Consultando WHOIS de ${domain}`
    })

    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockResults = {
      domain: domain,
      registrar: "Example Registrar Inc.",
      registrarUrl: "https://www.example-registrar.com",
      creationDate: "2000-08-13",
      expirationDate: "2025-08-13",
      updatedDate: "2024-07-20",
      status: ["clientTransferProhibited", "clientUpdateProhibited"],
      nameservers: ["ns1.example.com", "ns2.example.com"],
      registrant: {
        organization: "Example Organization",
        country: "US",
        state: "California",
        email: "admin@example.com"
      },
      admin: {
        name: "Admin Contact",
        email: "admin@example.com",
        phone: "+1.5555551234"
      },
      tech: {
        name: "Tech Contact",
        email: "tech@example.com",
        phone: "+1.5555555678"
      },
      dnssec: "unsigned"
    }

    setResults(mockResults)
    setIsLooking(false)

    addLog({
      level: 'success',
      source: 'WHOIS Lookup',
      message: `Informações WHOIS obtidas para ${domain}`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `whois_${domain}_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'WHOIS Lookup', message: 'Resultados exportados' })
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
                title="WHOIS Lookup"
                description="Consulte informações de registro de domínios. Descubra proprietário, data de criação, expiração e contatos."
                icon={<Search className="h-6 w-6 text-primary" />}
                category="OSINT"
                difficulty="Easy"
                onExecute={executeLookup}
                onExport={results ? exportResults : undefined}
                isExecuting={isLooking}
                hasResults={!!results}
              >
                {/* Configuration */}
                <ToolSection title="Configuração" icon={<Settings className="h-5 w-5" />}>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domínio ou IP</Label>
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
                      {/* Domain Info */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Informações do Domínio</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-foreground/5 rounded-lg border border-glass-border">
                            <p className="text-xs text-muted-foreground mb-1">Registrar</p>
                            <p className="text-foreground font-semibold">{results.registrar}</p>
                          </div>
                          <div className="p-3 bg-foreground/5 rounded-lg border border-glass-border">
                            <p className="text-xs text-muted-foreground mb-1">Data de Criação</p>
                            <p className="text-foreground font-semibold">{results.creationDate}</p>
                          </div>
                          <div className="p-3 bg-foreground/5 rounded-lg border border-glass-border">
                            <p className="text-xs text-muted-foreground mb-1">Data de Expiração</p>
                            <p className="text-foreground font-semibold">{results.expirationDate}</p>
                          </div>
                          <div className="p-3 bg-foreground/5 rounded-lg border border-glass-border">
                            <p className="text-xs text-muted-foreground mb-1">Última Atualização</p>
                            <p className="text-foreground font-semibold">{results.updatedDate}</p>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Status</h3>
                        <div className="flex flex-wrap gap-2">
                          {results.status.map((status: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-blue-900/20 text-blue-400 border border-blue-800 rounded text-sm">
                              {status}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Nameservers */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Nameservers</h3>
                        <div className="space-y-2">
                          {results.nameservers.map((ns: string, i: number) => (
                            <div key={i} className="p-2 bg-terminal-bg rounded border border-glass-border">
                              <code className="text-green-400 text-sm">{ns}</code>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Registrant Contact */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Registrante</h3>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border space-y-2">
                          <p className="text-sm"><span className="text-muted-foreground">Organização:</span> <span className="text-foreground">{results.registrant.organization}</span></p>
                          <p className="text-sm"><span className="text-muted-foreground">País:</span> <span className="text-foreground">{results.registrant.country}</span></p>
                          <p className="text-sm"><span className="text-muted-foreground">Estado:</span> <span className="text-foreground">{results.registrant.state}</span></p>
                          <p className="text-sm"><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{results.registrant.email}</span></p>
                        </div>
                      </div>

                      {/* Admin Contact */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Contato Administrativo</h3>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border space-y-2">
                          <p className="text-sm"><span className="text-muted-foreground">Nome:</span> <span className="text-foreground">{results.admin.name}</span></p>
                          <p className="text-sm"><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{results.admin.email}</span></p>
                          <p className="text-sm"><span className="text-muted-foreground">Telefone:</span> <span className="text-foreground">{results.admin.phone}</span></p>
                        </div>
                      </div>

                      {/* Tech Contact */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Contato Técnico</h3>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border space-y-2">
                          <p className="text-sm"><span className="text-muted-foreground">Nome:</span> <span className="text-foreground">{results.tech.name}</span></p>
                          <p className="text-sm"><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{results.tech.email}</span></p>
                          <p className="text-sm"><span className="text-muted-foreground">Telefone:</span> <span className="text-foreground">{results.tech.phone}</span></p>
                        </div>
                      </div>
                    </div>
                  </ResultsPanel>
                ) : !isLooking && (
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
