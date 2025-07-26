import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Terminal, Send, Folder, Plus, X } from "lucide-react"

const TerminalPage = () => {
  const [sessions, setSessions] = useState([
    { id: 1, name: "Terminal 1", active: true },
    { id: 2, name: "Remote SSH", active: false }
  ])
  const [activeSession, setActiveSession] = useState(1)
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState([
    "BlackRat OS Terminal v2.0 - Advanced Shell Environment",
    "Welcome to the command center. Type 'help' for available commands.",
    "Current directory: /opt/blackrat",
    ""
  ])

  const addSession = () => {
    const newSession = {
      id: sessions.length + 1,
      name: `Terminal ${sessions.length + 1}`,
      active: false
    }
    setSessions([...sessions, newSession])
  }

  const closeSession = (id: number) => {
    if (sessions.length > 1) {
      const updatedSessions = sessions.filter(s => s.id !== id)
      setSessions(updatedSessions)
      if (activeSession === id) {
        setActiveSession(updatedSessions[0].id)
      }
    }
  }

  const setActiveTab = (id: number) => {
    setActiveSession(id)
    setSessions(sessions.map(s => ({ ...s, active: s.id === id })))
  }

  const handleCommand = () => {
    if (!command.trim()) return
    
    const newOutput = [...output, `root@blackrat:/opt/blackrat# ${command}`]
    
    // Enhanced command responses
    switch (command.toLowerCase()) {
      case 'help':
        newOutput.push("BlackRat OS Commands:")
        newOutput.push("  help          - Show this help menu")
        newOutput.push("  clear         - Clear terminal output")
        newOutput.push("  status        - Show system status")
        newOutput.push("  nmap <target> - Network scan")
        newOutput.push("  exploit       - List available exploits")
        newOutput.push("  payload       - Generate payloads")
        newOutput.push("  phish         - Phishing campaign tools")
        newOutput.push("  whoami        - Current user")
        newOutput.push("  ls            - List directory contents")
        newOutput.push("  cat           - Display file contents")
        break
      case 'clear':
        setOutput(["BlackRat OS Terminal v2.0 - Advanced Shell Environment", ""])
        setCommand("")
        return
      case 'status':
        newOutput.push("╔═══════════════════════════════════╗")
        newOutput.push("║         SYSTEM STATUS             ║")
        newOutput.push("╠═══════════════════════════════════╣")
        newOutput.push("║ CPU Usage:      23%               ║")
        newOutput.push("║ RAM Usage:      4.2/16 GB         ║")
        newOutput.push("║ VPN Status:     Connected          ║")
        newOutput.push("║ Network:        192.168.1.100      ║")
        newOutput.push("║ Active Shells:  3                 ║")
        newOutput.push("╚═══════════════════════════════════╝")
        break
      case 'whoami':
        newOutput.push("root")
        break
      case 'ls':
        newOutput.push("total 48")
        newOutput.push("drwxr-xr-x  2 root root 4096 Jan 26 12:00 exploits/")
        newOutput.push("drwxr-xr-x  2 root root 4096 Jan 26 12:00 payloads/")
        newOutput.push("drwxr-xr-x  2 root root 4096 Jan 26 12:00 tools/")
        newOutput.push("-rwxr-xr-x  1 root root 8192 Jan 26 12:00 blackrat.sh")
        newOutput.push("-rw-r--r--  1 root root 1024 Jan 26 12:00 targets.txt")
        break
      case 'exploit':
        newOutput.push("Available exploits:")
        newOutput.push("  [1] Apache Struts RCE (CVE-2024-001)")
        newOutput.push("  [2] Windows SMB Overflow (CVE-2024-002)")
        newOutput.push("  [3] MySQL Auth Bypass (CVE-2024-003)")
        newOutput.push("Use: exploit <number> <target>")
        break
      case 'payload':
        newOutput.push("Payload Generator:")
        newOutput.push("  python_shell  - Python reverse shell")
        newOutput.push("  powershell    - PowerShell empire agent")
        newOutput.push("  meterpreter   - Metasploit meterpreter")
        newOutput.push("  webshell      - PHP web backdoor")
        break
      case 'phish':
        newOutput.push("Phishing Tools:")
        newOutput.push("  Active campaigns: 2")
        newOutput.push("  Templates: 15")
        newOutput.push("  Success rate: 78%")
        break
      default:
        if (command.startsWith('nmap ')) {
          const target = command.substring(5)
          newOutput.push(`Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleTimeString()}`)
          newOutput.push(`Nmap scan report for ${target}`)
          newOutput.push("Host is up (0.001s latency).")
          newOutput.push("PORT     STATE SERVICE")
          newOutput.push("22/tcp   open  ssh")
          newOutput.push("80/tcp   open  http")
          newOutput.push("443/tcp  open  https")
        } else if (command.startsWith('cat ')) {
          const file = command.substring(4)
          if (file === 'targets.txt') {
            newOutput.push("# Target List - BlackRat OS")
            newOutput.push("192.168.1.50    # Web Server")
            newOutput.push("192.168.1.25    # Mail Server") 
            newOutput.push("10.0.0.100      # Database")
          } else {
            newOutput.push(`cat: ${file}: No such file or directory`)
          }
        } else {
          newOutput.push(`bash: ${command}: command not found`)
        }
    }
    
    newOutput.push("")
    setOutput(newOutput)
    setCommand("")
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <BlackRatSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-glass-border bg-glass-gradient backdrop-blur-glass flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <Terminal className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Advanced Terminal</h1>
              </div>
            </header>

            <main className="flex-1 p-6">
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border h-full flex flex-col">
                {/* Terminal Tabs */}
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-t-lg border-b-2 cursor-pointer transition-colors ${
                            session.id === activeSession
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-glass-gradient border-transparent text-muted-foreground hover:text-foreground'
                          }`}
                          onClick={() => setActiveTab(session.id)}
                        >
                          <Terminal className="h-4 w-4" />
                          <span className="text-sm font-medium">{session.name}</span>
                          {sessions.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-destructive/20"
                              onClick={(e) => {
                                e.stopPropagation()
                                closeSession(session.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={addSession}
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                        <Folder className="h-3 w-3 mr-1" />
                        Scripts
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pt-4">
                  {/* Terminal Output */}
                  <div className="flex-1 bg-terminal-bg rounded-lg p-4 overflow-y-auto terminal-scroll">
                    <div className="font-mono text-sm space-y-1">
                      {output.map((line, index) => (
                        <div key={index} className="text-primary whitespace-pre-wrap">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Command Input */}
                  <div className="flex items-center space-x-2 mt-4">
                    <span className="text-sm font-mono text-primary whitespace-nowrap">
                      root@blackrat:/opt/blackrat#
                    </span>
                    <Input
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
                      placeholder="Enter command..."
                      className="bg-terminal-bg border-glass-border font-mono text-sm text-primary placeholder-muted-foreground"
                      autoFocus
                    />
                    <Button
                      onClick={handleCommand}
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Commands */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['help', 'status', 'ls', 'nmap 192.168.1.1', 'exploit', 'clear'].map((cmd) => (
                      <Button
                        key={cmd}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCommand(cmd)
                          setTimeout(handleCommand, 100)
                        }}
                        className="border-glass-border hover:border-primary/30 text-xs font-mono"
                      >
                        {cmd}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default TerminalPage