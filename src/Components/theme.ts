import { create } from 'zustand';

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.darkMode;
      console.log('Toggling theme to:', newMode ? 'dark' : 'light'); // debug
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return { darkMode: newMode };
    });
  },
  
  setDarkMode: (value) => {
    document.documentElement.classList.toggle('dark', value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
    set({ darkMode: value });
  },
}));
