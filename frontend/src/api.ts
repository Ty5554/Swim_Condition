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

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

const apiClient = axios.create({
    baseURL: apiBaseUrl,
});

export async function fetchConditions(): Promise<Condition[]> {
    const res = await apiClient.get<Condition[]>("/conditions/");
    return res.data;
}

export async function createCondition(data: Omit<Condition, "id" | "date">): Promise<void> {
    await apiClient.post("/conditions/", data);
}
