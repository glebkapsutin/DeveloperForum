import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import ThemeToggle from "../theme-provider/ThemeToggle";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuthenticated } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../nav-bar";
import { CiLogout } from "react-icons/ci";


export const Header = () => {
  const theme = useTheme();
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);


  const handleLogout = ()=>
    {
      dispatch(logout());
      localStorage.removeItem('token');
      navigate('/auth');
    }
  return (
    <AppBar
      position="static"
  
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: ` ${theme.palette.divider}`,
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
            px: { xs: "5vw", sm: "24vw" }, // Отступы в процентах от ширины экрана (для гибкости)
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
            px: { xs: "5vw", sm: "12vw" }, // Отступы в процентах от ширины экрана
            width: "auto",
            mt: { xs: 2, sm: 0 }, // Отступ сверху для мобильных устройств
          }}
        >
          <ThemeToggle />
        </Box>
        <Box>
          {
            isAuthenticated && (
            <Button   onClick={handleLogout} sx={{color:theme.palette.text.primary ,display: "flex",
              alignItems: "center",gap: "8px","&:hover": { backgroundColor: "darkgray" }}}>
             <CiLogout /> <span>Выйти</span>
            </Button>)
          }
          
        </Box>

      </Toolbar>
    </AppBar>
  );
};
