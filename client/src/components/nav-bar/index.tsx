import React from "react";
import { NavButton } from "../nav-button";
import { Box } from "@mui/material";
import { Newspaper, Users, UserPlus } from "lucide-react";


export const NavBar: React.FC = () => {
    return (
        <nav>
            <Box display="flex" flexDirection="column" gap={2}>
                <NavButton href="/" icon={<Newspaper size={20} />}>
                    Посты
                </NavButton>
                <NavButton href="/following" icon={<Users size={20} />}>
                    Подписки
                </NavButton>
                <NavButton href="/followers" icon={<UserPlus size={20} />}>
                    Подписчики
                </NavButton>
            </Box>
        </nav>
    );
};
