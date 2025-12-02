import { useState } from "react"
import { useTranslation } from "react-i18next"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCerberusStore } from "@/store/cerberus-store"
import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher"
import { Settings, User, Shield, Bell, Database, Globe, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ConfirmDialog } from "@/components/ConfirmDialog"

const SettingsPage = () => {
  const { t } = useTranslation()
  const { config, updateConfig, resetSession, addLog } = useCerberusStore()
  const { currentLanguage, switchLanguage, availableLanguages } = useLanguageSwitcher()
  const [demoMode, setDemoMode] = useState(config.demoMode || false)
  const [stealthMode, setStealthMode] = useState(config.stealthMode || false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [autoLock, setAutoLock] = useState(true)
  const [alerts, setAlerts] = useState(true)
  const [scanNotifs, setScanNotifs] = useState(true)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleResetSession = () => {
    resetSession()
    setResetDialogOpen(false)
    toast({
      title: "Sessão Resetada",
      description: "Todos os dados foram limpos e a sessão foi reiniciada"
    })
    addLog({
      level: 'info',
      source: 'Settings',
      message: 'Session reset performed'
    })
  }

  return (
    <div className="min-h-screen bg-background relative">
      <StarfieldBackground />
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CerberusSidebar />
          
          <div className="flex-1 flex flex-col relative z-10">
            <header className="h-16 border-b border-foreground/10 bg-background/80 backdrop-blur-xl flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <Settings className="h-5 w-5" />
                <h1 className="text-xl font-bold">{t('settings.title')}</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* User Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{t('settings.profile')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">{t('settings.username')}</label>
                      <Input defaultValue="root" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">{t('settings.email')}</label>
                      <Input defaultValue="admin@blackrat.os" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>{t('settings.security')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{t('settings.twoFactor')}</p>
                      <p className="text-sm text-muted-foreground">Autenticação adicional para maior segurança</p>
                    </div>
                    <Switch 
                      checked={twoFactor}
                      onCheckedChange={(checked) => {
                        setTwoFactor(checked)
                        toast({
                          title: checked ? "2FA Ativado" : "2FA Desativado",
                          description: checked ? "Autenticação de dois fatores foi habilitada" : "Autenticação de dois fatores foi desabilitada"
                        })
                        addLog({
                          level: 'info',
                          source: 'Settings',
                          message: `Two-factor authentication ${checked ? 'enabled' : 'disabled'}`
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{t('settings.autoLock')}</p>
                      <p className="text-sm text-muted-foreground">Bloqueia automaticamente após inatividade</p>
                    </div>
                    <Switch 
                      checked={autoLock}
                      onCheckedChange={(checked) => {
                        setAutoLock(checked)
                        toast({
                          title: checked ? "Auto-Lock Ativado" : "Auto-Lock Desativado"
                        })
                        addLog({
                          level: 'info',
                          source: 'Settings',
                          message: `Auto-lock ${checked ? 'enabled' : 'disabled'}`
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{t('settings.stealthMode')}</p>
                      <p className="text-sm text-muted-foreground">Oculta atividades do sistema</p>
                    </div>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>{t('settings.notifications')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{t('settings.alertNotifications')}</p>
                      <p className="text-sm text-muted-foreground">Receba alertas de segurança em tempo real</p>
                    </div>
                    <Switch 
                      checked={alerts}
                      onCheckedChange={(checked) => {
                        setAlerts(checked)
                        toast({
                          title: checked ? "Alertas Ativados" : "Alertas Desativados"
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{t('settings.scanNotifications')}</p>
                      <p className="text-sm text-muted-foreground">Notificações ao concluir escaneamentos</p>
                    </div>
                    <Switch 
                      checked={scanNotifs}
                      onCheckedChange={(checked) => {
                        setScanNotifs(checked)
                        toast({
                          title: checked ? "Notificações de Scan Ativadas" : "Notificações de Scan Desativadas"
                        })
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>{t('settings.appearance')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{t('settings.language')}</p>
                      <p className="text-sm text-muted-foreground">Selecione o idioma da interface</p>
                    </div>
                    <Select value={currentLanguage} onValueChange={switchLanguage}>
                      <SelectTrigger className="w-40">
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
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{t('settings.demoMode')}</p>
                      <p className="text-sm text-muted-foreground">Habilita dados de demonstração</p>
                    </div>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>{t('settings.system')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2">
                    <div className="flex-1">
                      <p className="font-medium">{t('settings.resetSession')}</p>
                      <p className="text-sm text-muted-foreground">Limpa todos os dados e reinicia a sessão</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setResetDialogOpen(true)}
                      className="flex items-center space-x-2 border-foreground/20 hover:border-foreground/40 shrink-0"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>{t('settings.reset')}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>

      <ConfirmDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        title="Resetar Sessão"
        description="Tem certeza que deseja resetar a sessão? Todos os dados serão perdidos e não poderão ser recuperados."
        onConfirm={handleResetSession}
        confirmText="Resetar"
        cancelText="Cancelar"
        variant="destructive"
      />
    </div>
  )
}

export default SettingsPage