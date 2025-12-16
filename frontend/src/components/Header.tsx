import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

type Props = {
    onNavigateHome: () => void;
    onNavigateForm: () => void;
    onNavigateHistory: () => void;
    currentPath: "/" | "/history";
};

export const Header: React.FC<Props> = ({
    onNavigateHome,
    onNavigateForm,
    onNavigateHistory,
    currentPath,
}) => {
    const isHome = currentPath === "/";
    const isHistory = currentPath === "/history";

    const handleClick =
        (callback: () => void) =>
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            callback();
        };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: "pointer" }}
                    component="a"
                    href="/"
                    onClick={handleClick(onNavigateHome)}
                >
                    Swim Condition
                </Typography>

                <Box component="nav" className="nav-links">
                    <Typography
                        component="a"
                        href="/"
                        variant="body1"
                        className={`nav-links__item ${isHome ? "nav-links__item--active" : ""}`}
                        onClick={handleClick(onNavigateHome)}
                    >
                        トップ
                    </Typography>
                    <Typography
                        component="a"
                        href="/#condition-input"
                        variant="body1"
                        className={`nav-links__item ${isHome ? "nav-links__item--active" : ""}`}
                        onClick={handleClick(onNavigateForm)}
                    >
                        入力フォーム
                    </Typography>
                    <Typography
                        component="a"
                        href="/history"
                        variant="body1"
                        className={`nav-links__item ${isHistory ? "nav-links__item--active" : ""}`}
                        onClick={handleClick(onNavigateHistory)}
                    >
                        履歴一覧
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
