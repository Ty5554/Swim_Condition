// api.ts
// API 型定義と関数（仮実装）

export type Condition = {
    id: number;
    name: string;
    fatigue: number;
    achievement: number;
    heartRate: number;
    diary: string;
    date: string;
};

// ダミーデータ
const dummyConditions: Condition[] = [
    {
        id: 1,
        name: "山田太郎",
        fatigue: 3,
        achievement: 80,
        heartRate: 120,
        diary: "今日は良い練習ができた。",
        date: "2025-11-15",
    },
];

export async function fetchConditions(): Promise<Condition[]> {
    // 本来はAPIリクエスト
    return Promise.resolve(dummyConditions);
}

export async function createCondition(data: Omit<Condition, "id" | "date">): Promise<void> {
    // 本来はAPIリクエスト
    return Promise.resolve();
}
