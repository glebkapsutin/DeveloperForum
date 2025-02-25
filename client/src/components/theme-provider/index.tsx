import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';

type ThemeContextType = {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    mode: 'dark',
    toggleTheme: () => { },
});

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', mode);
        console.log("Текущая тема:", mode);  
    }, [mode]);

    const toggleTheme = () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    primary: { main: '#1976d2' },
                    background: { default: '#ffffff', paper: '#f5f5f5' },
                }
                : {
                    primary: { main: '#90caf9' },
                    background: { default: '#121212', paper: '#1d1d1d' },
                }),
        },
    }), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles styles={{
                    body: {
                        backgroundColor: theme.palette.background.default,
                        color: mode === 'dark' ? '#ffffff' : '#000000',
                        transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
                    }
                }} />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
