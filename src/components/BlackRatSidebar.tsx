import { useState } from "react"
import { 
  Shield, 
  Search, 
  Zap, 
  Mail, 
  Package, 
  Terminal, 
  Activity, 
  Target, 
  Settings, 
  FileText,
  Wifi,
  Eye
} from "lucide-react"
import blackratLogo from "@/assets/blackrat-logo.png"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/", icon: Shield },
  { title: "Scanners", url: "/scanners", icon: Search },
  { title: "Exploits", url: "/exploits", icon: Zap },
  { title: "Phishing", url: "/phishing", icon: Mail },
  { title: "Payloads", url: "/payloads", icon: Package },
  { title: "Terminal", url: "/terminal", icon: Terminal },
  { title: "Monitoring", url: "/monitoring", icon: Activity },
  { title: "Watchlist", url: "/watchlist", icon: Target },
  { title: "Network", url: "/network", icon: Wifi },
  { title: "Logs", url: "/logs", icon: FileText },
  { title: "OSINT", url: "/osint", icon: Eye },
  { title: "Settings", url: "/settings", icon: Settings }
]

export function BlackRatSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavClass = (active: boolean) => 
    active 
      ? "bg-glass-gradient border border-glass-border text-primary font-semibold animate-glow" 
      : "hover:bg-glass-gradient hover:border hover:border-glass-border transition-all duration-300"

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-glass-gradient backdrop-blur-glass border-r border-glass-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* BlackRat OS Logo */}
        <div className="mb-8 text-center">
          {!collapsed ? (
            <div className="space-y-2">
              <img 
                src={blackratLogo} 
                alt="BlackRat OS" 
                className="h-12 w-12 mx-auto filter invert"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">BlackRat</h1>
                <p className="text-xs text-muted-foreground font-mono">OS v2.0</p>
              </div>
            </div>
          ) : (
            <img 
              src={blackratLogo} 
              alt="BlackRat OS" 
              className="h-8 w-8 mx-auto filter invert"
            />
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? 'hidden' : 'block'} text-muted-foreground font-semibold text-xs tracking-wider uppercase mb-4`}>
            Red Team Tools
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavClass(isActive(item.url))} p-3 rounded-lg flex items-center space-x-3 group`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium text-sm">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-auto pt-6">
            <div className="bg-glass-gradient border border-glass-border rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
                <span className="text-xs text-muted-foreground font-mono">ONLINE</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}