import { ChessComRating, ChessComUser } from "@/types/chess.com";
import { IBaseChessService } from "./IBaseChessService";
import { ChessUser } from "@/types/chess-user";
import { HttpClient } from "../utils/httpClient";
import { ApiError, ErrorType } from "../utils/api.error";
import { ChessGameSource } from "@/types/chess";

export class ChessComService implements IBaseChessService {
    async getUser(username: string): Promise<ChessUser> {
        const userData = await this.getUserData(username);
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
            },
            source: ChessGameSource.CHESS_COM
        }

    }

    private async getUserData(username: string): Promise<ChessComUser> {
        try {
            const response = await HttpClient.get<ChessComUser>(`https://api.chess.com/pub/player/${username}`)
            return response
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                if (error.code === ErrorType.NOT_FOUND) {
                    throw new ApiError(ErrorType.NOT_FOUND, "User not found.");
                }
            }
            throw error;
        }

    }
    private async getRating(username: string): Promise<ChessComRating> {
        const response = await HttpClient.get<ChessComRating>(`https://api.chess.com/pub/player/${username}/stats`)
        return response
    }
}