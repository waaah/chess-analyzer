import { Chess } from "chess.js";
import { useState } from "react";

export const useChess = () => {
    const [game, setGame] = useState<Chess>(new Chess());
    const [history, setHistory] = useState<string[]>([]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    /**
     * Loads a chess game from a PGN string
     * @param {string} pgn - The PGN string to load
     */
    const loadPosition = (pgn: string) => {
        const chess = new Chess()
        chess.loadPgn(pgn);
        setHistory(chess.history());
        chess.reset();
        setGame(chess)
    }


    return { gameInstance: game, loadPosition }
}