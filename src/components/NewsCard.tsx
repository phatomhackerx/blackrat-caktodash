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


  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Agora mesmo'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    return `${Math.floor(diffInHours / 24)}d atrás`
  }

  return (
    <Card className="bg-card border-border hover:border-border/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium tracking-tight">
          {t('dashboard.news', 'Últimas Notícias')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {newsItems.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-md bg-accent/30 border border-border hover:bg-accent/50 hover:border-border/60 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex gap-1.5">
                <Badge variant="outline" className="text-xs font-light">
                  {t(`news.category.${item.category}`, item.category)}
                </Badge>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h3 className="font-medium text-sm text-foreground mb-1.5 line-clamp-2 leading-snug">
              {item.title}
            </h3>
            
            <p className="text-xs text-muted-foreground font-light mb-2.5 line-clamp-2 leading-relaxed">
              {item.summary}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-light">{item.source}</span>
              <div className="flex items-center gap-1 font-mono">
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