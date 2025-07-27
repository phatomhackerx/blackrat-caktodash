// Electron preload script
// This script runs in the renderer process and provides a safe way to access Node.js APIs

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Terminal commands
  executeCommand: (command: string) => ipcRenderer.invoke('execute-command', command),
  
  // System information
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // Check if running in Electron
  isElectron: true
});

// Types for TypeScript
declare global {
  interface Window {
    electronAPI: {
      executeCommand: (command: string) => Promise<{
        success: boolean;
        output: string;
        error: string;
      }>;
      getSystemInfo: () => Promise<any>;
      minimizeWindow: () => Promise<void>;
      maximizeWindow: () => Promise<void>;
      closeWindow: () => Promise<void>;
      isElectron: boolean;
    };
  }
}