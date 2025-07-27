import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Scanners from "./pages/Scanners";
import Exploits from "./pages/Exploits";
import Phishing from "./pages/Phishing";
import Payloads from "./pages/Payloads";
import TerminalPage from "./pages/TerminalPage";
import Monitoring from "./pages/Monitoring";
import Watchlist from "./pages/Watchlist";
import Network from "./pages/Network";
import Logs from "./pages/Logs";
import OSINT from "./pages/OSINT";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scanners" element={<Scanners />} />
          <Route path="/exploits" element={<Exploits />} />
          <Route path="/phishing" element={<Phishing />} />
          <Route path="/payloads" element={<Payloads />} />
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/network" element={<Network />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/osint" element={<OSINT />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
