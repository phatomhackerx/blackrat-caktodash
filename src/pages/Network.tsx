import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBlackRatStore } from "@/store/blackrat-store"
import { Wifi, Globe, Shield, Router, Smartphone, Monitor, Play, Search } from "lucide-react"

const Network = () => {
  const { t } = useTranslation()
  const { addLog, addTarget } = useBlackRatStore()

  const startNetworkScan = () => {
    addLog({
      level: 'info',
      source: 'Network',
      message: 'Network discovery scan initiated'
    })
  }

  const addToWatchlist = (device: any) => {
    addTarget({
      name: device.name,
      ip: device.ip,
      description: `${device.vendor} ${device.type}`,
      tags: [device.type, device.vendor],
      priority: 'medium',
      status: 'unknown'
    })
    addLog({
      level: 'info',
      source: 'Network',
      message: `Device ${device.name} added to watchlist`
    })
  }
  const networkNodes = [
    {
      id: 1,
      name: "Router Gateway",
      ip: "192.168.1.1",
      mac: "aa:bb:cc:dd:ee:ff",
      type: "router",
      vendor: "Cisco",
      status: "active",
      services: ["HTTP", "SSH", "SNMP"]
    },
    {
      id: 2,
      name: "Web Server",
      ip: "192.168.1.50", 
      mac: "11:22:33:44:55:66",
      type: "server",
      vendor: "Dell",
      status: "active",
      services: ["HTTP", "HTTPS", "SSH"]
    },
    {
      id: 3,
      name: "Workstation-01",
      ip: "192.168.1.101",
      mac: "aa:11:bb:22:cc:33",
      type: "workstation",
      vendor: "HP",
      status: "active",
      services: ["SMB", "RDP"]
    },
    {
      id: 4,
      name: "Mobile Device",
      ip: "192.168.1.150",
      mac: "ff:ee:dd:cc:bb:aa", 
      type: "mobile",
      vendor: "Apple",
      status: "connected",
      services: ["HTTP"]
    }
  ]

  const networkSegments = [
    { name: "DMZ", range: "203.0.113.0/24", devices: 3, security: "high" },
    { name: "Internal", range: "192.168.1.0/24", devices: 45, security: "medium" },
    { name: "Guest", range: "10.0.0.0/24", devices: 12, security: "low" },
    { name: "Management", range: "172.16.0.0/24", devices: 8, security: "critical" }
  ]

  const trafficStats = [
    { protocol: "HTTP", percentage: 45, bytes: "2.3 GB" },
    { protocol: "HTTPS", percentage: 35, bytes: "1.8 GB" },
    { protocol: "SSH", percentage: 12, bytes: "456 MB" },
    { protocol: "Other", percentage: 8, bytes: "234 MB" }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'router': return Router
      case 'server': return Monitor
      case 'workstation': return Monitor
      case 'mobile': return Smartphone
      default: return Globe
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'connected': return 'text-blue-400'
      case 'inactive': return 'text-red-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400'
      case 'connected': return 'bg-blue-400'
      case 'inactive': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'critical': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'high': return 'bg-orange-900/50 text-orange-400 border-orange-800'
      case 'medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'low': return 'bg-green-900/50 text-green-400 border-green-800'
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800'
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <BlackRatSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-glass-border bg-glass-gradient backdrop-blur-glass flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <Wifi className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">{t('sidebar.network')}</h1>
                <Badge className="bg-blue-900/50 text-blue-400 border-blue-800">
                  {networkNodes.length} Devices
                </Badge>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Network Segments */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Network Segments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {networkSegments.map((segment) => (
                      <div key={segment.name} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-foreground">{segment.name}</h3>
                          <Badge className={getSecurityColor(segment.security)}>
                            {segment.security}
                          </Badge>
                        </div>
                        <p className="text-sm font-mono text-muted-foreground mb-2">{segment.range}</p>
                        <p className="text-2xl font-bold text-primary">{segment.devices}</p>
                        <p className="text-sm text-muted-foreground">devices detected</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Discovered Devices */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Discovered Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {networkNodes.map((node) => {
                      const IconComponent = getTypeIcon(node.type)
                      return (
                        <div key={node.id} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${getStatusDot(node.status)}`}></div>
                              <IconComponent className="h-5 w-5 text-primary" />
                              <div>
                                <h3 className="font-semibold text-foreground">{node.name}</h3>
                                <p className="text-sm text-muted-foreground">{node.vendor} • {node.type}</p>
                              </div>
                            </div>
                            <span className={`text-sm font-semibold ${getStatusColor(node.status)}`}>
                              {node.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground">IP Address</p>
                              <p className="text-sm font-mono text-foreground">{node.ip}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">MAC Address</p>
                              <p className="text-sm font-mono text-foreground">{node.mac}</p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground mb-2">Running Services</p>
                            <div className="flex flex-wrap gap-2">
                              {node.services.map((service, index) => (
                                <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded border border-glass-border">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                              <Shield className="h-3 w-3 mr-1" />
                              Scan Ports
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-glass-border hover:border-primary/30"
                              onClick={() => addToWatchlist(node)}
                            >
                              Add to Watchlist
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Analysis */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Traffic Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficStats.map((stat) => (
                      <div key={stat.protocol} className="flex items-center justify-between p-3 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">{stat.protocol}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{stat.protocol} Traffic</p>
                            <p className="text-sm text-muted-foreground">{stat.bytes} transferred</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{stat.percentage}%</p>
                          <div className="w-24 h-2 bg-secondary rounded-full mt-1">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-300"
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-center space-x-4">
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={startNetworkScan}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Network Scan
                    </Button>
                    <Button variant="outline" className="border-glass-border hover:border-primary/30">
                      Export Network Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </motion.div>
  )
}

export default Network