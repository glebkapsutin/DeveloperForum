
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggle from "../theme-provider/ThemeToggle";
import * as React from "react";

export const Header = () => {

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Developer Forum
                </Typography>
                <Box>
                    <ThemeToggle/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};