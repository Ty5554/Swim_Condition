// 履歴一覧ページです。
// 親から渡された conditions と loading 状態に応じて、ローディング/空状態/テーブルを切り替えます。
import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import type { Condition } from "../api";
import { ConditionTable } from "./ConditionTable";

type Props = {
    conditions: Condition[];
    loading: boolean;
};

export const HistoryPage: React.FC<Props> = ({ conditions, loading }) => {
    // データがあるかどうかで空状態の表示を切り替えます。
    const hasData = conditions.length > 0;

    return (
        <Box sx={{ flex: 1 }}>
            <Box
                sx={{
                    background: "linear-gradient(135deg, #0d47a1 0%, #00b0ff 50%, #26c6da 100%)",
                    color: "common.white",
                    py: { xs: 5, md: 7 },
                    boxShadow: "0 14px 30px rgba(13, 71, 161, 0.2)",
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        履歴一覧
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        過去のコンディションを一覧で確認できます。日々の変化を追いかけ、ピークのタイミングを見つけましょう。
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ py: 6 }}>
                {loading ? (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            読み込み中です…
                        </Typography>
                    </Paper>
                ) : hasData ? (
                    // データがあるときは一覧表示
                    <ConditionTable conditions={conditions} />
                ) : (
                    // データがないときは案内文を表示
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            まだ記録がありません。トップページの入力フォームからコンディションを追加してください。
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};
