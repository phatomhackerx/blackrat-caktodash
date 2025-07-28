import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Target, Plus, MoreVertical, Clock, Shield } from 'lucide-react'
import { useBlackRatStore } from '@/store/blackrat-store'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function WatchlistCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { targets, setCurrentTarget, removeTarget, addLog } = useBlackRatStore()

  const getStatusColor = (status: string) => {
    const colors = {
      scanning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      vulnerable: 'bg-red-500/20 text-red-400 border-red-500/30',
      secure: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      unknown: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[status as keyof typeof colors] || colors.unknown
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'bg-red-500/20 text-red-400 border-red-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const formatLastScan = (date?: Date) => {
    if (!date) return t('watchlist.neverScanned', 'Nunca escaneado')
    
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return t('watchlist.justNow', 'Agora mesmo')
    if (diffInHours < 24) return t('watchlist.hoursAgo', '{hours}h atrás', { hours: diffInHours })
    return t('watchlist.daysAgo', '{days}d atrás', { days: Math.floor(diffInHours / 24) })
  }

  const handleSelectTarget = (target: typeof targets[0]) => {
    setCurrentTarget(target)
    addLog({
      level: 'info',
      source: 'Watchlist',
      message: `Alvo selecionado: ${target.name} (${target.ip})`
    })
  }

  const handleRemoveTarget = (id: string, name: string) => {
    removeTarget(id)
    addLog({
      level: 'warning',
      source: 'Watchlist',
      message: `Alvo removido: ${name}`
    })
  }

  const recentTargets = targets.slice(0, 3)

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border-glass-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Target className="h-4 w-4" />
          {t('dashboard.watchlist', 'Lista de Alvos')}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/watchlist')}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTargets.length === 0 ? (
          <div className="text-center py-4">
            <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              {t('watchlist.empty', 'Nenhum alvo adicionado')}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => navigate('/watchlist')}
            >
              {t('watchlist.addFirst', 'Adicionar primeiro alvo')}
            </Button>
          </div>
        ) : (
          recentTargets.map((target) => (
            <div 
              key={target.id}
              className="p-3 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 transition-colors group cursor-pointer"
              onClick={() => handleSelectTarget(target)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm text-white truncate">
                      {target.name}
                    </h3>
                    <Badge className={`text-xs ${getPriorityColor(target.priority)}`}>
                      {t(`priority.${target.priority}`, target.priority)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {target.ip}
                  </p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/scanners')}>
                      <Shield className="h-4 w-4 mr-2" />
                      {t('watchlist.scan', 'Escanear')}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleRemoveTarget(target.id, target.name)}
                      className="text-red-400"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      {t('watchlist.remove', 'Remover')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${getStatusColor(target.status)}`}>
                  {t(`status.${target.status}`, target.status)}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatLastScan(target.lastScan)}</span>
                </div>
              </div>
              
              {target.ports && target.ports.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <div className="flex flex-wrap gap-1">
                    {target.ports.slice(0, 4).map((port) => (
                      <Badge 
                        key={port} 
                        variant="outline" 
                        className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/30"
                      >
                        {port}
                      </Badge>
                    ))}
                    {target.ports.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{target.ports.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {targets.length > 3 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/watchlist')}
          >
            {t('watchlist.viewAll', 'Ver todos os alvos')} ({targets.length})
          </Button>
        )}
      </CardContent>
    </Card>
  )
}