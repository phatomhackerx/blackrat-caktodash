import { useState } from "react"
import { AlertTriangle, ChevronDown, ChevronUp, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function NewsCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  const news = [
    {
      id: "CVE-2024-001",
      title: "Critical RCE in Apache Struts",
      severity: "Critical",
      date: "2h ago",
      description: "Remote code execution vulnerability discovered in Apache Struts framework..."
    },
    {
      id: "CVE-2024-002", 
      title: "Windows SMB Protocol Flaw",
      severity: "High",
      date: "4h ago",
      description: "New SMB vulnerability allows privilege escalation on Windows systems..."
    },
    {
      id: "CVE-2024-003",
      title: "MySQL Authentication Bypass",
      severity: "Medium",
      date: "1d ago",
      description: "Authentication bypass vulnerability found in MySQL 8.0 series..."
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400'
      case 'High': return 'text-orange-400' 
      case 'Medium': return 'text-yellow-400'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border hover:border-primary/20 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-primary flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>CVE Feed</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0 hover:bg-glass"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 animate-fade-in">
          <div className="space-y-3">
            {news.map((item) => (
              <div 
                key={item.id}
                className="p-3 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.id}
                    </span>
                    <span className={`text-xs font-semibold ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {item.description}
                </p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs hover:bg-primary/10 hover:text-primary"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3 border-glass-border hover:border-primary/30 hover:bg-primary/5"
          >
            View All CVEs
          </Button>
        </CardContent>
      )}
    </Card>
  )
}