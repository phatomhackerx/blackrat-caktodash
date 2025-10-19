import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Terminal, Maximize2, Minimize2 } from 'lucide-react'
import { useBlackRatStore } from '@/store/blackrat-store'
import { useTranslation } from 'react-i18next'

interface TerminalOutput {
  id: string
  timestamp: Date
  command: string
  output: string[]
  type: 'command' | 'output' | 'error' | 'success'
}

export function TerminalCard() {
  const { t } = useTranslation()
  const { addLog, targets } = useBlackRatStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<TerminalOutput[]>([
    {
      id: '1',
      timestamp: new Date(),
      command: '',
      output: ['BlackRat OS Terminal v2.0', 'Digite "help" para ver comandos disponíveis'],
      type: 'output'
    }
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [terminalHistory])

  const simulateNmap = (target: string): string[] => {
    const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995]
    const openPorts = commonPorts.filter(() => Math.random() > 0.7)
    
    return [
      `Iniciando Nmap 7.93 ( https://nmap.org ) em ${new Date().toLocaleString()}`,
      `Nmap scan report para ${target}`,
      `Host está ativo (latência: ${(Math.random() * 0.1).toFixed(3)}s).`,
      '',
      'PORT     STATE    SERVICE',
      ...openPorts.map(port => {
        const services: Record<number, string> = {
          21: 'ftp', 22: 'ssh', 23: 'telnet', 25: 'smtp', 53: 'domain',
          80: 'http', 110: 'pop3', 143: 'imap', 443: 'https', 993: 'imaps', 995: 'pop3s'
        }
        return `${port}/tcp   open     ${services[port] || 'unknown'}`
      }),
      '',
      `Nmap concluído: 1 endereço IP (1 host ativo) escaneado em ${(Math.random() * 10 + 5).toFixed(1)} segundos`
    ]
  }

  const simulateWhois = (domain: string): string[] => {
    return [
      `% IANA WHOIS server`,
      `% for more information on IANA, visit http://www.iana.org`,
      `% Terms of Use: https://www.iana.org/domains/special-use`,
      '',
      `Domain Name: ${domain.toUpperCase()}`,
      `Registry Domain ID: ${Math.random().toString(36).substring(2, 15)}`,
      `Registrar WHOIS Server: whois.registrar.com`,
      `Registrar URL: http://www.registrar.com`,
      `Updated Date: ${new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T00:00:00Z`,
      `Creation Date: ${new Date(Date.now() - Math.random() * 1000 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T00:00:00Z`,
      `Registry Expiry Date: ${new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T00:00:00Z`,
      `Registrar: Example Registrar Inc.`,
      `Registrar IANA ID: ${Math.floor(Math.random() * 9999)}`,
      `Domain Status: clientTransferProhibited`,
      `Name Server: NS1.EXAMPLE.COM`,
      `Name Server: NS2.EXAMPLE.COM`,
      `DNSSEC: unsigned`
    ]
  }

  const simulatePing = (target: string): string[] => {
    const latency = Math.random() * 100 + 10
    return [
      `PING ${target} (${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}) 56(84) bytes de dados.`,
      `64 bytes de ${target}: icmp_seq=1 ttl=64 tempo=${latency.toFixed(1)} ms`,
      `64 bytes de ${target}: icmp_seq=2 ttl=64 tempo=${(latency + Math.random() * 10 - 5).toFixed(1)} ms`,
      `64 bytes de ${target}: icmp_seq=3 ttl=64 tempo=${(latency + Math.random() * 10 - 5).toFixed(1)} ms`,
      `64 bytes de ${target}: icmp_seq=4 ttl=64 tempo=${(latency + Math.random() * 10 - 5).toFixed(1)} ms`,
      '',
      `--- estatísticas do ping ${target} ---`,
      `4 pacotes transmitidos, 4 recebidos, 0% packet loss, tempo 3005ms`,
      `rtt min/avg/max/mdev = ${(latency - 5).toFixed(1)}/${latency.toFixed(1)}/${(latency + 5).toFixed(1)}/${(Math.random() * 2).toFixed(1)} ms`
    ]
  }

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)

    // Add command to terminal
    const commandOutput: TerminalOutput = {
      id: Date.now().toString(),
      timestamp: new Date(),
      command: trimmedCommand,
      output: [],
      type: 'command'
    }

    let response: string[] = []
    let responseType: 'output' | 'error' | 'success' = 'output'

    const [cmd, ...args] = trimmedCommand.toLowerCase().split(' ')

    switch (cmd) {
      case 'help':
        response = [
          'Comandos disponíveis:',
          '  help                    - Mostra esta ajuda',
          '  clear                   - Limpa o terminal',
          '  status                  - Mostra status do sistema',
          '  whoami                  - Mostra informações do usuário',
          '  nmap <target>           - Escaneia portas do alvo',
          '  ping <target>           - Testa conectividade',
          '  whois <domain>          - Informações do domínio',
          '  targets                 - Lista alvos salvos',
          '  sessions                - Lista sessões ativas',
          '  msfvenom <options>      - Gera payload',
          '  exit                    - Sair do terminal'
        ]
        responseType = 'success'
        break

      case 'clear':
        setTerminalHistory([])
        setCurrentCommand('')
        return

      case 'status':
        response = [
          '=== STATUS DO SISTEMA ===',
          `CPU: ${Math.floor(Math.random() * 50 + 20)}%`,
          `RAM: ${(Math.random() * 8 + 2).toFixed(1)}GB / 16GB`,
          `Rede: 192.168.1.${Math.floor(Math.random() * 255)}`,
          `VPN: ${Math.random() > 0.5 ? 'Conectada' : 'Desconectada'}`,
          `Shells Ativas: ${Math.floor(Math.random() * 5)}`,
          `Portas Abertas: [${[22, 80, 443, 8080].filter(() => Math.random() > 0.5).join(', ')}]`
        ]
        responseType = 'success'
        break

      case 'whoami':
        response = [
          'blackrat@kali:~$ ',
          'Usuário: blackrat',
          'Grupos: sudo, blackrat, penetration-testers',
          'Shell: /bin/bash',
          'Diretório: /home/blackrat',
          'Permissões: rwxrwxrwx'
        ]
        responseType = 'success'
        break

      case 'nmap':
        if (!args[0]) {
          response = ['Erro: Especifique um alvo. Uso: nmap <target>']
          responseType = 'error'
        } else {
          response = simulateNmap(args[0])
          responseType = 'success'
          addLog({
            level: 'info',
            source: 'Terminal',
            message: `Scan Nmap executado no alvo: ${args[0]}`
          })
        }
        break

      case 'ping':
        if (!args[0]) {
          response = ['Erro: Especifique um alvo. Uso: ping <target>']
          responseType = 'error'
        } else {
          response = simulatePing(args[0])
          responseType = 'success'
        }
        break

      case 'whois':
        if (!args[0]) {
          response = ['Erro: Especifique um domínio. Uso: whois <domain>']
          responseType = 'error'
        } else {
          response = simulateWhois(args[0])
          responseType = 'success'
        }
        break

      case 'targets':
        response = [
          '=== ALVOS SALVOS ===',
          ...targets.map((target, index) => 
            `${index + 1}. ${target.name} (${target.ip}) - Status: ${target.status}`
          )
        ]
        responseType = 'success'
        break

      case 'sessions':
        response = [
          '=== SESSÕES ATIVAS ===',
          '1. Terminal Principal (Ativo)',
          '2. SSH Session - 192.168.1.50:22 (Conectado)',
          '3. Reverse Shell - 10.0.0.1:4444 (Aguardando)'
        ]
        responseType = 'success'
        break

      case 'msfvenom':
        const payload = args.join(' ') || 'windows/meterpreter/reverse_tcp'
        response = [
          `Gerando payload: ${payload}`,
          'LHOST=192.168.1.100',
          'LPORT=4444',
          'Platform: Windows',
          'Encoding: x86/shikata_ga_nai',
          'Iterations: 3',
          '',
          'Payload gerado com sucesso!',
          'Tamanho: 4.2KB',
          'Localização: /tmp/payload.exe'
        ]
        responseType = 'success'
        addLog({
          level: 'success',
          source: 'Terminal',
          message: `Payload gerado: ${payload}`
        })
        break

      case 'exit':
        response = ['Encerrando terminal...']
        responseType = 'success'
        break

      default:
        response = [`Comando não encontrado: ${cmd}. Digite 'help' para ver comandos disponíveis.`]
        responseType = 'error'
    }

    // Add response to terminal
    const responseOutput: TerminalOutput = {
      id: (Date.now() + 1).toString(),
      timestamp: new Date(),
      command: '',
      output: response,
      type: responseType
    }

    setTerminalHistory(prev => [...prev, commandOutput, responseOutput])
    setCurrentCommand('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    }
  }

  return (
    <Card className="bg-card border-border hover:border-border/40 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2 tracking-tight">
          <Terminal className="h-4 w-4" />
          {t('terminal.title', 'Terminal')}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-7 w-7 p-0"
        >
          {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className={`${isExpanded ? 'h-96' : 'h-48'} transition-all duration-300`}>
          <ScrollArea className="h-full terminal-scroll" ref={scrollRef}>
            <div className="font-mono text-xs space-y-1 font-light">
              {terminalHistory.map((entry) => (
                <div key={entry.id}>
                  {entry.command && (
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/60">blackrat@kali:~$</span>
                      <span className="text-foreground font-normal">{entry.command}</span>
                    </div>
                  )}
                  {entry.output.map((line, index) => (
                    <div
                      key={index}
                      className={`${
                        entry.type === 'error' ? 'text-muted-foreground/70' :
                        entry.type === 'success' ? 'text-foreground' :
                        'text-muted-foreground'
                      } ${entry.command ? 'ml-4' : ''}`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border font-mono text-xs">
            <span className="text-foreground/60">blackrat@kali:~$</span>
            <Input
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none p-0 h-auto text-foreground font-mono text-xs focus-visible:ring-0 font-light"
              placeholder="Digite um comando..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}