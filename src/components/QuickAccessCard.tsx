import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Zap, Terminal, Target, Activity, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useBlackRatStore } from '@/store/blackrat-store'

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  route: string
  status: 'active' | 'idle' | 'running'
  count?: number
}

export function QuickAccessCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { targets, systemMetrics } = useBlackRatStore()

  const quickActions: QuickAction[] = [
    {
      id: 'scanners',
      title: t('quickAccess.scanners', 'Scanners'),
      description: t('quickAccess.scannersDesc', 'Iniciar escaneamento'),
      icon: Search,
      route: '/scanners',
      status: 'active'
    },
    {
      id: 'exploits',
      title: t('quickAccess.exploits', 'Exploits'),
      description: t('quickAccess.exploitsDesc', 'Base de exploits'),
      icon: Zap,
      route: '/exploits',
      status: 'idle',
      count: 1247
    },
    {
      id: 'terminal',
      title: t('quickAccess.terminal', 'Terminal'),
      description: t('quickAccess.terminalDesc', 'Linha de comando'),
      icon: Terminal,
      route: '/terminal',
      status: 'running'
    },
    {
      id: 'targets',
      title: t('quickAccess.targets', 'Alvos'),
      description: t('quickAccess.targetsDesc', 'Gerenciar alvos'),
      icon: Target,
      route: '/watchlist',
      status: 'active',
      count: targets.length
    },
    {
      id: 'monitoring',
      title: t('quickAccess.monitoring', 'Monitoramento'),
      description: t('quickAccess.monitoringDesc', 'Status do sistema'),
      icon: Activity,
      route: '/monitoring',
      status: systemMetrics.vpnStatus ? 'running' : 'idle'
    },
    {
      id: 'osint',
      title: t('quickAccess.osint', 'OSINT'),
      description: t('quickAccess.osintDesc', 'Inteligência aberta'),
      icon: Eye,
      route: '/osint',
      status: 'active'
    }
  ]

  const getStatusColor = (status: QuickAction['status']) => {
    const colors = {
      active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      idle: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      running: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    }
    return colors[status]
  }

  const getStatusText = (status: QuickAction['status']) => {
    const texts = {
      active: t('status.active', 'Ativo'),
      idle: t('status.idle', 'Inativo'),
      running: t('status.running', 'Executando')
    }
    return texts[status]
  }

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border-glass-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {t('dashboard.quickAccess', 'Acesso Rápido')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="ghost"
                className="h-auto p-3 flex flex-col items-start gap-2 hover:bg-black/30 border border-transparent hover:border-white/10 transition-all group"
                onClick={() => navigate(action.route)}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  <div className="flex items-center gap-1">
                    <Badge className={`text-xs ${getStatusColor(action.status)}`}>
                      {getStatusText(action.status)}
                    </Badge>
                    {action.count !== undefined && (
                      <Badge variant="secondary" className="text-xs">
                        {action.count}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="font-medium text-xs text-white group-hover:text-primary-foreground transition-colors">
                    {action.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}