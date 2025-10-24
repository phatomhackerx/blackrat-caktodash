import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Target {
  id: string;
  name: string;
  ip: string;
  description: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scanning' | 'vulnerable' | 'secure' | 'unknown';
  lastScan?: Date;
  ports?: number[];
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  source: string;
  message: string;
  details?: any;
}

export interface SystemMetrics {
  cpu: number;
  ram: { used: number; total: number };
  network: string;
  vpnStatus: boolean;
  activeShells: number;
  openPorts: number[];
  cpuUsage: number;
  memoryUsage: number;
  networkSpeed: number;
  activeConnections: number;
  lastUpdate: Date;
}

export interface CerberusConfig {
  language: 'pt-BR' | 'en-US';
  theme: 'dark' | 'light';
  demoMode: boolean;
  stealthMode: boolean;
  proxy: {
    enabled: boolean;
    host: string;
    port: number;
  };
  tools: {
    nmap: boolean;
    metasploit: boolean;
    wireshark: boolean;
    burpsuite: boolean;
    sqlmap: boolean;
    johnripper: boolean;
  };
}

interface CerberusState {
  // Configuration
  config: CerberusConfig;
  updateConfig: (config: Partial<CerberusConfig>) => void;
  
  // Session
  sessionId: string;
  currentTarget: Target | null;
  setCurrentTarget: (target: Target | null) => void;
  
  // Targets
  targets: Target[];
  addTarget: (target: Omit<Target, 'id'>) => void;
  updateTarget: (id: string, target: Partial<Target>) => void;
  removeTarget: (id: string) => void;
  
  // Logs
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  
  // System Metrics
  systemMetrics: SystemMetrics;
  updateSystemMetrics: (metrics: Partial<SystemMetrics>) => void;
  
  // Terminal Sessions
  terminalSessions: Array<{
    id: number;
    name: string;
    active: boolean;
    output: string[];
  }>;
  updateTerminalSessions: (sessions: any[]) => void;
  
  // Actions
  resetSession: () => void;
}

const defaultConfig: CerberusConfig = {
  language: 'pt-BR',
  theme: 'dark',
  demoMode: true,
  stealthMode: false,
  proxy: {
    enabled: false,
    host: '',
    port: 8080
  },
  tools: {
    nmap: true,
    metasploit: true,
    wireshark: true,
    burpsuite: true,
    sqlmap: true,
    johnripper: true
  }
};

const defaultSystemMetrics: SystemMetrics = {
  cpu: 23,
  ram: { used: 4.2, total: 16 },
  network: '192.168.1.100',
  vpnStatus: true,
  activeShells: 3,
  openPorts: [22, 80, 443, 8080],
  cpuUsage: 23,
  memoryUsage: 26.25,
  networkSpeed: 125.3,
  activeConnections: 15,
  lastUpdate: new Date()
};

export const useCerberusStore = create<CerberusState>()(
  persist(
    (set, get) => ({
      // Configuration
      config: defaultConfig,
      updateConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig }
        })),
      
      // Session
      sessionId: `session_${Date.now()}`,
      currentTarget: null,
      setCurrentTarget: (target) => set({ currentTarget: target }),
      
      // Targets
      targets: [
        {
          id: '1',
          name: 'Servidor Web Produção',
          ip: '192.168.1.50',
          description: 'Servidor web principal da empresa',
          tags: ['web', 'producao', 'critico'],
          priority: 'critical',
          status: 'scanning',
          lastScan: new Date(),
          ports: [22, 80, 443]
        },
        {
          id: '2',
          name: 'Servidor Banco de Dados',
          ip: '10.0.0.100',
          description: 'Servidor de banco de dados MySQL',
          tags: ['database', 'mysql'],
          priority: 'high',
          status: 'vulnerable',
          lastScan: new Date(Date.now() - 3600000),
          ports: [3306, 22]
        }
      ],
      addTarget: (target) =>
        set((state) => ({
          targets: [...state.targets, { ...target, id: `target_${Date.now()}` }]
        })),
      updateTarget: (id, updatedTarget) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === id ? { ...target, ...updatedTarget } : target
          )
        })),
      removeTarget: (id) =>
        set((state) => ({
          targets: state.targets.filter((target) => target.id !== id)
        })),
      
      // Logs
      logs: [
        {
          id: '1',
          timestamp: new Date(),
          level: 'info',
          source: 'Sistema',
          message: 'Cerberus iniciado com sucesso'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 300000),
          level: 'success',
          source: 'Scanner',
          message: 'Escaneamento de 192.168.1.50 concluído'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 600000),
          level: 'warning',
          source: 'VPN',
          message: 'Conexão VPN instável detectada'
        }
      ],
      addLog: (log) =>
        set((state) => ({
          logs: [
            {
              ...log,
              id: `log_${Date.now()}`,
              timestamp: new Date()
            },
            ...state.logs
          ]
        })),
      clearLogs: () => set({ logs: [] }),
      
      // System Metrics
      systemMetrics: defaultSystemMetrics,
      updateSystemMetrics: (metrics) =>
        set((state) => ({
          systemMetrics: { ...state.systemMetrics, ...metrics }
        })),
      
      // Terminal Sessions
      terminalSessions: [
        { id: 1, name: 'Terminal 1', active: true, output: [] },
        { id: 2, name: 'SSH Remoto', active: false, output: [] }
      ],
      updateTerminalSessions: (sessions) => set({ terminalSessions: sessions }),
      
      // Actions
      resetSession: () =>
        set({
          sessionId: `session_${Date.now()}`,
          currentTarget: null,
          logs: [],
          terminalSessions: [
            { id: 1, name: 'Terminal 1', active: true, output: [] }
          ]
        })
    }),
    {
      name: 'cerberus-storage',
      partialize: (state) => ({
        config: state.config,
        targets: state.targets,
        logs: state.logs.slice(0, 100) // Keep only last 100 logs
      })
    }
  )
);
