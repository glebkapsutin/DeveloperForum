import { Button as MuiButton } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
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
  className,
  color,
  icon,
  fullWidth,
  type,
}) => {
  // В MUI цветов несколько: "inherit", "primary", "secondary", "success", "error", "info", "warning"
  // Если передан "default" или не указан, то используем "inherit"
  // Для "danger" выбираем "error"
  const muiColor =
    !color || color === "default" ? "inherit" : color === "danger" ? "error" : color;

  return (
    <MuiButton
      startIcon={icon}         // аналог startContent из NextUI
      size="large"             // соответствует size="lg"
      color={muiColor}
      variant="outlined"       // для варианта "light" подойдёт "outlined"
      className={className}    // стили UnoCSS передаются через className
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </MuiButton>
  );
};
