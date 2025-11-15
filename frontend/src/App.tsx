
import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Typography, Box } from "@mui/material";
import { ConditionForm } from "./components/ConditionForm";
import { ConditionTable } from "./components/ConditionTable";
import { Condition, fetchConditions, createCondition } from "./api";

const App: React.FC = () => {
    const [conditions, setConditions] = useState<Condition[]>([]);

    const load = async () => {
        const data = await fetchConditions();
        setConditions(data);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreate = async (data: Omit<Condition, "id" | "date">) => {
        await createCondition(data);
        await load();
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    水泳選手コンディション管理
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    コーチが選手の疲労度・達成率・心拍数・練習日誌を一元管理するための簡易アプリです。
                </Typography>

                <Box sx={{ my: 3 }}>
                    <ConditionForm onSubmit={handleCreate} />
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        コンディション一覧
                    </Typography>
                    <ConditionTable conditions={conditions} />
                </Box>
            </Container>
        </>
    );
};

export default App;
