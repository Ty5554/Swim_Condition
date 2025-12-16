
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { ConditionForm } from "./components/ConditionForm";
import { ConditionTable } from "./components/ConditionTable";
import { Condition, fetchConditions, createCondition } from "./api";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HistoryPage } from "./components/HistoryPage";

type Route = "/" | "/history";

const getCurrentPath = (): Route =>
    window.location.pathname.startsWith("/history") ? "/history" : "/";

const App: React.FC = () => {
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState<Route>(getCurrentPath());
    const [pendingHash, setPendingHash] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const data = await fetchConditions();
            setConditions(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        const handlePop = () => {
            const nextPath = getCurrentPath();
            setCurrentPath(nextPath);
            if (nextPath === "/" && window.location.hash) {
                setPendingHash(window.location.hash);
            }
        };
        window.addEventListener("popstate", handlePop);
        return () => window.removeEventListener("popstate", handlePop);
    }, []);

    useEffect(() => {
        if (getCurrentPath() === "/" && window.location.hash) {
            setPendingHash(window.location.hash);
        }
    }, []);

    useEffect(() => {
        if (currentPath === "/" && pendingHash) {
            const target = document.querySelector(pendingHash);
            if (target instanceof HTMLElement) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setPendingHash(null);
        }
    }, [currentPath, pendingHash]);

    const handleCreate = async (data: Omit<Condition, "id" | "date">) => {
        await createCondition(data);
        await load();
    };

    const navigateHome = (hash?: string) => {
        const nextUrl = hash ? `/${hash}` : "/";
        window.history.pushState({}, "", nextUrl);
        setCurrentPath("/");
        if (hash) {
            setPendingHash(hash);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const navigateHistory = () => {
        window.history.pushState({}, "", "/history");
        setCurrentPath("/history");
        setPendingHash(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="app-shell">
            <CssBaseline />
            <Header
                onNavigateHome={() => navigateHome()}
                onNavigateForm={() => navigateHome("#condition-input")}
                onNavigateHistory={navigateHistory}
                currentPath={currentPath}
            />

            {currentPath === "/history" ? (
                <HistoryPage conditions={conditions} loading={loading} />
            ) : (
                <>
                    {/* ヒーローセクション（トップの大きなエリア） */}
                    <Box
                        id="hero"
                        className="hero section-edge"
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            pb: 8,
                            pt: 10,
                            background: "linear-gradient(135deg, #0d47a1 0%, #00b0ff 50%, #26c6da 100%)",
                            color: "common.white",
                        }}
                    >
                        {/* 波っぽい下端の装飾 */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: -1,
                                left: 0,
                                width: "100%",
                                height: 80,
                                background:
                                    "radial-gradient(circle at 0 120%, transparent 55%, rgba(255,255,255,0.35) 56%, transparent 57%), radial-gradient(circle at 50% 120%, transparent 55%, rgba(255,255,255,0.35) 56%, transparent 57%), radial-gradient(circle at 100% 120%, transparent 55%, rgba(255,255,255,0.35) 56%, transparent 57%)",
                            }}
                        />

                        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
                            <Grid container spacing={4} alignItems="center">
                                <Grid item xs={12} md={7}>
                                    <Typography
                                        variant="h3"
                                        component="h1"
                                        sx={{ fontWeight: 700, mb: 2 }}
                                    >
                                        水泳選手の
                                        <br />
                                        コンディションを可視化する
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                                        日々変化する「疲労」「達成感」「心拍」「メンタル」。
                                        <br />
                                        Swim Condition は、コーチと選手の感覚をデータとして残し、
                                        トレーニングの質を一段上げるためのコンディション管理ツールです。
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            px: 4,
                                            py: 1.2,
                                            borderRadius: 999,
                                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                                            textTransform: "none",
                                            fontWeight: 600,
                                        }}
                                        href="#condition-input"
                                    >
                                        今日のコンディションを記録する
                                    </Button>
                                </Grid>

                                <Grid item xs={12} md={5}>
                                    {/* イメージ用カード（波っぽいグラフをイメージしたダミー） */}
                                    <Paper
                                        className="glass-card"
                                        elevation={6}
                                        sx={{
                                            p: 3,
                                            borderRadius: 4,
                                        }}
                                    >
                                        <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
                                            今日のコンディション・サマリー（イメージ）
                                        </Typography>

                                        <Box
                                            sx={{
                                                height: 140,
                                                borderRadius: 3,
                                                background:
                                                    "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(144,202,249,0.2))",
                                                overflow: "hidden",
                                                position: "relative",
                                            }}
                                        >
                                            {/* 波っぽいライン */}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    backgroundImage:
                                                        "radial-gradient(circle at 0% 80%, #0d47a1 0, transparent 50%), radial-gradient(circle at 40% 40%, #01579b 0, transparent 50%), radial-gradient(circle at 80% 70%, #00b0ff 0, transparent 50%)",
                                                    opacity: 0.7,
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                            <Typography variant="caption">
                                                身体疲労：中程度
                                                <br />
                                                精神疲労：やや低い
                                            </Typography>
                                            <Typography variant="caption" align="right">
                                                平均達成率：82%
                                                <br />
                                                平均心拍：128 bpm
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>

                    {/* メリット/特徴セクション */}
                    <Container maxWidth="md" className="section-edge" sx={{ mt: 6, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }} elevation={2}>
                                    <Typography variant="subtitle2" sx={{ color: "primary.main", mb: 1 }}>
                                        01. 日々の疲労を「見える化」
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        身体・メンタルの疲労度を 0〜10 のスケールで記録。
                                        過負荷になりそうなタイミングを事前に察知し、
                                        ケガのリスクを下げることができます。
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }} elevation={2}>
                                    <Typography variant="subtitle2" sx={{ color: "primary.main", mb: 1 }}>
                                        02. 達成率と心拍をセットで管理
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        メニューの達成率と心拍数を同時に管理することで、
                                        「質の高いトレーニング」ができているのかを一目で判断できます。
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }} elevation={2}>
                                    <Typography variant="subtitle2" sx={{ color: "primary.main", mb: 1 }}>
                                        03. コーチと選手で情報共有
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        日誌コメントを通じて、選手のコンディションや心情を共有。
                                        数字だけでは分からないコンディションもチームで把握できます。
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* コンディション入力セクション */}
                    <Box id="condition-input" className="scroll-anchor section-edge" sx={{ bgcolor: "#f5f7fb", py: 6 }}>
                        <Container maxWidth="md">
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                今日のコンディションを記録する
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                練習前後や、朝・夜など決まったタイミングでの記録がおすすめです。
                                小さな変化の積み重ねが、レース本番のパフォーマンスにつながります。
                            </Typography>

                            <ConditionForm onSubmit={handleCreate} />
                        </Container>
                    </Box>

                    {/* 一覧セクション */}
                    <Container
                        id="condition-history"
                        maxWidth="md"
                        className="scroll-anchor section-edge"
                        sx={{ mt: 6, mb: 8 }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            コンディション履歴一覧
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            過去のコンディションを振り返り、調子が良かった時期と
                            トレーニング内容の関係を確認してみましょう。
                        </Typography>

                        <ConditionTable conditions={conditions} />
                    </Container>
                </>
            )}

            <Footer />
        </div>
    );
};

export default App;
