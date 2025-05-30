import { useState, useEffect } from 'react';
import { ThemeType } from '../types';
import { getCookie, setCookie } from '../services/storageService';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('light');

  // Initialize theme from cookie or system preference
  useEffect(() => {
    const savedTheme = getCookie('theme') as ThemeType | null;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCookie('theme', newTheme);
  };

  return { theme, toggleTheme };
};