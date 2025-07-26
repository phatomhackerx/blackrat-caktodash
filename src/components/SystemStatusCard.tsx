import { useState } from "react"
import { Cpu, HardDrive, Wifi, Shield, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SystemStatusCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  const systemStats = [
    { label: "CPU Usage", value: "23%", icon: Cpu, color: "text-primary" },
    { label: "RAM Usage", value: "4.2/16 GB", icon: HardDrive, color: "text-primary" },
    { label: "VPN Status", value: "Connected", icon: Shield, color: "text-primary" },
    { label: "Network", value: "192.168.1.100", icon: Wifi, color: "text-muted-foreground" }
  ]

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border hover:border-primary/20 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-primary flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>System Status</span>
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
          <div className="grid grid-cols-2 gap-4">
            {systemStats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-sm font-mono font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          
          {/* Active Ports */}
          <div className="mt-4 pt-4 border-t border-glass-border">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Active Ports</h4>
            <div className="flex flex-wrap gap-2">
              {[22, 80, 443, 8080].map((port) => (
                <span 
                  key={port} 
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded border border-glass-border"
                >
                  :{port}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}