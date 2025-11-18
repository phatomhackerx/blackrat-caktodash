import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCerberusStore } from "@/store/cerberus-store"
import { Target, Plus, Activity, Clock, Eye, Trash2, Upload } from "lucide-react"
import { DetailModal } from "@/components/DetailModal"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { useToast } from "@/hooks/use-toast"

const Watchlist = () => {
  const { t } = useTranslation()
  const { targets, addTarget, removeTarget, addLog } = useCerberusStore()
  const [newTarget, setNewTarget] = useState("")
  const [selectedTarget, setSelectedTarget] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [targetToDelete, setTargetToDelete] = useState<any>(null)
  const { toast } = useToast()

  // Mock data for demo
  const mockTargets = [
    {
      id: "1",
      name: "Corporate Web Server",
      ip: "192.168.1.50",
      ports: [80, 443, 22, 8080],
      status: "online",
      lastSeen: "1m ago",
      services: ["Apache 2.4.41", "OpenSSH 8.2", "Tomcat 9.0"],
      risk: "high",
      notes: "Main web application server"
    },
    {
      id: "2",
      name: "Mail Server",
      ip: "192.168.1.25", 
      ports: [25, 110, 143, 993, 995],
      status: "online",
      lastSeen: "3m ago",
      services: ["Postfix 3.4.13", "Dovecot 2.3.7"],
      risk: "medium",
      notes: "Exchange server with potential vulnerabilities"
    },
    {
      id: "3",
      name: "Database Server",
      ip: "10.0.0.100",
      ports: [3306, 5432, 1433],
      status: "offline",
      lastSeen: "2h ago",
      services: ["MySQL 8.0", "PostgreSQL 13", "MSSQL 2019"],
      risk: "critical",
      notes: "Contains sensitive customer data"
    },
    {
      id: "4",
      name: "VPN Gateway",
      ip: "203.0.113.10",
      ports: [1723, 4500, 443],
      status: "monitoring",
      lastSeen: "5m ago", 
      services: ["OpenVPN 2.5", "IPSec"],
      risk: "low",
      notes: "External VPN endpoint"
    }
  ]

  const recentActivity = [
    { target: "Corporate Web Server", action: "Port scan completed", details: "Found new service on port 8080", time: "5m ago" },
    { target: "Mail Server", action: "Service fingerprint", details: "Dovecot version updated", time: "12m ago" },
    { target: "Database Server", action: "Connection lost", details: "Server went offline", time: "2h ago" },
    { target: "VPN Gateway", action: "Vulnerability scan", details: "No new CVEs found", time: "4h ago" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400'
      case 'offline': return 'text-red-400'
      case 'monitoring': return 'text-yellow-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400'
      case 'offline': return 'bg-red-400'
      case 'monitoring': return 'bg-yellow-400 animate-pulse'
      default: return 'bg-gray-400'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'high': return 'bg-orange-900/50 text-orange-400 border-orange-800'
      case 'medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'low': return 'bg-green-900/50 text-green-400 border-green-800'
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800'
    }
  }

  const handleAddTarget = () => {
    if (!newTarget.trim()) return
    
    // Parse IP address or domain
    const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(newTarget)
    const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(newTarget)
    
    addTarget({
      name: isIP ? `Server ${newTarget}` : isDomain ? newTarget : `Target ${newTarget}`,
      ip: newTarget,
      description: `Added manually by user`,
      tags: [isIP ? 'ip' : isDomain ? 'domain' : 'custom'],
      priority: 'medium',
      status: 'unknown'
    })
    
    toast({
      title: "Alvo Adicionado",
      description: `${newTarget} foi adicionado à watchlist`
    })
    
    addLog({
      level: 'info',
      source: 'Watchlist',
      message: `New target added: ${newTarget}`
    })
    
    setNewTarget("")
  }

  const handleRemoveTarget = (targetId: string) => {
    removeTarget(targetId)
    toast({
      title: "Alvo Removido",
      description: "Target removido da watchlist",
      variant: "destructive"
    })
    addLog({
      level: 'info',
      source: 'Watchlist',
      message: `Target removed from watchlist`
    })
  }

  const scanTarget = (target: any) => {
    toast({
      title: "Scan Iniciado",
      description: `Escaneando ${target.name}...`
    })
    addLog({
      level: 'info',
      source: 'Watchlist',
      message: `Scanning target: ${target.name} (${target.ip})`
    })
    setTimeout(() => {
      toast({
        title: "Scan Completo",
        description: `${target.name} escaneado com sucesso`
      })
      addLog({
        level: 'success',
        source: 'Watchlist',
        message: `Scan completed for ${target.name}`
      })
    }, 2000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen bg-background relative"
    >
      <StarfieldBackground />
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CerberusSidebar />
          
          <div className="flex-1 flex flex-col relative z-10">
            <header className="h-16 border-b border-foreground/10 bg-background/80 backdrop-blur-xl flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <Target className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">{t('watchlist.title')}</h1>
                <Badge className="bg-blue-900/50 text-blue-400 border-blue-800">
                  {targets.length} Targets
                </Badge>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Add New Target */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>{t('watchlist.addTarget')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Input
                      placeholder={`${t('watchlist.ipAddress')}, domain, or network range...`}
                      value={newTarget}
                      onChange={(e) => setNewTarget(e.target.value)}
                      className="bg-terminal-bg border-glass-border text-primary"
                    />
                    <Button 
                      onClick={handleAddTarget}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {t('watchlist.addTarget')}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-glass-border hover:border-primary/30"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = '.txt,.csv'
                        input.onchange = (e: any) => {
                          const file = e.target.files[0]
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            const text = event.target?.result as string
                            const lines = text.split('\n').filter(l => l.trim())
                            lines.forEach(line => {
                              addTarget({
                                name: `Imported ${line}`,
                                ip: line.trim(),
                                description: 'Imported from file',
                                tags: ['imported'],
                                priority: 'medium',
                                status: 'unknown'
                              })
                            })
                            addLog({ 
                              level: 'success', 
                              source: 'Watchlist', 
                              message: `Imported ${lines.length} targets from file` 
                            })
                          }
                          reader.readAsText(file)
                        }
                        input.click()
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import List
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Target List */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Active Targets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTargets.map((target) => (
                      <div key={target.id} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusDot(target.status)}`}></div>
                            <div>
                              <h3 className="font-semibold text-foreground">{target.name}</h3>
                              <p className="text-sm font-mono text-muted-foreground">{target.ip}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={getRiskColor(target.risk)}>
                              {target.risk}
                            </Badge>
                            <span className={`text-sm font-semibold ${getStatusColor(target.status)}`}>
                              {target.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        {/* Services */}
                        <div className="mb-3">
                          <p className="text-sm text-muted-foreground mb-2">Detected Services:</p>
                          <div className="flex flex-wrap gap-2">
                            {target.services.map((service, index) => (
                              <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded border border-glass-border">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Ports */}
                        <div className="mb-3">
                          <p className="text-sm text-muted-foreground mb-2">Open Ports:</p>
                          <div className="flex flex-wrap gap-2">
                            {target.ports.map((port) => (
                              <span key={port} className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded border border-primary/30">
                                :{port}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Notes */}
                        <p className="text-sm text-muted-foreground mb-3">{target.notes}</p>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Last seen: {target.lastSeen}</span>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-glass-border hover:border-primary/30"
                              onClick={() => scanTarget(target)}
                            >
                              <Activity className="h-3 w-3 mr-1" />
                              Scan
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-glass-border hover:border-primary/30"
                              onClick={() => {
                                setSelectedTarget(target)
                                setDetailsOpen(true)
                                addLog({
                                  level: 'info',
                                  source: 'Watchlist',
                                  message: `Viewing detailed information for ${target.name}`
                                })
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-glass-border hover:border-destructive/30 hover:text-destructive"
                              onClick={() => {
                                setTargetToDelete(target)
                                setDeleteConfirmOpen(true)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-foreground">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.target}</p>
                            <p className="text-sm text-foreground">{activity.details}</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
      
      {/* Target Details Modal */}
      <DetailModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title={selectedTarget?.name || "Detalhes do Alvo"}
        description={`${selectedTarget?.ip} - ${selectedTarget?.status}`}
      >
        {selectedTarget && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Endereço IP</p>
                <p className="font-mono font-semibold">{selectedTarget.ip}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge className={`${getStatusDot(selectedTarget.status)} px-3`}>
                  {selectedTarget.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nível de Risco</p>
                <Badge className={getRiskColor(selectedTarget.risk)}>
                  {selectedTarget.risk.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Última Visualização</p>
                <p className="font-semibold">{selectedTarget.lastSeen}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Portas Abertas</p>
              <div className="flex flex-wrap gap-2">
                {selectedTarget.ports.map((port: number) => (
                  <span key={port} className="px-3 py-1 bg-primary/10 text-primary font-mono rounded border border-primary/30">
                    :{port}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Serviços Detectados</p>
              <div className="space-y-2">
                {selectedTarget.services.map((service: string, index: number) => (
                  <div key={index} className="p-3 bg-foreground/5 rounded-lg border border-foreground/10">
                    <p className="font-mono text-sm">{service}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Notas</p>
              <p className="text-sm bg-foreground/5 p-4 rounded-lg border border-foreground/10">
                {selectedTarget.notes}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                className="flex-1"
                onClick={() => {
                  scanTarget(selectedTarget)
                  setDetailsOpen(false)
                }}
              >
                <Activity className="h-4 w-4 mr-2" />
                Escanear Agora
              </Button>
              <Button 
                variant="outline"
                onClick={() => setDetailsOpen(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        )}
      </DetailModal>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Remover Alvo"
        description={`Tem certeza que deseja remover "${targetToDelete?.name}" da watchlist? Esta ação não pode ser desfeita.`}
        onConfirm={() => targetToDelete && handleRemoveTarget(targetToDelete.id)}
        confirmText="Remover"
        cancelText="Cancelar"
        variant="destructive"
      />
    </motion.div>
  )
}

export default Watchlist