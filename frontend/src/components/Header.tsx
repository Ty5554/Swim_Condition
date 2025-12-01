import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Header: React.FC = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Swim Condition
                </Typography>

                <Box component="nav" className="nav-links">
                    <Typography
                        component="a"
                        href="#hero"
                        variant="body1"
                        className="nav-links__item"
                    >
                        トップ
                    </Typography>
                    <Typography
                        component="a"
                        href="#condition-input"
                        variant="body1"
                        className="nav-links__item"
                    >
                        入力フォーム
                    </Typography>
                    <Typography
                        component="a"
                        href="#condition-history"
                        variant="body1"
                        className="nav-links__item"
                    >
                        履歴一覧
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
