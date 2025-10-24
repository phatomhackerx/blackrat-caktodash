import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { SystemStatusCard } from "@/components/SystemStatusCard"
import { QuickAccessCard } from "@/components/QuickAccessCard"
import { TerminalCard } from "@/components/TerminalCard"
import { NewsCard } from "@/components/NewsCard"
import { WatchlistCard } from "@/components/WatchlistCard"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { useTranslation } from "react-i18next"
import { useCerberusStore } from "@/store/cerberus-store"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

const Index = () => {
  const { t } = useTranslation()
  const { addLog, config } = useCerberusStore()

  // Add welcome log on mount
  React.useEffect(() => {
    addLog({
      level: 'info',
      source: 'System',
      message: t('dashboard.welcome')
    })
  }, [addLog, t])

  return (
    <div className="min-h-screen bg-background relative">
      <StarfieldBackground />
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CerberusSidebar />
          
          <div className="flex-1 flex flex-col relative z-10">
            <header className="h-16 border-b border-foreground/10 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center space-x-4">
                  <Shield className="h-6 w-6 text-foreground" />
                  <h1 className="text-xl font-semibold text-foreground tracking-tight">{t('dashboard.title')}</h1>
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
                    className="text-4xl font-semibold text-foreground mb-3 tracking-tight"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {t('dashboard.welcome')}
                  </motion.h2>
                  <p className="text-muted-foreground text-base">{t('dashboard.subtitle')}</p>
                  {config.demoMode && (
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
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
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <SystemStatusCard />
                  </motion.div>
                  
                  <motion.div 
                    className="xl:col-span-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <QuickAccessCard />
                  </motion.div>
                  
                  <motion.div 
                    className="xl:col-span-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <NewsCard />
                  </motion.div>
                  
                  <motion.div 
                    className="lg:col-span-2 xl:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <TerminalCard />
                  </motion.div>
                  
                  <motion.div 
                    className="xl:col-span-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
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