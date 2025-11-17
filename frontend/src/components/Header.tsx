import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Header: React.FC = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Swim Condition
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography variant="body1">選手一覧</Typography>
                    <Typography variant="body1">入力フォーム</Typography>
                    <Typography variant="body1">設定</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};