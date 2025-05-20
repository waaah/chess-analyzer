import { ChessComUser, ChessComRating, ChessComGamesList } from "@/types/chess.com";
import { ApiError, ErrorType } from "../utils/api.error";
import { HttpClient } from "../utils/httpClient";

export class ChessComRepository {
    async getGamesList(username: string, month?: number, year?: number) {
        try {
            const currentMonth = new Date().getMonth()
            const queryMonth = month ?? `${currentMonth >= 9 ? "" : "0"}${currentMonth + 1}`;
            const queryYear = year ?? new Date().getFullYear();
            const response = await HttpClient.get<ChessComGamesList>(`https://api.chess.com/pub/player/${username}/games/${queryYear}/${queryMonth}`)
            return response
        } catch (error: unknown) {
            console.error(error)
            throw error;
        }
    }

    async getUserData(username: string): Promise<ChessComUser> {
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
    async getRating(username: string): Promise<ChessComRating> {
        const response = await HttpClient.get<ChessComRating>(`https://api.chess.com/pub/player/${username}/stats`)
        return response
    }
}  