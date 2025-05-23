import { Chess, Square } from "chess.js";
import React, { useEffect, useRef } from "react";
import { Chessboard } from "react-chessboard";

export const BasicChessboard: React.FC<{ pgn?: string }> = (props) => {
    const [fen, setFen] = React.useState<string>("");
    const game = useRef(new Chess());
    const { pgn } = props;
    const moveSound = useRef<HTMLAudioElement>(null);
    const moveCheckSound = useRef<HTMLAudioElement>(null);
    const gameOverSound = useRef<HTMLAudioElement>(null);
    const takesSound = useRef<HTMLAudioElement>(null);
    const castleSound = useRef<HTMLAudioElement>(null);
    const illegalMoveSound = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Initialize audio object
        moveSound.current = new Audio("/sounds/move-self.mp3");
        gameOverSound.current = new Audio("/sounds/game-end.webm");
        castleSound.current = new Audio("/sounds/castle.mp3");
        takesSound.current = new Audio("/sounds/capture.mp3");
        moveCheckSound.current = new Audio("/sounds/move-check.mp3");
        illegalMoveSound.current = new Audio("/sounds/illegal.mp3");

        return () => {
            moveSound.current?.remove();
            moveCheckSound.current?.remove();
            gameOverSound.current?.remove();
            takesSound.current?.remove();
            castleSound.current?.remove();
            illegalMoveSound.current?.remove();
        }
    }, []);

    useEffect(() => {
        setFen(game.current.fen());
    }, [pgn])

    const onDrop = (sourceSquare: Square, targetSquare: Square) => {
        try {
            const move = game.current.move({ from: sourceSquare, to: targetSquare });
            if (game.current.isCheckmate() || game.current.isDraw())
                gameOverSound.current?.play();
            else if (move.isKingsideCastle() || move.isQueensideCastle())
                castleSound.current?.play();
            else if (move.isCapture())
                takesSound.current?.play();
            else if (move.isPromotion())
                moveSound.current?.play();
            else if (move.san.endsWith("+"))
                moveCheckSound.current?.play();
            else
                moveSound.current?.play();

            setFen(game.current.fen());
            return true;
        } catch (error) {
            console.error(error);
            illegalMoveSound.current?.play();
            return false;
        }


    }
    return <>
        <Chessboard
            arePiecesDraggable={true}      // ✅ Enable dragging 
            position={fen}
            onPieceDrop={onDrop}
            boardWidth={560} />
    </>;
};