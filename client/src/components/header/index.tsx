import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggle from "../theme-provider/ThemeToggle";
import * as React from "react";
import { useTheme } from "@mui/material/styles";

export const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          flexDirection: { xs: "column", sm: "row" }, // Строка на экранах больше, колонка на мобильных
        }}
      >
        {/* Название */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            px: { xs: "5vw", sm: "10vw" }, // Отступы в процентах от ширины экрана (для гибкости)
            textAlign: { xs: "center", sm: "left" }, // Центрирование на мобильных
            width: "auto", // Для гибкости
          }}
        >
          Developer Forum
        </Typography>

        {/* Переключатель темы */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            px: { xs: "5vw", sm: "10vw" }, // Отступы в процентах от ширины экрана
            width: "auto",
            mt: { xs: 2, sm: 0 }, // Отступ сверху для мобильных устройств
          }}
        >
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
