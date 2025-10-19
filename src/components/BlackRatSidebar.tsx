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
import { useTranslation } from "react-i18next"
import { useBlackRatStore } from "@/store/blackrat-store"
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

export function BlackRatSidebar() {
  const { t } = useTranslation()
  const { systemMetrics } = useBlackRatStore()
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const menuItems = [
    { title: t("sidebar.dashboard"), url: "/", icon: Shield },
    { title: t("sidebar.scanners"), url: "/scanners", icon: Search },
    { title: t("sidebar.exploits"), url: "/exploits", icon: Zap },
    { title: t("sidebar.phishing"), url: "/phishing", icon: Mail },
    { title: t("sidebar.payloads"), url: "/payloads", icon: Package },
    { title: t("sidebar.terminal"), url: "/terminal", icon: Terminal },
    { title: t("sidebar.monitoring"), url: "/monitoring", icon: Activity },
    { title: t("sidebar.watchlist"), url: "/watchlist", icon: Target },
    { title: t("sidebar.network"), url: "/network", icon: Wifi },
    { title: t("sidebar.logs"), url: "/logs", icon: FileText },
    { title: t("sidebar.osint"), url: "/osint", icon: Eye },
    { title: t("sidebar.settings"), url: "/settings", icon: Settings }
  ]

  const isActive = (path: string) => currentPath === path
  const getNavClass = (active: boolean) => 
    active 
      ? "bg-accent border border-border text-foreground font-medium" 
      : "hover:bg-accent/50 hover:border hover:border-border/50 transition-all duration-200"

  const getStatusColor = () => {
    if (systemMetrics.vpnStatus && systemMetrics.cpu < 80) return "bg-foreground"
    if (systemMetrics.cpu > 90) return "bg-muted-foreground"
    return "bg-muted-foreground/70"
  }

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-background border-r border-border transition-all duration-200`}
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
            {t("sidebar.title", "Red Team Tools")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <NavLink 
                       to={item.url} 
                       end 
                       className={`${getNavClass(isActive(item.url))} p-2.5 rounded-md flex items-center space-x-3 group relative`}
                     >
                       <div className="relative">
                         <item.icon className="h-5 w-5 flex-shrink-0" />
                         {item.url === "/monitoring" && (
                           <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor()}`} />
                         )}
                       </div>
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
            <div className="bg-card border border-border rounded-md p-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full animate-pulse-subtle ${getStatusColor()}`}></div>
                <span className="text-xs text-muted-foreground font-mono">
                  {systemMetrics.vpnStatus ? t("common.connected") : t("common.disconnected")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                CPU: {systemMetrics.cpu}% | VPN: {systemMetrics.vpnStatus ? "ON" : "OFF"}
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}