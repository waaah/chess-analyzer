import { ChessUser } from "@/types/chess-user";

export interface IBaseChessService {
    getUser(username: string): Promise<ChessUser>
}