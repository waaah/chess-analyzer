import { ChessGameSource } from "./chess";

export type ChessUser = {
    username: string;
    title?: string;
    avatar?: string;
    name?: string;
    location?: string;
    rating: {
        rapid: number;
        bullet: number;
        blitz: number
    }
    source: ChessGameSource
}