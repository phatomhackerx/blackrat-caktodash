import { useState } from "react"
import { Target, ChevronDown, ChevronUp, Plus, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function WatchlistCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  const targets = [
    {
      name: "corp-web-01",
      ip: "192.168.1.50",
      status: "online",
      ports: [80, 443, 22],
      lastSeen: "2min ago"
    },
    {
      name: "mail-server",
      ip: "192.168.1.25",
      status: "online", 
      ports: [25, 110, 993],
      lastSeen: "5min ago"
    },
    {
      name: "database-srv",
      ip: "192.168.1.100",
      status: "offline",
      ports: [3306, 5432],
      lastSeen: "1h ago"
    }
  ]

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'text-green-400' : 'text-red-400'
  }

  const getStatusDot = (status: string) => {
    return status === 'online' ? 'bg-green-400' : 'bg-red-400'
  }

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border hover:border-primary/20 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-primary flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Watchlist</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-glass"
            >
              <Plus className="h-4 w-4" />
            </Button>
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
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 animate-fade-in">
          <div className="space-y-3">
            {targets.map((target, index) => (
              <div 
                key={index}
                className="p-3 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusDot(target.status)} animate-pulse-subtle`}></div>
                    <span className="text-sm font-semibold text-foreground">
                      {target.name}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold ${getStatusColor(target.status)}`}>
                    {target.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-mono text-muted-foreground">
                    {target.ip}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {target.ports.map((port) => (
                        <span 
                          key={port}
                          className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-mono rounded border border-glass-border"
                        >
                          :{port}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {target.lastSeen}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2 mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-glass-border hover:border-primary/30 hover:bg-primary/5"
            >
              <Activity className="h-3 w-3 mr-1" />
              Scan All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-glass-border hover:border-primary/30 hover:bg-primary/5"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Target
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}