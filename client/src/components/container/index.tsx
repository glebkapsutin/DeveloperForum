import React from "react";
import { Container as MuiContainer } from "@mui/material";

type Props = {
    children: React.ReactElement[] | React.ReactElement;
};

export const Container: React.FC<Props> = ({ children }) => {
    return (
        <MuiContainer maxWidth="xl" sx={{ mt: 4 }}>
            {children}
        </MuiContainer>
    );
};
