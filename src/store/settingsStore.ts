import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SettingsState, UserSettings } from '../types';

const initialSettings: UserSettings = {
  apiKey: '',
  autoSave: true,
  lastGenerated: '',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: initialSettings,
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
    }),
    {
      name: 'mercari-settings',
    }
  )
);