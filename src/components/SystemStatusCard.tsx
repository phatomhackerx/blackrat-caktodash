import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Cpu, HardDrive, Wifi, Shield, Activity } from 'lucide-react'
import { useBlackRatStore } from '@/store/blackrat-store'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function SystemStatusCard() {
  const { t } = useTranslation()
  const { systemMetrics, updateSystemMetrics } = useBlackRatStore()

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateSystemMetrics({
        cpu: Math.max(10, Math.min(90, systemMetrics.cpu + (Math.random() - 0.5) * 10)),
        ram: {
          ...systemMetrics.ram,
          used: Math.max(1, Math.min(15, systemMetrics.ram.used + (Math.random() - 0.5) * 0.5))
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [systemMetrics.cpu, systemMetrics.ram.used, updateSystemMetrics])

  const metrics = [
    {
      label: t('system.cpu', 'CPU'),
      value: systemMetrics.cpu,
      max: 100,
      unit: '%',
      icon: Cpu,
      color: systemMetrics.cpu > 80 ? 'bg-red-500' : systemMetrics.cpu > 60 ? 'bg-yellow-500' : 'bg-emerald-500'
    },
    {
      label: t('system.ram', 'RAM'),
      value: systemMetrics.ram.used,
      max: systemMetrics.ram.total,
      unit: 'GB',
      icon: HardDrive,
      color: (systemMetrics.ram.used / systemMetrics.ram.total) > 0.8 ? 'bg-red-500' : 'bg-emerald-500'
    }
  ]

  const networkStatus = [
    {
      label: t('system.network', 'Rede'),
      value: systemMetrics.network,
      icon: Wifi,
      status: 'connected'
    },
    {
      label: t('system.vpn', 'VPN'),
      value: systemMetrics.vpnStatus ? t('common.connected') : t('common.disconnected'),
      icon: Shield,
      status: systemMetrics.vpnStatus ? 'connected' : 'disconnected'
    },
    {
      label: t('system.shells', 'Shells'),
      value: `${systemMetrics.activeShells} ativas`,
      icon: Activity,
      status: systemMetrics.activeShells > 0 ? 'connected' : 'idle'
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      connected: 'text-foreground',
      disconnected: 'text-muted-foreground',
      idle: 'text-muted-foreground/70'
    }
    return colors[status as keyof typeof colors] || 'text-muted-foreground'
  }

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      connected: 'border-foreground/20 bg-foreground/5',
      disconnected: 'border-border bg-card',
      idle: 'border-border bg-muted'
    }
    return colors[status as keyof typeof colors] || 'border-border bg-card'
  }

  return (
    <Card className="bg-card border-border hover:border-border/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium tracking-tight">
          {t('dashboard.systemStatus', 'Status do Sistema')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Resource Usage */}
        <div className="space-y-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const percentage = (metric.value / metric.max) * 100
            
            return (
              <div key={metric.label} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-foreground/60" />
                    <span className="text-sm font-light text-foreground">{metric.label}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">
                    {metric.value.toFixed(1)}{metric.unit} / {metric.max}{metric.unit}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-1.5"
                />
              </div>
            )
          })}
        </div>

        {/* Network Status */}
        <div className="space-y-3 pt-4 border-t border-border">
          {networkStatus.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${getStatusColor(item.status)}`} />
                  <span className="text-sm font-light text-foreground">{item.label}</span>
                </div>
                <Badge variant="outline" className={`text-xs font-mono ${getStatusBadgeColor(item.status)}`}>
                  {item.value}
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Open Ports */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-light text-foreground">{t('system.openPorts', 'Portas Abertas')}</span>
            <Badge variant="outline" className="text-xs font-mono">
              {systemMetrics.openPorts.length}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {systemMetrics.openPorts.map((port) => (
              <Badge 
                key={port} 
                variant="outline" 
                className="text-xs font-mono bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                {port}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}