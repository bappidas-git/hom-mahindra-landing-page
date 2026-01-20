/* ============================================
   Theme Context - Nambiar District 25 Phase 2
   Handles theme preferences (light/dark mode)
   ============================================ */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create context
const ThemeContext = createContext(null);

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Provider component
export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to light
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
        return savedTheme;
      }
    }
    return THEMES.LIGHT;
  };

  const [theme, setThemeState] = useState(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT);

  // Resolve actual theme (handles system preference)
  const resolveTheme = useCallback(() => {
    if (theme === THEMES.SYSTEM) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? THEMES.DARK : THEMES.LIGHT;
    }
    return theme;
  }, [theme]);

  // Apply theme to document
  const applyTheme = useCallback((resolvedTheme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === THEMES.DARK ? '#0A1628' : '#FFFFFF'
      );
    }

    setResolvedTheme(resolvedTheme);
  }, []);

  // Set theme
  const setTheme = useCallback((newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  // Check if dark mode
  const isDark = resolvedTheme === THEMES.DARK;

  // Effect to apply theme on mount and changes
  useEffect(() => {
    const resolved = resolveTheme();
    applyTheme(resolved);
  }, [theme, resolveTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== THEMES.SYSTEM) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolved = resolveTheme();
      applyTheme(resolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, resolveTheme, applyTheme]);

  const value = {
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleTheme,
    THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
