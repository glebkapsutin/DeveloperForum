// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
   
    typography: {
        fontFamily: "Roboto, sans-serif",
        h3: {
            fontWeight: 700,
        },
    },
    // Можно расширить настройки компонентов, если потребуется
});

export default theme;
