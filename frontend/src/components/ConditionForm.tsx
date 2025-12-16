// コンディションを新規作成する入力フォームです。
// 親から渡された onSubmit を呼び出し、成功したら一部入力をリセットします。
import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Slider,
} from "@mui/material";
import type { Condition } from "../api";

type Props = {
    onSubmit: (data: Omit<Condition, "id" | "date">) => Promise<void>;
};

export const ConditionForm: React.FC<Props> = ({ onSubmit }) => {
    // 各入力項目をローカル state で保持します（フォームの制御コンポーネント）。
    const [athleteName, setAthleteName] = useState("");
    const [physicalFatigue, setPhysicalFatigue] = useState(5);
    const [mentalFatigue, setMentalFatigue] = useState(5);
    const [trainingCompletion, setTrainingCompletion] = useState(80);
    const [heartRate, setHeartRate] = useState(120);
    const [diary, setDiary] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        // ブラウザの通常送信（ページ遷移）を止め、SPA として API 呼び出しに置き換えます。
        e.preventDefault();
        setSubmitting(true);
        try {
            // API に渡す形に整形して親へ渡します（id/date はサーバー側で付与）。
            await onSubmit({
                athlete_name: athleteName,
                physical_fatigue: physicalFatigue,
                mental_fatigue: mentalFatigue,
                training_completion: trainingCompletion,
                heart_rate: heartRate,
                diary,
            });
            // 入力後に日誌欄だけクリア（他の項目は連続入力しやすいよう残す設計）。
            setDiary("");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    コンディション入力
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
                    <TextField
                        label="選手名"
                        value={athleteName}
                        onChange={(e) => setAthleteName(e.target.value)}
                        required
                    />

                    {/* Slider は 0〜10 の整数値を入力する UI */}
                    <Typography variant="subtitle2">身体疲労度 (0-10)</Typography>
                    <Slider
                        value={physicalFatigue}
                        onChange={(_, v) => setPhysicalFatigue(v as number)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10}
                    />

                    <Typography variant="subtitle2">精神的疲労度 (0-10)</Typography>
                    <Slider
                        value={mentalFatigue}
                        onChange={(_, v) => setMentalFatigue(v as number)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10}
                    />

                    {/* 数値入力は TextField(type=number) で扱い、onChange で number に変換します */}
                    <TextField
                        label="トレーニング達成率 (%)"
                        type="number"
                        inputProps={{ min: 0, max: 100 }}
                        value={trainingCompletion}
                        onChange={(e) => setTrainingCompletion(Number(e.target.value))}
                        required
                    />

                    <TextField
                        label="心拍数"
                        type="number"
                        value={heartRate}
                        onChange={(e) => setHeartRate(Number(e.target.value))}
                        required
                    />

                    {/* 練習日誌は複数行入力 */}
                    <TextField
                        label="今日の練習日誌"
                        value={diary}
                        onChange={(e) => setDiary(e.target.value)}
                        multiline
                        minRows={3}
                    />

                    <Box textAlign="right">
                        <Button
                            variant="contained"
                            type="submit"
                            // 送信中は二重送信を避け、選手名が空なら必須として送信不可にします。
                            disabled={submitting || !athleteName}
                        >
                            保存する
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
