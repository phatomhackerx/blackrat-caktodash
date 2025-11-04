import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Download, Settings, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface ToolDetailLayoutProps {
  title: string
  description: string
  icon: ReactNode
  category?: string
  difficulty?: "Easy" | "Medium" | "Hard"
  children: ReactNode
  onExecute?: () => void
  onExport?: () => void
  isExecuting?: boolean
  hasResults?: boolean
}

export function ToolDetailLayout({
  title,
  description,
  icon,
  category,
  difficulty,
  children,
  onExecute,
  onExport,
  isExecuting = false,
  hasResults = false
}: ToolDetailLayoutProps) {
  const navigate = useNavigate()

  const getDifficultyColor = (level?: string) => {
    switch (level) {
      case 'Easy': return 'bg-green-900/50 text-green-400 border-green-800'
      case 'Medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'Hard': return 'bg-red-900/50 text-red-400 border-red-800'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Card */}
      <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-foreground/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-foreground/5 rounded-lg">
                    {icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {category && (
                        <Badge variant="outline" className="border-glass-border">
                          {category}
                        </Badge>
                      )}
                      {difficulty && (
                        <Badge className={getDifficultyColor(difficulty)}>
                          {difficulty}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground max-w-2xl">
                  {description}
                </CardDescription>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {hasResults && onExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="border-glass-border hover:border-primary/30"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              )}
              {onExecute && (
                <Button
                  size="sm"
                  onClick={onExecute}
                  disabled={isExecuting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isExecuting ? 'Executando...' : 'Executar'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {children}
    </motion.div>
  )
}

export function ToolSection({ title, children, icon }: { title: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function ResultsPanel({ children, isEmpty = false }: { children?: ReactNode; isEmpty?: boolean }) {
  if (isEmpty) {
    return (
      <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              Nenhum resultado ainda. Execute a ferramenta para ver os resultados.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
      <CardHeader>
        <CardTitle className="text-foreground">Resultados</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
