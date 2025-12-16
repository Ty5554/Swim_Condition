// （別実装の）API クライアント定義です。
// `frontend/src/api.ts` と役割が重複しているため、利用する側に合わせてどちらかへ統一すると整理しやすいです。
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL,
});

export type Condition = {
  id?: number;
  athlete_name: string;
  date?: string;
  physical_fatigue: number;
  mental_fatigue: number;
  training_completion: number;
  heart_rate: number;
  diary: string;
};

export async function fetchConditions(): Promise<Condition[]> {
  // GET /conditions/ -> Condition[] を取得
  const res = await api.get<Condition[]>("/conditions/");
  return res.data;
}

export async function createCondition(
  data: Omit<Condition, "id" | "date">
): Promise<Condition> {
  // POST /conditions/ -> 作成した Condition を返す
  const res = await api.post<Condition>("/conditions/", data);
  return res.data;
}
