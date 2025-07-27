import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Search, Globe, MapPin, Phone, Mail, Building, User, Camera, Calendar } from "lucide-react"

const OSINT = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSearch, setActiveSearch] = useState("")

  const osintTools = [
    { name: "Shodan", type: "Network Intelligence", status: "active" },
    { name: "TheHarvester", type: "Email Harvesting", status: "ready" },
    { name: "Maltego", type: "Link Analysis", status: "active" },
    { name: "Recon-ng", type: "Reconnaissance", status: "ready" },
    { name: "SpiderFoot", type: "Automated OSINT", status: "active" },
    { name: "Social Mapper", type: "Social Media", status: "ready" }
  ]

  const recentFindings = [
    {
      id: "OSINT-001",
      target: "acme-corp.com",
      type: "Domain Intelligence",
      finding: "Found 15 subdomains",
      risk: "Medium",
      source: "Shodan",
      timestamp: "2m ago"
    },
    {
      id: "OSINT-002",
      target: "john.doe@target.com",
      type: "Email Intelligence", 
      finding: "Linked to 3 social profiles",
      risk: "High",
      source: "TheHarvester",
      timestamp: "8m ago"
    },
    {
      id: "OSINT-003",
      target: "192.168.1.0/24",
      type: "Network Scan",
      finding: "12 exposed services found",
      risk: "Critical",
      source: "Shodan",
      timestamp: "15m ago"
    }
  ]

  const socialMediaResults = [
    {
      platform: "LinkedIn",
      profile: "John Doe - Senior Developer",
      company: "ACME Corp",
      location: "San Francisco, CA",
      connections: "500+",
      verified: true
    },
    {
      platform: "Twitter",
      profile: "@johndoe_dev",
      followers: "1.2K",
      posts: "342",
      verified: false,
      lastActivity: "2 days ago"
    },
    {
      platform: "GitHub",
      profile: "johndoe-dev",
      repos: "23",
      stars: "156",
      verified: true,
      activity: "Very Active"
    }
  ]

  const domainIntelligence = [
    { subdomain: "mail.target.com", ip: "192.168.1.10", services: ["SMTP", "IMAP"], status: "Active" },
    { subdomain: "ftp.target.com", ip: "192.168.1.11", services: ["FTP"], status: "Active" },
    { subdomain: "dev.target.com", ip: "192.168.1.12", services: ["HTTP", "HTTPS"], status: "Active" },
    { subdomain: "staging.target.com", ip: "192.168.1.13", services: ["HTTP"], status: "Active" },
    { subdomain: "api.target.com", ip: "192.168.1.14", services: ["HTTPS", "API"], status: "Active" }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-900/50 text-red-400 border-red-800'
      case 'High': return 'bg-orange-900/50 text-orange-400 border-orange-800'
      case 'Medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
      case 'Low': return 'bg-green-900/50 text-green-400 border-green-800'
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-900/50 text-green-400 border-green-800'
      case 'ready': return 'bg-blue-900/50 text-blue-400 border-blue-800'
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <BlackRatSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-glass-border bg-glass-gradient backdrop-blur-glass flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <Eye className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">OSINT Intelligence</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
              {/* Search Interface */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardContent className="pt-6">
                  <div className="flex space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter target (domain, email, IP, person name)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-terminal-bg border-glass-border text-primary"
                      />
                    </div>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => setActiveSearch(searchTerm)}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* OSINT Tools Status */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Active OSINT Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {osintTools.map((tool) => (
                      <div key={tool.name} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{tool.name}</h3>
                          <Badge className={getStatusColor(tool.status)}>
                            {tool.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* OSINT Results Tabs */}
              <Card className="bg-glass-gradient backdrop-blur-glass border border-glass-border">
                <CardHeader>
                  <CardTitle className="text-primary">Intelligence Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recent" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 bg-glass-gradient">
                      <TabsTrigger value="recent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Recent</TabsTrigger>
                      <TabsTrigger value="domain" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Domain Intel</TabsTrigger>
                      <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Social Media</TabsTrigger>
                      <TabsTrigger value="network" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Network</TabsTrigger>
                    </TabsList>

                    <TabsContent value="recent" className="space-y-4">
                      {recentFindings.map((finding) => (
                        <div key={finding.id} className="p-4 bg-glass-gradient border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-mono text-muted-foreground">{finding.id}</span>
                              <Badge className={getRiskColor(finding.risk)}>
                                {finding.risk}
                              </Badge>
                              <span className="text-sm text-primary font-semibold">{finding.source}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{finding.timestamp}</span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-foreground mb-1">{finding.target}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{finding.type}</p>
                          <p className="text-foreground">{finding.finding}</p>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="domain" className="space-y-4">
                      <div className="space-y-3">
                        {domainIntelligence.map((domain, index) => (
                          <div key={index} className="p-4 bg-glass-gradient border border-glass-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <Globe className="h-4 w-4 text-primary" />
                                <span className="font-mono text-foreground">{domain.subdomain}</span>
                                <Badge className="bg-blue-900/50 text-blue-400 border-blue-800">
                                  {domain.status}
                                </Badge>
                              </div>
                              <span className="text-sm font-mono text-muted-foreground">{domain.ip}</span>
                            </div>
                            <div className="flex space-x-2">
                              {domain.services.map((service) => (
                                <Badge key={service} variant="outline" className="border-glass-border text-muted-foreground">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-4">
                      <div className="space-y-3">
                        {socialMediaResults.map((profile, index) => (
                          <div key={index} className="p-4 bg-glass-gradient border border-glass-border rounded-lg">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-primary" />
                                <div>
                                  <h3 className="font-semibold text-foreground">{profile.platform}</h3>
                                  <p className="text-sm text-muted-foreground">{profile.profile}</p>
                                </div>
                              </div>
                              {profile.verified && (
                                <Badge className="bg-green-900/50 text-green-400 border-green-800">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {profile.company && (
                                <div className="flex items-center space-x-2">
                                  <Building className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-foreground">{profile.company}</span>
                                </div>
                              )}
                              {profile.location && (
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-foreground">{profile.location}</span>
                                </div>
                              )}
                              {profile.followers && (
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-foreground">{profile.followers} followers</span>
                                </div>
                              )}
                              {profile.lastActivity && (
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-foreground">{profile.lastActivity}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="network" className="space-y-4">
                      <div className="text-center py-8">
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Network intelligence will appear here when scans are initiated</p>
                        <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                          Start Network Scan
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default OSINT