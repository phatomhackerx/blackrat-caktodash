import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { SystemStatusCard } from "@/components/SystemStatusCard"
import { QuickAccessCard } from "@/components/QuickAccessCard"
import { TerminalCard } from "@/components/TerminalCard"
import { NewsCard } from "@/components/NewsCard"
import { WatchlistCard } from "@/components/WatchlistCard"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useTranslation } from "react-i18next"
import { useBlackRatStore } from "@/store/blackrat-store"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

const Index = () => {
  const { t } = useTranslation()
  const { addLog, config } = useBlackRatStore()

  // Add welcome log on mount
  React.useEffect(() => {
    addLog({
      level: 'info',
      source: 'System',
      message: t('dashboard.welcome')
    })
  }, [addLog, t])

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <BlackRatSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-glass-border bg-glass-gradient backdrop-blur-glass flex items-center justify-between px-6">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center space-x-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-bold text-primary">{t('dashboard.title')}</h1>
                </div>
              </div>
              <LanguageSwitcher />
            </header>

            <main className="flex-1 p-6">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Welcome Message */}
                <div className="text-center mb-8">
                  <motion.h2 
                    className="text-3xl font-bold text-primary mb-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t('dashboard.welcome')}
                  </motion.h2>
                  <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
                  {config.demoMode && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                      Demo Mode Active
                    </div>
                  )}
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <motion.div 
                    className="xl:col-span-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <SystemStatusCard />
                  </motion.div>
                  
                  <motion.div 
                    className="xl:col-span-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <QuickAccessCard />
                  </motion.div>
                  
                  <motion.div 
                    className="xl:col-span-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <NewsCard />
                  </motion.div>
                  
                  <motion.div 
                    className="lg:col-span-2 xl:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <TerminalCard />
                  </motion.div>
                  
                  <motion.div 
                    className="xl:col-span-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <WatchlistCard />
                  </motion.div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;