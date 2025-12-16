// Condition の一覧を表形式で表示するコンポーネントです。
// diary（練習日誌）はテーブル内で長くなりやすいので、表示を短縮しています。
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from "@mui/material";
import type { Condition } from "../api";

type Props = {
    conditions: Condition[];
};

export const ConditionTable: React.FC<Props> = ({ conditions }) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>日付</TableCell>
                        <TableCell>選手名</TableCell>
                        <TableCell>身体疲労</TableCell>
                        <TableCell>精神疲労</TableCell>
                        <TableCell>達成率</TableCell>
                        <TableCell>心拍数</TableCell>
                        <TableCell>日誌</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {conditions.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.athlete_name}</TableCell>
                            <TableCell>
                                {/* 疲労度は Chip で視認性を上げます */}
                                <Chip label={row.physical_fatigue} size="small" />
                            </TableCell>
                            <TableCell>
                                <Chip label={row.mental_fatigue} size="small" />
                            </TableCell>
                            <TableCell>{row.training_completion}%</TableCell>
                            <TableCell>{row.heart_rate}</TableCell>
                            {/* 40文字まで表示し、全文は title 属性でホバー表示 */}
                            <TableCell sx={{ maxWidth: 240 }} title={row.diary}>
                                {row.diary.slice(0, 40)}
                                {row.diary.length > 40 ? "..." : ""}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
