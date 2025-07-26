import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Play, Target, Clock, Activity } from "lucide-react"

const Scanners = () => {
  const [scanTarget, setScanTarget] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const scanTypes = [
    { name: "Nmap TCP Scan", command: "nmap -sS", description: "TCP SYN stealth scan" },
    { name: "Nmap UDP Scan", command: "nmap -sU", description: "UDP port scan" },
    { name: "Nmap Aggressive", command: "nmap -A", description: "OS detection, version detection, script scanning" },
    { name: "Masscan", command: "masscan", description: "High-speed port scanner" },
    { name: "Rustscan", command: "rustscan", description: "Modern port scanner" },
    { name: "Zmap", command: "zmap", description: "Internet-wide network scanner" }
  ]

  const recentScans = [
    { target: "192.168.1.0/24", type: "TCP Scan", status: "completed", time: "2m ago", ports: 12 },
    { target: "10.0.0.50", type: "Aggressive", status: "running", time: "5m ago", ports: 8 },
    { target: "company.com", type: "UDP Scan", status: "completed", time: "1h ago", ports: 5 }
  ]

  const handleScan = () => {
    if (!scanTarget.trim()) return
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 3000)
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
                <Search className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Network Scanners</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Quick Scan */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Quick Scan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Enter target (IP, range, or domain)"
                      value={scanTarget}
                      onChange={(e) => setScanTarget(e.target.value)}
                      className="bg-terminal-bg border-glass-border text-primary"
                    />
                    <Button 
                      onClick={handleScan}
                      disabled={isScanning}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isScanning ? (
                        <Activity className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      {isScanning ? "Scanning..." : "Start Scan"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Scan Types */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Available Scanners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scanTypes.map((scan) => (
                      <div key={scan.name} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <h3 className="font-semibold text-foreground mb-2">{scan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{scan.description}</p>
                        <code className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded block mb-3">
                          {scan.command}
                        </code>
                        <Button variant="outline" size="sm" className="w-full border-glass-border hover:border-primary/30">
                          Configure & Run
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Scans */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Recent Scans</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentScans.map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${scan.status === 'running' ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                          <div>
                            <p className="font-semibold text-foreground">{scan.target}</p>
                            <p className="text-sm text-muted-foreground">{scan.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{scan.time}</p>
                          <p className="text-sm font-semibold text-foreground">{scan.ports} ports found</p>
                        </div>
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

export default Scanners