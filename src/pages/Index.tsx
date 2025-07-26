import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BlackRatSidebar } from "@/components/BlackRatSidebar"
import { SystemStatusCard } from "@/components/SystemStatusCard"
import { QuickAccessCard } from "@/components/QuickAccessCard"
import { TerminalCard } from "@/components/TerminalCard"
import { NewsCard } from "@/components/NewsCard"
import { WatchlistCard } from "@/components/WatchlistCard"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <BlackRatSidebar />
          
          <div className="flex-1 flex flex-col">
            {/* Top Header */}
            <header className="h-16 border-b border-glass-border bg-glass-gradient backdrop-blur-glass flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-primary">BlackRat OS Dashboard</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
                  <span>Red Team Active</span>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 space-y-6">
              {/* Top Row - System Status & Quick Access */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SystemStatusCard />
                <QuickAccessCard />
              </div>

              {/* Middle Row - Terminal */}
              <div className="grid grid-cols-1 gap-6">
                <TerminalCard />
              </div>

              {/* Bottom Row - News & Watchlist */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NewsCard />
                <WatchlistCard />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
