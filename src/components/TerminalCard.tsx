import { useState } from "react"
import { Terminal, ChevronDown, ChevronUp, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TerminalCard() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState([
    "BlackRat OS Terminal v2.0",
    "Type 'help' for available commands",
    ""
  ])

  const handleCommand = () => {
    if (!command.trim()) return
    
    const newOutput = [...output, `root@blackrat:~$ ${command}`]
    
    // Simulate command responses
    switch (command.toLowerCase()) {
      case 'help':
        newOutput.push("Available commands: help, clear, status, nmap, whoami")
        break
      case 'clear':
        setOutput(["BlackRat OS Terminal v2.0", ""])
        setCommand("")
        return
      case 'status':
        newOutput.push("System Status: ONLINE")
        newOutput.push("Security Level: HIGH")
        break
      case 'whoami':
        newOutput.push("root")
        break
      case 'nmap':
        newOutput.push("Starting Nmap scan...")
        newOutput.push("Host discovery disabled (-Pn)")
        break
      default:
        newOutput.push(`Command '${command}' not found`)
    }
    
    newOutput.push("")
    setOutput(newOutput)
    setCommand("")
  }

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border hover:border-primary/20 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-primary flex items-center space-x-2">
            <Terminal className="h-5 w-5" />
            <span>Terminal</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0 hover:bg-glass"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 animate-fade-in">
          {/* Terminal Output */}
          <div className="bg-terminal-bg rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
            <div className="font-mono text-sm space-y-1">
              {output.map((line, index) => (
                <div key={index} className="text-primary">
                  {line}
                </div>
              ))}
            </div>
          </div>
          
          {/* Command Input */}
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-sm font-mono text-primary">root@blackrat:~$</span>
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
              placeholder="Enter command..."
              className="bg-terminal-bg border-glass-border font-mono text-sm text-primary placeholder-muted-foreground"
            />
            <Button
              onClick={handleCommand}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}