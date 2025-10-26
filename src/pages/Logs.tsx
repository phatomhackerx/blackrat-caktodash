import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCerberusStore } from "@/store/cerberus-store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, Trash2, Filter, Search, AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react"

const Logs = () => {
  const { t } = useTranslation()
  const { logs, clearLogs } = useCerberusStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesSource = sourceFilter === "all" || log.source === sourceFilter
    
    return matchesSearch && matchesLevel && matchesSource
  })

  const uniqueSources = Array.from(new Set(logs.map(log => log.source)))

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <Info className="h-4 w-4 text-blue-400" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `blackrat_logs_${Date.now()}.json`
    link.click()
  }

  const logStats = {
    total: logs.length,
    error: logs.filter(log => log.level === 'error').length,
    warning: logs.filter(log => log.level === 'warning').length,
    success: logs.filter(log => log.level === 'success').length,
    info: logs.filter(log => log.level === 'info').length
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
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">{t('logs.title')}</h1>
                <Badge className="bg-indigo-900/50 text-indigo-400 border-indigo-800">
                  {filteredLogs.length} / {logs.length} logs
                </Badge>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Log Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total</p>
                        <p className="text-lg font-bold text-primary">{logStats.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Errors</p>
                        <p className="text-lg font-bold text-red-400">{logStats.error}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                        <p className="text-lg font-bold text-yellow-400">{logStats.warning}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Success</p>
                        <p className="text-lg font-bold text-green-400">{logStats.success}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Info className="h-4 w-4 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Info</p>
                        <p className="text-lg font-bold text-blue-400">{logStats.info}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Actions */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>{t('logs.filter')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t('logs.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-terminal-bg border-glass-border text-primary"
                      />
                    </div>
                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                      <SelectTrigger className="w-full md:w-[180px] bg-terminal-bg border-glass-border">
                        <SelectValue placeholder={t('logs.level')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('exploits.all')}</SelectItem>
                        <SelectItem value="error">{t('logs.error')}</SelectItem>
                        <SelectItem value="warning">{t('logs.warning')}</SelectItem>
                        <SelectItem value="success">{t('logs.success')}</SelectItem>
                        <SelectItem value="info">{t('logs.info')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sourceFilter} onValueChange={setSourceFilter}>
                      <SelectTrigger className="w-full md:w-[180px] bg-terminal-bg border-glass-border">
                        <SelectValue placeholder={t('logs.source')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('exploits.all')}</SelectItem>
                        {uniqueSources.map(source => (
                          <SelectItem key={source} value={source}>{source}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={exportLogs}
                        disabled={filteredLogs.length === 0}
                        className="border-glass-border hover:border-primary/30"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t('logs.export')}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={clearLogs}
                        disabled={logs.length === 0}
                        className="border-glass-border hover:border-destructive/30 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('logs.clear')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logs Display */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>System Logs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full">
                    {filteredLogs.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {logs.length === 0 ? "No logs available" : "No logs match the current filters"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredLogs.map((log, logIndex) => (
                          <motion.div
                            key={`${log.id}-${logIndex}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-3 bg-black/20 rounded-lg border border-white/10 hover:bg-black/30 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                {getLevelIcon(log.level)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Badge className={`text-xs ${getLevelColor(log.level)}`}>
                                      {log.level.toUpperCase()}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {log.source}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-foreground font-mono break-words">
                                    {log.message}
                                  </p>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground ml-4 whitespace-nowrap">
                                {log.timestamp.toLocaleString()}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
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