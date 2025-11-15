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
  const res = await api.get<Condition[]>("/conditions/");
  return res.data;
}

export async function createCondition(
  data: Omit<Condition, "id" | "date">
): Promise<Condition> {
  const res = await api.post<Condition>("/conditions/", data);
  return res.data;
}
