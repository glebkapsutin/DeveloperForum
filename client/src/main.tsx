// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import "./index.css";



const container = document.getElementById("root");

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline /> {/* —брос базовых стилей */}
                    <App />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
} else {
    throw new Error("Root element not found.");
}
