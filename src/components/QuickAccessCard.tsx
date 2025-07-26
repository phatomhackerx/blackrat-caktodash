import { useState } from "react"
import { 
  Terminal, 
  Search, 
  Wifi, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  Play 
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function QuickAccessCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  const quickTools = [
    { 
      name: "Nmap Scan", 
      icon: Search, 
      command: "nmap -sS -sV", 
      description: "Network discovery"
    },
    { 
      name: "Metasploit", 
      icon: Target, 
      command: "msfconsole", 
      description: "Exploitation framework"
    },
    { 
      name: "Wireshark", 
      icon: Wifi, 
      command: "wireshark", 
      description: "Packet analyzer"
    },
    { 
      name: "Terminal", 
      icon: Terminal, 
      command: "/bin/bash", 
      description: "System shell"
    }
  ]

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border hover:border-primary/20 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-primary flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Quick Access</span>
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
          <div className="grid grid-cols-2 gap-3">
            {quickTools.map((tool) => (
              <Button
                key={tool.name}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-start space-y-2 bg-glass-gradient border border-glass-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2 w-full">
                  <tool.icon className="h-4 w-4 text-primary group-hover:text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {tool.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  {tool.description}
                </p>
                <code className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                  {tool.command}
                </code>
              </Button>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}