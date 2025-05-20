import { ChessGame, ChessUser } from "@/types/chess-user";
import { IBaseChessService } from "./IBaseChessService";
import { ILichessUser } from "@/types/lichess.com";
import { ChessGameSource } from "@/types/chess";

export class LichessService implements IBaseChessService {
    getGameList(username: string): Promise<ChessGame[]> {
        console.log(username)
        throw new Error("Method not implemented.");
    }
    async getUser(username: string): Promise<ChessUser> {
        const response = await fetch(`https://lichess.org/api/user/${username}`)
        const data = await response.json() as ILichessUser
        return {
            username: data.username,
            rating: {
                rapid: data.perfs.rapid.rating,
                bullet: data.perfs.bullet.rating,
                blitz: data.perfs.blitz.rating
            },
            source: ChessGameSource.LICHESS
        }
    }
}