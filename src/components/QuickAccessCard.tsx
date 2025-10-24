import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Zap, Terminal, Target, Activity, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCerberusStore } from '@/store/cerberus-store'

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
  const { targets, systemMetrics } = useCerberusStore()

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


  return (
    <Card className="bg-card border-border hover:border-border/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium tracking-tight">
          {t('dashboard.quickAccess', 'Acesso Rápido')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="ghost"
                className="h-auto p-3 flex flex-col items-start gap-2.5 hover:bg-accent/50 border border-border/50 hover:border-border transition-all duration-200 group rounded-md"
                onClick={() => navigate(action.route)}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className="h-4 w-4 text-foreground/70 group-hover:text-foreground transition-colors" />
                  <div className="flex items-center gap-1">
                    {action.count !== undefined && (
                      <Badge variant="outline" className="text-xs font-mono">
                        {action.count}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-left w-full">
                  <div className="font-medium text-xs text-foreground group-hover:text-foreground transition-colors mb-0.5">
                    {action.title}
                  </div>
                  <div className="text-xs text-muted-foreground font-light">
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