import { ChessGameSource } from "@/types/chess";

export const loginUser = ({ username, source }: { username: string, source: ChessGameSource }) => {
    return fetch("/api/login", { method: "POST", body: JSON.stringify({ username, source }) })
}