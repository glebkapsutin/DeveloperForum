import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles"; // Для использования темы

type Props = {
    children: React.ReactNode;
    icon: JSX.Element;
    href: string;
};

export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
    const theme = useTheme(); // Получаем текущую тему (светлая или темная)

    return (
        <Button
            component={Link} // Делаем кнопку ссылкой
            to={href}
            startIcon={icon} // Иконка слева
            fullWidth
            variant="outlined" // Контурная кнопка
            sx={{
                justifyContent: "flex-start", // Иконка и текст слева
                textTransform: "none", // Отключаем капс
                fontSize: "1.5rem", // Размер текста
                padding: "10px 16px",
                borderRadius: "10px",
                backgroundColor: "transparent", // Прозрачный фон
                border: `1px solid ${theme.palette.mode === "dark" ? "#fff" : "#000"}`, // Контур зависит от темы
                color: theme.palette.mode === "dark" ? "#fff" : "#000", // Цвет текста зависит от темы
                "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)", // Изменение фона при ховере
                    borderColor: theme.palette.mode === "dark" ? "#fff" : "#000", // Изменение цвета контура при ховере
                },
            }}
        >
            {children}
        </Button>
    );
};
