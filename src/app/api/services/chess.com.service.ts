import { ChessComRating, ChessComUser } from "@/types/chess.com";
import { IBaseChessService } from "./IBaseChessService";
import { ChessUser } from "@/types/chess-user";

export class ChessComService implements IBaseChessService {
    async getUser(username: string): Promise<ChessUser> {
        const response = await fetch(`https://api.chess.com/pub/player/${username}`)
        const userData = await response.json() as ChessComUser;
        const rating = await this.getRating(username);
        return {
            username: userData.username,
            title: userData.title,
            avatar: userData.avatar,
            name: userData.name,
            location: userData.location,
            rating: {
                rapid: rating.chess_rapid.last.rating,
                bullet: rating.chess_bullet.last.rating,
                blitz: rating.chess_blitz.last.rating
            }
        }
    }

    private async getRating(username: string): Promise<ChessComRating> {
        const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`)
        const data = await response.json() as ChessComRating;
        return data
    }
}