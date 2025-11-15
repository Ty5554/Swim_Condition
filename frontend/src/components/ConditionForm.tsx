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
    const [athleteName, setAthleteName] = useState("");
    const [physicalFatigue, setPhysicalFatigue] = useState(5);
    const [mentalFatigue, setMentalFatigue] = useState(5);
    const [trainingCompletion, setTrainingCompletion] = useState(80);
    const [heartRate, setHeartRate] = useState(120);
    const [diary, setDiary] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await onSubmit({
                athlete_name: athleteName,
                physical_fatigue: physicalFatigue,
                mental_fatigue: mentalFatigue,
                training_completion: trainingCompletion,
                heart_rate: heartRate,
                diary,
            });
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
