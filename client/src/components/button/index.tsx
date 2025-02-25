import { Button as MuiButton } from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode;
    icon?: JSX.Element;
    className?: string;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
};

export const Button: React.FC<Props> = ({
    children,
    icon,
    className,
    type,
    fullWidth,
    color,
}) => {
    
    let muiColor:
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning"
        | undefined;
   

    return (
        <MuiButton
            startIcon={icon}
            size="large" 
            color={muiColor}
            variant="text" 
            className={className}
            type={type}
            fullWidth={fullWidth}
            sx={{
                fontSize: "1.5rem",
                backgroundColor: "transparent",
                border: "none", 
                textTransform: "none",
                transition: "background-color 0.3s",
                "&:hover": {
                    backgroundColor: muiColor === "inherit" ? "action.hover" : undefined,
                },
            }}
        >
            {children}
        </MuiButton>
    );
};
