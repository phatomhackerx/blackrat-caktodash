import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCerberusStore } from "@/store/cerberus-store"
import { Activity, Cpu, HardDrive, Wifi, Users, AlertTriangle, Eye } from "lucide-react"

const Monitoring = () => {
  const { t } = useTranslation()
  const { systemMetrics, addLog } = useCerberusStore()
  const [activeAlerts, setActiveAlerts] = useState(3)

  // Real-time monitoring updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random security alerts
      if (Math.random() > 0.95) {
        addLog({
          level: 'warning',
          source: 'Monitoring',
          message: 'Suspicious activity detected'
        })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [addLog])

  const realTimeMetrics = [
    { 
      label: "CPU Usage", 
      value: `${systemMetrics.cpuUsage.toFixed(1)}%`, 
      status: systemMetrics.cpuUsage > 80 ? "high" : systemMetrics.cpuUsage > 60 ? "warning" : "normal", 
      icon: Cpu 
    },
    { 
      label: "Memory Usage", 
      value: `${systemMetrics.memoryUsage.toFixed(1)}%`, 
      status: systemMetrics.memoryUsage > 80 ? "high" : systemMetrics.memoryUsage > 60 ? "warning" : "normal", 
      icon: HardDrive 
    },
    { 
      label: "Network I/O", 
      value: `${(systemMetrics.networkSpeed / 1000).toFixed(1)} GB/s`, 
      status: systemMetrics.networkSpeed > 800 ? "high" : "normal", 
      icon: Wifi 
    },
    { 
      label: "Active Sessions", 
      value: systemMetrics.activeConnections.toString(), 
      status: "normal", 
      icon: Users 
    }
  ]

  const alerts = [
    {
      id: 1,
      type: "Security",
      severity: "High",
      message: "Multiple failed login attempts detected on 192.168.1.50",
      time: "2m ago",
      source: "SSH Monitor"
    },
    {
      id: 2, 
      type: "Network",
      severity: "Medium",
      message: "Unusual traffic pattern detected on port 443",
      time: "15m ago",
      source: "Traffic Analyzer"
    },
    {
      id: 3,
      type: "System",
      severity: "Low", 
      message: "High memory usage on target server",
      time: "1h ago",
      source: "Resource Monitor"
    }
  ]

  const networkActivity = [
    { host: "192.168.1.50", service: "HTTP", connections: 45, status: "active" },
    { host: "192.168.1.25", service: "SMTP", connections: 12, status: "active" },
    { host: "10.0.0.100", service: "MySQL", connections: 8, status: "monitored" },
    { host: "company.com", service: "HTTPS", connections: 23, status: "scanning" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-muted-foreground'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'Medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'Low': return 'bg-green-900/50 text-green-400 border-green-800'
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800'
    }
  }

  const getActivityStatus = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400'
      case 'monitored': return 'bg-blue-400'
      case 'scanning': return 'bg-yellow-400 animate-pulse'
      default: return 'bg-gray-400'
    }
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
              <div className="flex items-center space-x-4">
                <Activity className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">{t('monitoring.title')}</h1>
                <div className="flex items-center space-x-2">
                  {activeAlerts > 0 && (
                    <Badge className="bg-red-900/50 text-red-400 border-red-800 animate-pulse">
                      {activeAlerts} Alerts
                    </Badge>
                  )}
                </div>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* System Metrics */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">System Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {realTimeMetrics.map((metric) => (
                      <div key={metric.label} className="p-4 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <metric.icon className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                        <p className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                          {metric.status.toUpperCase()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Alerts */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Active Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{alert.type}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{alert.time}</span>
                        </div>
                        
                        <p className="text-foreground font-medium mb-2">{alert.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Source: {alert.source}</span>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                              <Eye className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                            <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Network Activity */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Wifi className="h-5 w-5" />
                    <span>Network Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {networkActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${getActivityStatus(activity.status)}`}></div>
                          <div>
                            <p className="font-semibold text-foreground">{activity.host}</p>
                            <p className="text-sm text-muted-foreground">{activity.service}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">{activity.connections} conn.</p>
                          <p className="text-sm text-muted-foreground capitalize">{activity.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" className="border-glass-border hover:border-primary/30">
                      View Full Network Map
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-20 flex flex-col space-y-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Activity className="h-6 w-6" />
                      <span>Start Full Scan</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 border-glass-border hover:border-primary/30">
                      <AlertTriangle className="h-6 w-6" />
                      <span>Review Alerts</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 border-glass-border hover:border-primary/30">
                      <Eye className="h-6 w-6" />
                      <span>Export Report</span>
                    </Button>
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

export default Monitoring