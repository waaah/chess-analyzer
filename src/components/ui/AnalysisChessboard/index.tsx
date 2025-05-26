"use client";
import { Chess, Move, Square } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

type HighlightStyles = { [square: string]: React.CSSProperties }

export const AnalysisChessboard: React.FC<{ game: Chess }> = (props) => {
    const [fen, setFen] = useState<string>("");
    const { game } = props;
    const moveSound = useRef<HTMLAudioElement>(null);
    const moveCheckSound = useRef<HTMLAudioElement>(null);
    const gameOverSound = useRef<HTMLAudioElement>(null);
    const takesSound = useRef<HTMLAudioElement>(null);
    const castleSound = useRef<HTMLAudioElement>(null);
    const illegalMoveSound = useRef<HTMLAudioElement>(null);
    const [highlightSquares, setHighlightSquares] = useState<HighlightStyles>({});
    const [selectedPiece, setSelectedPiece] = useState<{ piece: string, square: Square }>()

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
        if (game) {
            const history = game.history({ verbose: true });
            if (history.length > 0) {
                setGameState(history[history.length - 1]);
            }
            else {
                setFen(game.fen());
            }
        }
    }, [game])

    const onDrop = (sourceSquare: Square, targetSquare: Square) => {
        const move = game.move({ from: sourceSquare, to: targetSquare });
        return setGameState(move);
    }

    const onSquareClick = (square: Square, piece: string | undefined) => {
        if (!piece) {
            const move = game.move({ from: selectedPiece!.square, to: square });
            setGameState(move);
            setHighlightSquares({});
            setSelectedPiece(undefined)
        }
        else {
            const moves = game.moves({ square, verbose: true });
            if (moves.length === 0) {
                setHighlightSquares({});
                return;
            }

            const highlights: HighlightStyles = {};
            moves.forEach((move) => {
                highlights[move.to] = {
                    background: 'radial-gradient(circle, rgba(0,0,0,0.3) 12%, transparent 12%',
                    borderRadius: '50%',
                };
            });

            setHighlightSquares(highlights);
            setSelectedPiece({ piece, square })
        }

    };

    const setGameState = (move: Move) => {
        try {
            if (game.isCheckmate() || game.isDraw())
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

            setFen(game.fen());
            return true;
        } catch (error) {
            console.error(error);
            illegalMoveSound.current?.play();
            return false;
        }
    }
    return <>
        <Chessboard
            onSquareClick={onSquareClick}
            arePiecesDraggable={true}      // ✅ Enable dragging 
            position={fen}
            customSquareStyles={highlightSquares}
            onPieceDrop={onDrop}
            boardWidth={560} />
    </>;
};