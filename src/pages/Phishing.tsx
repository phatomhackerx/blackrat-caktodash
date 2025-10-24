import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CerberusSidebar } from "@/components/CerberusSidebar"
import { StarfieldBackground } from "@/components/StarfieldBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCerberusStore } from "@/store/cerberus-store"
import { Mail, Users, Target, Eye, Globe, Send, Play, Download } from "lucide-react"

const Phishing = () => {
  const { t } = useTranslation()
  const { addLog } = useCerberusStore()
  const [campaignName, setCampaignName] = useState("")

  const createCampaign = () => {
    if (!campaignName.trim()) return
    addLog({
      level: 'info',
      source: 'Phishing',
      message: `New campaign created: ${campaignName}`
    })
    setCampaignName("")
  }

  const templates = [
    {
      name: "Office 365 Login",
      category: "Credential Harvesting", 
      success_rate: "85%",
      targets: "Business Users",
      description: "Fake Office 365 login page"
    },
    {
      name: "Windows Update",
      category: "Malware Delivery",
      success_rate: "72%", 
      targets: "General Users",
      description: "Fake Windows security update notification"
    },
    {
      name: "Banking Alert",
      category: "Credential Harvesting",
      success_rate: "78%",
      targets: "Banking Customers", 
      description: "Suspicious activity notification"
    },
    {
      name: "IT Support",
      category: "Social Engineering",
      success_rate: "91%",
      targets: "Employees",
      description: "Internal IT support request"
    }
  ]

  const activeCampaigns = [
    {
      name: "Q4 Security Training",
      template: "Office 365 Login",
      targets: 250,
      opened: 187,
      clicked: 89,
      submitted: 34,
      status: "active"
    },
    {
      name: "Executive Awareness", 
      template: "Banking Alert",
      targets: 15,
      opened: 14,
      clicked: 8,
      submitted: 3,
      status: "completed"
    }
  ]

  const recentLogs = [
    { email: "user@company.com", action: "Email opened", campaign: "Q4 Security Training", time: "2m ago" },
    { email: "admin@company.com", action: "Link clicked", campaign: "Q4 Security Training", time: "5m ago" },
    { email: "exec@company.com", action: "Credentials submitted", campaign: "Executive Awareness", time: "1h ago" }
  ]

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-900/50 text-green-400 border-green-800' : 'bg-gray-900/50 text-gray-400 border-gray-800'
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative"
    >
      <StarfieldBackground />
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CerberusSidebar />
          
          <div className="flex-1 flex flex-col relative z-10">
            <header className="h-16 border-b border-foreground/10 bg-background/80 backdrop-blur-xl flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">{t('sidebar.phishing')}</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* New Campaign */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Create New Campaign</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Campaign name..."
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="bg-terminal-bg border-glass-border text-primary"
                    />
                    <Button 
                      onClick={createCampaign}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Create Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Templates */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Email Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <div key={template.name} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-foreground">{template.name}</h3>
                          <Badge className="bg-blue-900/50 text-blue-400 border-blue-800">
                            {template.success_rate}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Category:</span>
                            <span className="text-foreground">{template.category}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Target:</span>
                            <span className="text-foreground">{template.targets}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 border-glass-border hover:border-primary/30">
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                            Use Template
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Campaigns */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Active Campaigns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCampaigns.map((campaign, index) => (
                      <div key={index} className="p-4 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">{campaign.template}</p>
                          </div>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{campaign.targets}</p>
                            <p className="text-sm text-muted-foreground">Targets</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-400">{campaign.opened}</p>
                            <p className="text-sm text-muted-foreground">Opened</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-400">{campaign.clicked}</p>
                            <p className="text-sm text-muted-foreground">Clicked</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-400">{campaign.submitted}</p>
                            <p className="text-sm text-muted-foreground">Submitted</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                            <Eye className="h-3 w-3 mr-1" />
                            View Results
                          </Button>
                          <Button variant="outline" size="sm" className="border-glass-border hover:border-primary/30">
                            <Users className="h-3 w-3 mr-1" />
                            Manage Targets
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentLogs.map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-glass-gradient border border-glass-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
                          <div>
                            <p className="font-semibold text-foreground">{log.action}</p>
                            <p className="text-sm text-muted-foreground">{log.email} • {log.campaign}</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{log.time}</span>
                      </div>
                    ))}
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

export default Phishing