import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles"; // ��� ������������� ����

type Props = {
    children: React.ReactNode;
    icon: JSX.Element;
    href: string;
};

export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
    const theme = useTheme(); // �������� ������� ���� (������� ��� ������)

    return (
        <Button
            component={Link} // ������ ������ �������
            to={href}
            startIcon={icon} // ������ �����
            fullWidth
            variant="text" // ������ ��� ������� � ����
            sx={{
                justifyContent: "flex-start", // ������ � ����� �����
                textTransform: "none", // ��������� ����
                fontSize: "1.5rem", // ������ ������
                padding: "10px 16px",
                borderRadius: "10px",
                backgroundColor: "transparent", // ���������� ���
                color: theme.palette.mode === "dark" ? "#fff" : "#000", // ���� ������ ������� �� ����
                "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)", // ������� ��� ������
                },
            }}
        >
            {children}
        </Button>
    );
};
