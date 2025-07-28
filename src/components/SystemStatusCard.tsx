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
      connected: 'text-emerald-400',
      disconnected: 'text-red-400',
      idle: 'text-yellow-400'
    }
    return colors[status as keyof typeof colors] || 'text-gray-400'
  }

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      connected: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      disconnected: 'bg-red-500/20 text-red-400 border-red-500/30',
      idle: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border-glass-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {t('dashboard.systemStatus', 'Status do Sistema')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resource Usage */}
        <div className="space-y-3">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const percentage = (metric.value / metric.max) * 100
            
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-white">{metric.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {metric.value.toFixed(1)}{metric.unit} / {metric.max}{metric.unit}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
              </div>
            )
          })}
        </div>

        {/* Network Status */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          {networkStatus.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${getStatusColor(item.status)}`} />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <Badge className={`text-xs ${getStatusBadgeColor(item.status)}`}>
                  {item.value}
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Open Ports */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white">{t('system.openPorts', 'Portas Abertas')}</span>
            <Badge variant="secondary" className="text-xs">
              {systemMetrics.openPorts.length}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {systemMetrics.openPorts.map((port) => (
              <Badge 
                key={port} 
                variant="outline" 
                className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/30"
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