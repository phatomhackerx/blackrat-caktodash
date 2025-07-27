import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Filter, Download, Trash2, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react"

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const logLevels = ["all", "error", "warning", "info", "success"]

  const systemLogs = [
    {
      id: "LOG-001",
      timestamp: "2024-01-15 14:32:15",
      level: "error",
      source: "Nmap Scanner",
      message: "Failed to connect to target 192.168.1.100:443 - Connection timeout",
      details: "TCP SYN scan failed after 3 retries"
    },
    {
      id: "LOG-002", 
      timestamp: "2024-01-15 14:30:42",
      level: "success",
      source: "Metasploit",
      message: "Payload delivered successfully to target system",
      details: "Meterpreter session established on 192.168.1.55"
    },
    {
      id: "LOG-003",
      timestamp: "2024-01-15 14:28:18",
      level: "warning",
      source: "VPN Manager",
      message: "VPN connection unstable - packet loss detected",
      details: "3.2% packet loss over last 5 minutes"
    },
    {
      id: "LOG-004",
      timestamp: "2024-01-15 14:25:33",
      level: "info",
      source: "System Monitor",
      message: "Memory usage reached 85% - optimization recommended",
      details: "Current RAM usage: 13.6GB / 16GB"
    },
    {
      id: "LOG-005",
      timestamp: "2024-01-15 14:23:07",
      level: "error",
      source: "Payload Generator",
      message: "Failed to encode payload - invalid parameters",
      details: "Architecture mismatch: x64 payload for x86 target"
    },
    {
      id: "LOG-006",
      timestamp: "2024-01-15 14:20:45",
      level: "success",
      source: "Phishing Campaign",
      message: "Email template deployed successfully",
      details: "Campaign 'Banking Update' sent to 250 targets"
    }
  ]

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <XCircle className="h-4 w-4 text-red-400" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case 'info': return <Info className="h-4 w-4 text-blue-400" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />
      default: return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'warning': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'info': return 'bg-blue-900/50 text-blue-400 border-blue-800'
      case 'success': return 'bg-green-900/50 text-green-400 border-green-800'
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800'
    }
  }

  const filteredLogs = systemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  const logStats = {
    total: systemLogs.length,
    errors: systemLogs.filter(l => l.level === 'error').length,
    warnings: systemLogs.filter(l => l.level === 'warning').length,
    info: systemLogs.filter(l => l.level === 'info').length,
    success: systemLogs.filter(l => l.level === 'success').length
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
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">System Logs</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Log Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{logStats.total}</p>
                      <p className="text-sm text-muted-foreground">Total Logs</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-400">{logStats.errors}</p>
                      <p className="text-sm text-muted-foreground">Errors</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-400">{logStats.warnings}</p>
                      <p className="text-sm text-muted-foreground">Warnings</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">{logStats.info}</p>
                      <p className="text-sm text-muted-foreground">Info</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">{logStats.success}</p>
                      <p className="text-sm text-muted-foreground">Success</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filters */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search logs by message or source..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-terminal-bg border-glass-border text-primary"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      {logLevels.map((level) => (
                        <Button
                          key={level}
                          variant={selectedLevel === level ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedLevel(level)}
                          className={selectedLevel === level 
                            ? "bg-primary text-primary-foreground" 
                            : "border-glass-border hover:border-primary/30"
                          }
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Button>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Log Entries */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Log Entries ({filteredLogs.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredLogs.map((log) => (
                      <div key={log.id} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getLevelIcon(log.level)}
                            <span className="text-sm font-mono text-muted-foreground">{log.timestamp}</span>
                            <Badge className={getLevelColor(log.level)}>
                              {log.level.toUpperCase()}
                            </Badge>
                            <span className="text-sm font-semibold text-primary">{log.source}</span>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">{log.id}</span>
                        </div>
                        
                        <p className="text-foreground mb-2">{log.message}</p>
                        <p className="text-sm text-muted-foreground font-mono">{log.details}</p>
                      </div>
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

export default Logs