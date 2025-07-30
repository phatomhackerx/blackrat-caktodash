import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBlackRatStore } from "@/store/blackrat-store"
import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher"
import { Settings, User, Shield, Bell, Database, Globe, Monitor, Lock, RotateCcw } from "lucide-react"

const SettingsPage = () => {
  const { t } = useTranslation()
  const { config, updateConfig, resetSession } = useBlackRatStore()
  const { currentLanguage, switchLanguage, availableLanguages } = useLanguageSwitcher()
  const [demoMode, setDemoMode] = useState(config.demoMode || false)
  const [stealthMode, setStealthMode] = useState(config.stealthMode || false)

  const handleResetSession = () => {
    resetSession()
    // Show confirmation toast would go here
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <BlackRatSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-glass-border bg-glass-gradient backdrop-blur-glass flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <Settings className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">{t('settings.title')}</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* User Settings */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>User Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">{t('settings.userProfile')}</label>
                      <Input defaultValue="root" className="bg-terminal-bg border-glass-border" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <Input defaultValue="admin@blackrat.os" className="bg-terminal-bg border-glass-border" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Two-Factor Authentication</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Auto-lock Terminal</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{t('settings.stealthMode')}</span>
                    <Switch 
                      checked={stealthMode}
                      onCheckedChange={(checked) => {
                        setStealthMode(checked)
                        updateConfig({ stealthMode: checked })
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Alert Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Scan Completion</span>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Appearance */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>{t('settings.appearance')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{t('common.language')}</span>
                    <Select value={currentLanguage} onValueChange={switchLanguage}>
                      <SelectTrigger className="w-32 bg-terminal-bg border-glass-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLanguages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{t('settings.demoMode')}</span>
                    <Switch 
                      checked={demoMode}
                      onCheckedChange={(checked) => {
                        setDemoMode(checked)
                        updateConfig({ demoMode: checked })
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* System Actions */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>System Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">{t('settings.resetSession')}</p>
                      <p className="text-sm text-muted-foreground">Clear all data and restart session</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={handleResetSession}
                      className="flex items-center space-x-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>{t('common.reset')}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </motion.div>
  )
}

export default SettingsPage