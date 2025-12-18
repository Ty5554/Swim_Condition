import React, { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { registerUser, UserRegistrationPayload } from "../api";

type FormState = {
    account_id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    birth_date: string;
};

const initialFormState: FormState = {
    account_id: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birth_date: "",
};

export const RegisterPage: React.FC = () => {
    const [form, setForm] = useState<FormState>(initialFormState);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange =
        (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({
                ...prev,
                [field]: event.target.value,
            }));
        };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        const payload: UserRegistrationPayload = {
            account_id: form.account_id.trim(),
            email: form.email.trim(),
            password: form.password,
            first_name: form.first_name.trim() || undefined,
            last_name: form.last_name.trim() || undefined,
            birth_date: form.birth_date || undefined,
        };

        try {
            await registerUser(payload);
            setSuccessMessage("ユーザー登録が完了しました。ログイン画面からサインインしてください。");
            setForm(initialFormState);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const detail =
                    typeof error.response.data === "string"
                        ? error.response.data
                        : JSON.stringify(error.response.data);
                setErrorMessage(`登録に失敗しました: ${detail}`);
            } else {
                setErrorMessage("登録に失敗しました。時間をおいて再度お試しください。");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box className="section-edge" sx={{ backgroundColor: "#f4f6fb", py: 8 }}>
            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
                        ユーザー登録
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                        Swim Condition を利用するためのアカウントを作成します。登録後は、管理者が付与した
                        account ID とパスワードでログインしてください。
                    </Typography>

                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}

                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="アカウントID"
                                    fullWidth
                                    required
                                    value={form.account_id}
                                    onChange={handleChange("account_id")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="メールアドレス"
                                    fullWidth
                                    required
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="パスワード"
                                    fullWidth
                                    required
                                    type="password"
                                    helperText="8文字以上、推測されにくいパスワードを設定してください。"
                                    value={form.password}
                                    onChange={handleChange("password")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="姓"
                                    fullWidth
                                    value={form.last_name}
                                    onChange={handleChange("last_name")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="名"
                                    fullWidth
                                    value={form.first_name}
                                    onChange={handleChange("first_name")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="生年月日"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={form.birth_date}
                                    onChange={handleChange("birth_date")}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 4 }}
                            disabled={submitting}
                        >
                            {submitting ? "登録中..." : "登録する"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
