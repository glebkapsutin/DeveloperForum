import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
    mode: ThemeMode;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    mode: "dark",
    toggleTheme: () => { },
});

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => (localStorage.getItem("theme") as ThemeMode) || "dark");

    useEffect(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);

    const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
                    background: { default: mode === "light" ? "#ffffff" : "#121212", paper: mode === "light" ? "#f5f5f5" : "#1d1d1d" },
                },
                typography: {
                    allVariants: {
                        fontFamily: "Roboto, Arial, sans-serif", // ���������� ������
                    },
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        body: {
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            transition: "background-color 0.1s ease-in-out, color 0.1s ease-in-out",
                        },
                    }}
                />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
