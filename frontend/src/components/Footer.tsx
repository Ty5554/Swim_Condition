import React from "react";
import { Box, Typography } from "@mui/material";

export const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 4,
                py: 2,
                textAlign: "center",
                borderTop: "1px solid #ddd",
                color: "text.secondary",
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} Swim Condition App
            </Typography>
        </Box>
    );
};
