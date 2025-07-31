import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBlackRatStore } from "@/store/blackrat-store"
import { Search, Globe, Mail, Users, Eye, Download, ExternalLink, Clock } from "lucide-react"

const OSINT = () => {
  const { t } = useTranslation()
  const { addLog } = useBlackRatStore()
  const [target, setTarget] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>({})

  const osintTools = [
    {
      id: 'domain',
      name: t('osint.domainAnalysis'),
      icon: Globe,
      description: 'Analyze domain information, DNS records, and infrastructure',
      color: 'text-blue-400'
    },
    {
      id: 'email',
      name: t('osint.emailHarvesting'),
      icon: Mail,
      description: 'Harvest email addresses from various sources',
      color: 'text-green-400'
    },
    {
      id: 'social',
      name: t('osint.socialMedia'),
      icon: Users,
      description: 'Search for social media profiles and information',
      color: 'text-purple-400'
    },
    {
      id: 'darkweb',
      name: t('osint.darkWeb'),
      icon: Eye,
      description: 'Search for leaked data and dark web mentions',
      color: 'text-red-400'
    }
  ]

  const mockDomainResults = {
    whois: {
      domain: target,
      registrar: "GoDaddy LLC",
      creation_date: "2020-01-15",
      expiration_date: "2025-01-15",
      owner: "John Doe",
      email: "admin@example.com"
    },
    dns: [
      { type: "A", value: "192.168.1.1" },
      { type: "MX", value: "mail.example.com" },
      { type: "NS", value: "ns1.example.com" },
      { type: "TXT", value: "v=spf1 include:_spf.google.com ~all" }
    ],
    subdomains: ["www", "mail", "ftp", "admin", "api", "staging"],
    technologies: ["Apache", "PHP", "MySQL", "WordPress"],
    certificates: [
      { issuer: "Let's Encrypt", valid_from: "2024-01-01", valid_to: "2024-04-01" }
    ]
  }

  const mockEmailResults = {
    emails: [
      "admin@example.com",
      "contact@example.com", 
      "support@example.com",
      "info@example.com",
      "john.doe@example.com"
    ],
    sources: ["Website", "LinkedIn", "GitHub", "Social Media"],
    breaches: [
      { source: "DataBreach2023", date: "2023-06-15", type: "Email/Password" },
      { source: "MegaCorp Leak", date: "2022-03-20", type: "Personal Info" }
    ]
  }

  const mockSocialResults = {
    profiles: [
      { platform: "LinkedIn", username: "johndoe", url: "linkedin.com/in/johndoe", followers: 1250 },
      { platform: "Twitter", username: "@johndoe", url: "twitter.com/johndoe", followers: 850 },
      { platform: "GitHub", username: "johndoe", url: "github.com/johndoe", repos: 45 },
      { platform: "Facebook", username: "john.doe.123", url: "facebook.com/john.doe.123", friends: 342 }
    ],
    mentions: [
      { platform: "Reddit", content: "Post about cybersecurity", date: "2024-01-10" },
      { platform: "Medium", content: "Article about penetration testing", date: "2023-12-15" }
    ]
  }

  const mockDarkWebResults = {
    mentions: [
      { source: "DarkForum1", type: "Email mention", date: "2023-11-20", risk: "Medium" },
      { source: "DataMarket", type: "Possible data sale", date: "2023-10-05", risk: "High" }
    ],
    breaches: [
      { name: "Corporate Breach 2023", date: "2023-08-12", records: 15000, type: "Email/Password" },
      { name: "Legacy DB Dump", date: "2022-05-30", records: 8500, type: "Personal Info" }
    ]
  }

  const runOSINTAnalysis = async (toolId: string) => {
    if (!target.trim()) return

    setIsAnalyzing(true)
    addLog({
      level: 'info',
      source: 'OSINT',
      message: `Starting ${toolId} analysis for: ${target}`
    })

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

    let newResults = { ...results }
    
    switch (toolId) {
      case 'domain':
        newResults.domain = mockDomainResults
        break
      case 'email':
        newResults.email = mockEmailResults
        break
      case 'social':
        newResults.social = mockSocialResults
        break
      case 'darkweb':
        newResults.darkweb = mockDarkWebResults
        break
    }

    setResults(newResults)
    setIsAnalyzing(false)

    addLog({
      level: 'success',
      source: 'OSINT',
      message: `${toolId} analysis completed for: ${target}`
    })
  }

  const runAllAnalysis = async () => {
    if (!target.trim()) return

    setIsAnalyzing(true)
    addLog({
      level: 'info',
      source: 'OSINT',
      message: `Starting comprehensive OSINT analysis for: ${target}`
    })

    // Simulate comprehensive analysis
    await new Promise(resolve => setTimeout(resolve, 5000 + Math.random() * 5000))

    setResults({
      domain: mockDomainResults,
      email: mockEmailResults,
      social: mockSocialResults,
      darkweb: mockDarkWebResults
    })

    setIsAnalyzing(false)

    addLog({
      level: 'success',
      source: 'OSINT',
      message: `Comprehensive OSINT analysis completed for: ${target}`
    })
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `osint_results_${target}_${Date.now()}.json`
    link.click()

    addLog({
      level: 'info',
      source: 'OSINT',
      message: `Results exported for target: ${target}`
    })
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
                <Search className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">{t('osint.title')}</h1>
                <Badge className="bg-purple-900/50 text-purple-400 border-purple-800">
                  Intelligence Gathering
                </Badge>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Target Input */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>{t('osint.target')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Input
                      placeholder={t('osint.search')}
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="bg-terminal-bg border-glass-border text-primary"
                    />
                    <Button 
                      onClick={runAllAnalysis}
                      disabled={isAnalyzing || !target.trim()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isAnalyzing ? t('osint.gathering') : t('osint.analyze')}
                    </Button>
                    {Object.keys(results).length > 0 && (
                      <Button variant="outline" onClick={exportResults}>
                        <Download className="h-4 w-4 mr-2" />
                        {t('common.export')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* OSINT Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {osintTools.map((tool) => (
                  <Card key={tool.id} className="bg-glass-gradient backdrop-blur-glass border border-glass-border hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                        <h3 className="font-semibold text-foreground">{tool.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-glass-border hover:border-primary/30"
                        onClick={() => runOSINTAnalysis(tool.id)}
                        disabled={isAnalyzing || !target.trim()}
                      >
                        {t('common.start')}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Results */}
              {Object.keys(results).length > 0 && (
                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>{t('osint.results')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="domain" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="domain">Domain</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="social">Social</TabsTrigger>
                        <TabsTrigger value="darkweb">Dark Web</TabsTrigger>
                      </TabsList>

                      <TabsContent value="domain" className="space-y-4">
                        {results.domain && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                                <h4 className="font-semibold text-white mb-2">WHOIS Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p><span className="text-muted-foreground">Domain:</span> {results.domain.whois.domain}</p>
                                  <p><span className="text-muted-foreground">Registrar:</span> {results.domain.whois.registrar}</p>
                                  <p><span className="text-muted-foreground">Created:</span> {results.domain.whois.creation_date}</p>
                                  <p><span className="text-muted-foreground">Expires:</span> {results.domain.whois.expiration_date}</p>
                                </div>
                              </div>
                              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                                <h4 className="font-semibold text-white mb-2">DNS Records</h4>
                                <div className="space-y-1 text-sm">
                                  {results.domain.dns.map((record: any, index: number) => (
                                    <p key={index}>
                                      <Badge variant="outline" className="mr-2">{record.type}</Badge>
                                      {record.value}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                              <h4 className="font-semibold text-white mb-2">Subdomains</h4>
                              <div className="flex flex-wrap gap-2">
                                {results.domain.subdomains.map((subdomain: string, index: number) => (
                                  <Badge key={index} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    {subdomain}.{target}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="email" className="space-y-4">
                        {results.email && (
                          <div className="space-y-4">
                            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                              <h4 className="font-semibold text-white mb-2">Found Emails</h4>
                              <div className="space-y-2">
                                {results.email.emails.map((email: string, index: number) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <span className="font-mono text-sm">{email}</span>
                                    <Button variant="ghost" size="sm">
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                              <h4 className="font-semibold text-white mb-2">Data Breaches</h4>
                              <div className="space-y-2">
                                {results.email.breaches.map((breach: any, index: number) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/30">
                                    <div>
                                      <p className="font-semibold text-red-400">{breach.source}</p>
                                      <p className="text-sm text-muted-foreground">{breach.type}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{breach.date}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="social" className="space-y-4">
                        {results.social && (
                          <div className="space-y-4">
                            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                              <h4 className="font-semibold text-white mb-2">Social Media Profiles</h4>
                              <div className="space-y-3">
                                {results.social.profiles.map((profile: any, index: number) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-purple-500/10 rounded border border-purple-500/30">
                                    <div>
                                      <p className="font-semibold text-purple-400">{profile.platform}</p>
                                      <p className="text-sm font-mono">{profile.username}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {profile.followers || profile.friends || profile.repos} 
                                        {profile.followers ? ' followers' : profile.friends ? ' friends' : ' repos'}
                                      </p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="darkweb" className="space-y-4">
                        {results.darkweb && (
                          <div className="space-y-4">
                            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                              <h4 className="font-semibold text-white mb-2">Dark Web Mentions</h4>
                              <div className="space-y-2">
                                {results.darkweb.mentions.map((mention: any, index: number) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/30">
                                    <div>
                                      <p className="font-semibold text-red-400">{mention.source}</p>
                                      <p className="text-sm text-muted-foreground">{mention.type}</p>
                                    </div>
                                    <div className="text-right">
                                      <Badge className={`${mention.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {mention.risk}
                                      </Badge>
                                      <p className="text-xs text-muted-foreground mt-1">{mention.date}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                              <h4 className="font-semibold text-white mb-2">Data Breaches</h4>
                              <div className="space-y-2">
                                {results.darkweb.breaches.map((breach: any, index: number) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/30">
                                    <div>
                                      <p className="font-semibold text-red-400">{breach.name}</p>
                                      <p className="text-sm text-muted-foreground">{breach.records.toLocaleString()} records</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{breach.date}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {isAnalyzing && (
                <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="text-primary">{t('osint.gathering')}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </motion.div>
  )
}

export default OSINT