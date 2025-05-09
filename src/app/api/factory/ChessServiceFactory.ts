import { ChessGameSource } from "@/types/chess";
import { ChessComService } from "../services/chess.com.service";
import { IBaseChessService } from "../services/IBaseChessService";
import { LichessService } from "../services/lichess.service";

export class ChessServiceFactory {
    static create(source: ChessGameSource): IBaseChessService {
        switch (source) {
            case ChessGameSource.CHESS_COM:
                return new ChessComService();
            case ChessGameSource.LICHESS:
                return new LichessService();
            default:
                throw new Error("Unknown source");
        }
    }
}