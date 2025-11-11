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
import { Textarea } from "@/components/ui/textarea"
import { useCerberusStore } from "@/store/cerberus-store"
import { Database, Settings, AlertTriangle } from "lucide-react"

export default function SQLInjectionTool() {
  const { addLog } = useCerberusStore()
  const [targetUrl, setTargetUrl] = useState("")
  const [parameter, setParameter] = useState("")
  const [technique, setTechnique] = useState("union")
  const [dbms, setDbms] = useState("auto")
  const [isTesting, setIsTesting] = useState(false)
  const [results, setResults] = useState<any>(null)

  const executeTest = async () => {
    if (!targetUrl.trim()) {
      addLog({ level: 'warning', source: 'SQL Injection', message: 'Digite uma URL válida' })
      return
    }

    setIsTesting(true)
    setResults(null)

    addLog({
      level: 'info',
      source: 'SQL Injection',
      message: `Testando SQL Injection em ${targetUrl}`
    })

    await new Promise(resolve => setTimeout(resolve, 3000))

    const mockResults = {
      vulnerable: true,
      url: targetUrl,
      parameter: parameter || "id",
      dbms: "MySQL 8.0.28",
      technique: technique.toUpperCase(),
      payloads: [
        { payload: "' OR '1'='1", success: true },
        { payload: "' UNION SELECT NULL--", success: true },
        { payload: "' AND 1=1--", success: true }
      ],
      tables: ["users", "products", "orders", "admins"],
      columns: {
        users: ["id", "username", "password", "email", "role"]
      },
      extractedData: [
        { username: "admin", email: "admin@example.com", role: "administrator" },
        { username: "john_doe", email: "john@example.com", role: "user" }
      ]
    }

    setResults(mockResults)
    setIsTesting(false)

    addLog({
      level: results?.vulnerable ? 'error' : 'success',
      source: 'SQL Injection',
      message: mockResults.vulnerable 
        ? '⚠️ Vulnerabilidade SQL Injection detectada!' 
        : 'Nenhuma vulnerabilidade encontrada'
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sqli_test_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'SQL Injection', message: 'Resultados exportados' })
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
                title="SQL Injection Tester"
                description="Teste vulnerabilidades de SQL Injection em aplicações web. Detecta e explora falhas de segurança em queries SQL."
                icon={<Database className="h-6 w-6 text-primary" />}
                category="Web Exploitation"
                difficulty="Hard"
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
                        placeholder="https://example.com/page.php?id=1"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        className="bg-terminal-bg border-glass-border font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parameter">Parâmetro (opcional)</Label>
                        <Input
                          id="parameter"
                          placeholder="id"
                          value={parameter}
                          onChange={(e) => setParameter(e.target.value)}
                          className="bg-terminal-bg border-glass-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="technique">Técnica</Label>
                        <Select value={technique} onValueChange={setTechnique}>
                          <SelectTrigger id="technique" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="union">UNION Based</SelectItem>
                            <SelectItem value="error">Error Based</SelectItem>
                            <SelectItem value="boolean">Boolean Based</SelectItem>
                            <SelectItem value="time">Time Based</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dbms">DBMS</Label>
                        <Select value={dbms} onValueChange={setDbms}>
                          <SelectTrigger id="dbms" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto Detect</SelectItem>
                            <SelectItem value="mysql">MySQL</SelectItem>
                            <SelectItem value="postgresql">PostgreSQL</SelectItem>
                            <SelectItem value="mssql">MS SQL Server</SelectItem>
                            <SelectItem value="oracle">Oracle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </ToolSection>

                {/* Results */}
                {results ? (
                  <ResultsPanel>
                    <div className="space-y-6">
                      {/* Vulnerability Alert */}
                      {results.vulnerable && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-start space-x-3"
                        >
                          <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold text-red-400 mb-1">Vulnerabilidade Crítica Detectada!</h3>
                            <p className="text-sm text-muted-foreground">
                              A aplicação é vulnerável a SQL Injection. Dados sensíveis podem estar expostos.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">DBMS Detectado</p>
                          <p className="font-semibold text-foreground">{results.dbms}</p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Técnica Usada</p>
                          <Badge className="bg-blue-900/50 text-blue-400 border-blue-800">
                            {results.technique}
                          </Badge>
                        </div>
                      </div>

                      {/* Payloads */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Payloads Testados</h3>
                        <div className="space-y-2">
                          {results.payloads.map((p: any, i: number) => (
                            <div key={i} className="p-3 bg-terminal-bg rounded border border-glass-border flex items-center justify-between">
                              <code className="text-sm text-green-400">{p.payload}</code>
                              <Badge className={p.success ? "bg-green-900/50 text-green-400 border-green-800" : "bg-red-900/50 text-red-400 border-red-800"}>
                                {p.success ? "Success" : "Failed"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tables */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Tabelas Encontradas</h3>
                        <div className="flex flex-wrap gap-2">
                          {results.tables.map((table: string, i: number) => (
                            <Badge key={i} className="bg-foreground/10 text-foreground border-glass-border">
                              {table}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Extracted Data */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Dados Extraídos (Sample)</h3>
                        <Textarea
                          value={JSON.stringify(results.extractedData, null, 2)}
                          readOnly
                          className="font-mono text-sm bg-terminal-bg border-glass-border min-h-[150px] text-green-400"
                        />
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
