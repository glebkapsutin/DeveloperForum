import { Button as MuiButton } from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode;
    icon?: JSX.Element;
    className?: string;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    color?: "primary" | "secondary" | "success" | "warning" | "error";
    variant?: "text" | "contained" | "outlined";
    onClick?: () => void;
};

export const Button: React.FC<Props> = ({
    children,
    icon,
    className,
    type = "button",
    fullWidth = false,
    color = "primary",
    variant = "contained",
    onClick,
}) => {
    return (
        <MuiButton
            startIcon={icon}
            size="large"
            color={color}
            variant={variant}
            className={className}
            type={type}
            fullWidth={fullWidth}
            onClick={onClick}
        >
            {children}
        </MuiButton>
    );
};
