import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface NewsItem {
  id: string
  title: string
  summary: string
  category: 'vulnerability' | 'breach' | 'tool' | 'technique'
  severity: 'low' | 'medium' | 'high' | 'critical'
  publishedAt: Date
  source: string
  url?: string
}

export function NewsCard() {
  const { t } = useTranslation()

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Nova vulnerabilidade crítica descoberta no Apache',
      summary: 'CVE-2024-1234 permite execução remota de código em servidores Apache...',
      category: 'vulnerability',
      severity: 'critical',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      source: 'Security Week'
    },
    {
      id: '2',
      title: 'Novo framework de phishing usando AI',
      summary: 'Pesquisadores descobrem técnica avançada que usa IA para criar emails...',
      category: 'technique',
      severity: 'high',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      source: 'Threat Intel'
    },
    {
      id: '3',
      title: 'Atualização do Metasploit Framework',
      summary: 'Nova versão inclui exploits para vulnerabilidades recentes...',
      category: 'tool',
      severity: 'medium',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      source: 'Rapid7'
    }
  ]

  const getCategoryColor = (category: NewsItem['category']) => {
    const colors = {
      vulnerability: 'bg-red-500/20 text-red-400 border-red-500/30',
      breach: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      tool: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      technique: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[category]
  }

  const getSeverityColor = (severity: NewsItem['severity']) => {
    const colors = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      critical: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[severity]
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Agora mesmo'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    return `${Math.floor(diffInHours / 24)}d atrás`
  }

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border-glass-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {t('dashboard.news', 'Últimas Notícias')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {newsItems.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex gap-2">
                <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                  {t(`news.category.${item.category}`, item.category)}
                </Badge>
                <Badge className={`text-xs ${getSeverityColor(item.severity)}`}>
                  {t(`news.severity.${item.severity}`, item.severity)}
                </Badge>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h3 className="font-medium text-sm text-white mb-1 line-clamp-2">
              {item.title}
            </h3>
            
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {item.summary}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.source}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(item.publishedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}