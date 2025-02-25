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
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", px: 80}}>
          Developer Forum
        </Typography>
              <Box sx={{px: 60}}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
