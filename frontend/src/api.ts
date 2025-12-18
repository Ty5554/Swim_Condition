// フロントエンドからバックエンド API（Django/DRF）を呼び出すための薄いラッパーです。
// - Condition 型: API レスポンスの形
// - fetchConditions: 一覧取得
// - createCondition: 新規作成
import axios from "axios";

export type Condition = {
    id: number;
    athlete_name: string;
    physical_fatigue: number;
    mental_fatigue: number;
    training_completion: number;
    heart_rate: number;
    diary: string;
    date: string;
};

// Vite の環境変数（VITE_ から始まるもの）で API のベース URL を切り替えられます。
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

// axios のインスタンスを作って baseURL を共通化します。
const apiClient = axios.create({
    baseURL: apiBaseUrl,
});

export type RegisteredUser = {
    id: number;
    account_id: string;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: string | null;
};

export type UserRegistrationPayload = {
    account_id: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    birth_date?: string;
};

export async function fetchConditions(): Promise<Condition[]> {
    // GET /conditions/ -> Condition[] を取得
    const res = await apiClient.get<Condition[]>("/conditions/");
    return res.data;
}

export async function createCondition(data: Omit<Condition, "id" | "date">): Promise<void> {
    // POST /conditions/ -> 新しい Condition を作成（この実装ではレスポンスは使わない）
    await apiClient.post("/conditions/", data);
}

export async function registerUser(payload: UserRegistrationPayload): Promise<RegisteredUser> {
    const res = await apiClient.post<RegisteredUser>("/auth/register", payload);
    return res.data;
}
