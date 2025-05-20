import { ChessComGame } from "@/types/chess.com";
import { IBaseChessService } from "./IBaseChessService";
import { ChessGame, ChessResultType, ChessUser } from "@/types/chess-user";
import { ChessGameSource } from "@/types/chess";
import { ChessComRepository } from "../repository/chess.com.repository";

export class ChessComService implements IBaseChessService {
    private chessComRepository
    constructor() {
        this.chessComRepository = new ChessComRepository();
    }
    async getGameList(username: string): Promise<ChessGame[]> {
        const { games } = await this.chessComRepository.getGamesList(username);
        return games.map((game: ChessComGame) => ({
            time_class: game.time_class,
            time_control: game.time_control,
            white: {
                username: game.white.username,
                rating: game.white.rating,
                uuid: game.white.uuid,
                accuracy: game.accuracies.white,
                result: game.white.result as unknown as ChessResultType
            },
            black: {
                username: game.black.username,
                rating: game.black.rating,
                uuid: game.black.uuid,
                accuracy: game.accuracies.black,
                result: game.black.result as unknown as ChessResultType
            }
        }))
    }
    async getUser(username: string): Promise<ChessUser> {
        const userData = await this.chessComRepository.getUserData(username);
        const rating = await this.chessComRepository.getRating(username);
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


}