// src/App.tsx
import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";

const App = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h3" gutterBottom>
                Hello, Material UI!
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary">
                    input me
                </Button>
            </Box>
        </Container>
    );
};

export default App;
