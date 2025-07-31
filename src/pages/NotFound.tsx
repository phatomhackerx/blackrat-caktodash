import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Home, ArrowLeft, Terminal, Search } from "lucide-react"

const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const quickLinks = [
    { name: t('nav.dashboard'), path: '/', icon: Home },
    { name: t('nav.scanners'), path: '/scanners', icon: Search },
    { name: t('nav.terminal'), path: '/terminal', icon: Terminal },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-4"
            >
              <div className="text-6xl font-bold text-primary mb-2">404</div>
              <div className="text-red-400 text-2xl font-mono mb-2">[ERROR]</div>
            </motion.div>
            <CardTitle className="text-xl text-primary">
              Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                The requested page could not be found in the BlackRat OS system.
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                ERR_PAGE_NOT_FOUND: Invalid route detected
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate(-1)} 
                variant="outline"
                className="w-full border-glass-border hover:border-primary/30"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              
              <Button 
                onClick={() => navigate('/')} 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Home className="h-4 w-4 mr-2" />
                Return to Dashboard
              </Button>
            </div>

            <div className="pt-4 border-t border-glass-border">
              <p className="text-sm text-muted-foreground mb-3">Quick Access:</p>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Button
                    key={link.path}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(link.path)}
                    className="w-full justify-start text-left hover:bg-primary/10"
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              BlackRat OS v1.0 | Navigation System
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default NotFound
