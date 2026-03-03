import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

    const toggleTheme = () => setIsDark(!isDark);

    const theme = {
        isDark,
        colors: isDark ? {
            background: '#0a0f14',
            surface: '#161e27',
            text: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.6)',
            primary: '#258cf4',
            accent: '#01b489',
            border: 'rgba(255,255,255,0.05)',
            live: '#ef4444',
            upcoming: '#f59e0b',
        } : {
            background: '#f8fafc',
            surface: '#ffffff',
            text: '#0f172a',
            textSecondary: 'rgba(15,23,42,0.6)',
            primary: '#2563eb',
            accent: '#01b489',
            border: 'rgba(0,0,0,0.05)',
            live: '#dc2626',
            upcoming: '#d97706',
        }
    };

    return (
        <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
