import { create } from 'zustand';

interface Settings {
  apiKey: string;
  autoSave: boolean;
  lastGenerated: string;
}

interface SettingsStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    apiKey: '',
    autoSave: false,
    lastGenerated: '',
  },
  updateSettings: (newSettings) => 
    set((state) => ({ 
      settings: { ...state.settings, ...newSettings } 
    })),
})); 