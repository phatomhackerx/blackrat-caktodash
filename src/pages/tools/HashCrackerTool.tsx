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
import { KeyRound, Settings, Activity, CheckCircle } from "lucide-react"

export default function HashCrackerTool() {
  const { addLog } = useCerberusStore()
  const [hash, setHash] = useState("")
  const [hashType, setHashType] = useState("md5")
  const [attackMode, setAttackMode] = useState("dictionary")
  const [wordlist, setWordlist] = useState("rockyou.txt")
  const [isCracking, setIsCracking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)

  const executeCrack = async () => {
    if (!hash.trim()) {
      addLog({ level: 'warning', source: 'Hash Cracker', message: 'Digite um hash válido' })
      return
    }

    setIsCracking(true)
    setProgress(0)
    setResult(null)

    addLog({
      level: 'info',
      source: 'Hash Cracker',
      message: `Iniciando crack de hash ${hashType.toUpperCase()} (modo: ${attackMode})`
    })

    // Simulate cracking progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setProgress(i)
    }

    const mockResult = {
      hash: hash,
      type: hashType.toUpperCase(),
      cracked: true,
      plaintext: "password123",
      attempts: 1547892,
      timeElapsed: "2.3s",
      method: attackMode === "dictionary" ? "Dictionary Attack" : "Brute Force"
    }

    setResult(mockResult)
    setIsCracking(false)

    addLog({
      level: 'success',
      source: 'Hash Cracker',
      message: `Hash crackeado com sucesso! Plaintext: ${mockResult.plaintext}`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(result, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `hash_crack_${Date.now()}.json`
    link.click()

    addLog({ level: 'info', source: 'Hash Cracker', message: 'Resultados exportados com sucesso' })
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
                title="Hash Cracker"
                description="Quebre hashes usando ataques de dicionário ou força bruta. Suporta MD5, SHA1, SHA256 e mais."
                icon={<KeyRound className="h-6 w-6 text-primary" />}
                category="Password Cracking"
                difficulty="Medium"
                onExecute={executeCrack}
                onExport={result ? exportResults : undefined}
                isExecuting={isCracking}
                hasResults={!!result}
              >
                {/* Configuration */}
                <ToolSection title="Configuração" icon={<Settings className="h-5 w-5" />}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hash">Hash</Label>
                      <Input
                        id="hash"
                        placeholder="5f4dcc3b5aa765d61d8327deb882cf99"
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                        className="bg-terminal-bg border-glass-border font-mono text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hashType">Tipo de Hash</Label>
                        <Select value={hashType} onValueChange={setHashType}>
                          <SelectTrigger id="hashType" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="md5">MD5</SelectItem>
                            <SelectItem value="sha1">SHA1</SelectItem>
                            <SelectItem value="sha256">SHA256</SelectItem>
                            <SelectItem value="sha512">SHA512</SelectItem>
                            <SelectItem value="bcrypt">Bcrypt</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="attackMode">Modo de Ataque</Label>
                        <Select value={attackMode} onValueChange={setAttackMode}>
                          <SelectTrigger id="attackMode" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dictionary">Dictionary Attack</SelectItem>
                            <SelectItem value="brute">Brute Force</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="mask">Mask Attack</SelectItem>
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
                            <SelectItem value="rockyou.txt">rockyou.txt</SelectItem>
                            <SelectItem value="common.txt">common.txt</SelectItem>
                            <SelectItem value="custom.txt">custom.txt</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </ToolSection>

                {/* Progress */}
                {isCracking && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ToolSection title="Progresso" icon={<Activity className="h-5 w-5" />}>
                      <div className="space-y-3">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Processando...</span>
                          <span className="text-primary font-semibold">{progress}%</span>
                        </div>
                      </div>
                    </ToolSection>
                  </motion.div>
                )}

                {/* Results */}
                {result ? (
                  <ResultsPanel>
                    <div className="space-y-6">
                      {/* Success Banner */}
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-6 bg-green-900/20 border border-green-800 rounded-lg flex items-center justify-center space-x-3"
                      >
                        <CheckCircle className="h-8 w-8 text-green-400" />
                        <div>
                          <h3 className="text-xl font-bold text-green-400">Hash Crackeado!</h3>
                          <p className="text-sm text-muted-foreground">Plaintext encontrado com sucesso</p>
                        </div>
                      </motion.div>

                      {/* Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Hash Original</p>
                          <p className="font-mono text-sm break-all text-foreground">{result.hash}</p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Tipo</p>
                          <Badge className="bg-blue-900/50 text-blue-400 border-blue-800">
                            {result.type}
                          </Badge>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                          <p className="text-sm text-muted-foreground mb-1">Plaintext</p>
                          <p className="font-mono text-lg font-bold text-green-400">{result.plaintext}</p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Método</p>
                          <p className="text-foreground">{result.method}</p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Tentativas</p>
                          <p className="text-2xl font-bold text-primary">{result.attempts.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-foreground/5 rounded-lg border border-glass-border">
                          <p className="text-sm text-muted-foreground mb-1">Tempo Decorrido</p>
                          <p className="text-2xl font-bold text-primary">{result.timeElapsed}</p>
                        </div>
                      </div>
                    </div>
                  </ResultsPanel>
                ) : !isCracking && (
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
