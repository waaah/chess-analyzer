import { ChessGame, ChessUser } from "@/types/chess-user";

export interface IBaseChessService {
    getUser(username: string): Promise<ChessUser>
    getGameList(username: string): Promise<ChessGame[]>
}