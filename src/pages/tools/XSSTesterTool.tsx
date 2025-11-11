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
import { Checkbox } from "@/components/ui/checkbox"
import { useCerberusStore } from "@/store/cerberus-store"
import { Code, Settings, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function XSSTesterTool() {
  const { addLog } = useCerberusStore()
  const [targetUrl, setTargetUrl] = useState("")
  const [xssType, setXssType] = useState("reflected")
  const [testForms, setTestForms] = useState(true)
  const [testParams, setTestParams] = useState(true)
  const [isTesting, setIsTesting] = useState(false)
  const [results, setResults] = useState<any>(null)

  const executeTest = async () => {
    if (!targetUrl.trim()) {
      addLog({ level: 'warning', source: 'XSS Tester', message: 'Digite uma URL válida' })
      return
    }

    setIsTesting(true)
    setResults(null)

    addLog({
      level: 'info',
      source: 'XSS Tester',
      message: `Testando XSS em ${targetUrl}`
    })

    await new Promise(resolve => setTimeout(resolve, 2500))

    const mockResults = {
      url: targetUrl,
      vulnerablePoints: 3,
      safePoints: 5,
      findings: [
        {
          type: "Reflected XSS",
          severity: "High",
          location: "search parameter",
          payload: "<script>alert('XSS')</script>",
          vulnerable: true
        },
        {
          type: "DOM XSS",
          severity: "Medium",
          location: "input field",
          payload: "javascript:alert(1)",
          vulnerable: true
        },
        {
          type: "Stored XSS",
          severity: "Critical",
          location: "comment section",
          payload: "<img src=x onerror=alert('XSS')>",
          vulnerable: true
        }
      ],
      testedPayloads: [
        "<script>alert(1)</script>",
        "<img src=x onerror=alert(1)>",
        "javascript:alert(1)",
        "<svg onload=alert(1)>",
        "'\"><script>alert(1)</script>"
      ]
    }

    setResults(mockResults)
    setIsTesting(false)

    addLog({
      level: 'error',
      source: 'XSS Tester',
      message: `⚠️ ${mockResults.vulnerablePoints} vulnerabilidades XSS encontradas!`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `xss_test_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'XSS Tester', message: 'Resultados exportados' })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'High': return 'bg-orange-900/50 text-orange-400 border-orange-800'
      case 'Medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      default: return 'bg-blue-900/50 text-blue-400 border-blue-800'
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
                title="XSS Tester"
                description="Detecte vulnerabilidades Cross-Site Scripting (XSS) em aplicações web. Testa Reflected, Stored e DOM-based XSS."
                icon={<Code className="h-6 w-6 text-primary" />}
                category="Web Security"
                difficulty="Medium"
                onExecute={executeTest}
                onExport={results ? exportResults : undefined}
                isExecuting={isTesting}
                hasResults={!!results}
              >
                {/* Configuration */}
                <ToolSection title="Configuração do Teste" icon={<Settings className="h-5 w-5" />}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetUrl">URL Alvo</Label>
                      <Input
                        id="targetUrl"
                        placeholder="https://example.com"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        className="bg-terminal-bg border-glass-border font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="xssType">Tipo de XSS</Label>
                      <Select value={xssType} onValueChange={setXssType}>
                        <SelectTrigger id="xssType" className="bg-terminal-bg border-glass-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reflected">Reflected XSS</SelectItem>
                          <SelectItem value="stored">Stored XSS</SelectItem>
                          <SelectItem value="dom">DOM-based XSS</SelectItem>
                          <SelectItem value="all">Todos os Tipos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Opções de Teste</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="testForms" 
                          checked={testForms} 
                          onCheckedChange={(checked) => setTestForms(checked as boolean)}
                        />
                        <label htmlFor="testForms" className="text-sm text-foreground cursor-pointer">
                          Testar formulários
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="testParams" 
                          checked={testParams} 
                          onCheckedChange={(checked) => setTestParams(checked as boolean)}
                        />
                        <label htmlFor="testParams" className="text-sm text-foreground cursor-pointer">
                          Testar parâmetros URL
                        </label>
                      </div>
                    </div>
                  </div>
                </ToolSection>

                {/* Results */}
                {results ? (
                  <ResultsPanel>
                    <div className="space-y-6">
                      {/* Summary Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-900/20 rounded-lg border border-red-800">
                          <p className="text-sm text-muted-foreground mb-1">Vulnerabilidades Encontradas</p>
                          <p className="text-3xl font-bold text-red-400">{results.vulnerablePoints}</p>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                          <p className="text-sm text-muted-foreground mb-1">Pontos Seguros</p>
                          <p className="text-3xl font-bold text-green-400">{results.safePoints}</p>
                        </div>
                      </div>

                      {/* Findings */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                          Vulnerabilidades Detectadas
                        </h3>
                        <div className="space-y-3">
                          {results.findings.map((finding: any, i: number) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="p-4 bg-foreground/5 rounded-lg border border-glass-border"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  {finding.vulnerable ? (
                                    <XCircle className="h-5 w-5 text-red-400" />
                                  ) : (
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                  )}
                                  <h4 className="font-semibold text-foreground">{finding.type}</h4>
                                </div>
                                <Badge className={getSeverityColor(finding.severity)}>
                                  {finding.severity}
                                </Badge>
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="text-muted-foreground">
                                  <strong>Local:</strong> {finding.location}
                                </p>
                                <div>
                                  <p className="text-muted-foreground mb-1"><strong>Payload:</strong></p>
                                  <code className="block p-2 bg-terminal-bg rounded text-green-400 break-all">
                                    {finding.payload}
                                  </code>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tested Payloads */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Payloads Testados</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {results.testedPayloads.map((payload: string, i: number) => (
                            <div key={i} className="p-2 bg-terminal-bg rounded border border-glass-border">
                              <code className="text-sm text-green-400">{payload}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ResultsPanel>
                ) : !isTesting && (
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
