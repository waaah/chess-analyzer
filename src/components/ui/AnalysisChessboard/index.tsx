"use client";
import { Chess, Move, Square } from "chess.js";
import React, { useEffect, useRef } from "react";
import { Chessboard } from "react-chessboard";

export const AnalysisChessboard: React.FC<{
  game: Chess;
  setCurrentMove: (sourceSquare: string, prevSquare: string) => void;
}> = (props) => {
  const [fen, setFen] = React.useState<string>("");
  const { game, setCurrentMove } = props;
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
    };
  }, []);

  useEffect(() => {
    if (game) {
      const history = game.history({ verbose: true });
      if (history.length > 0) {
        setGameState(history[history.length - 1]);
      } else {
        setFen(game.fen());
      }
    }
  }, [game]);

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    const move = game.move({ from: sourceSquare, to: targetSquare });
    const validState = setGameState(move);

    if (validState) {
      const history = game.history();
      const prevMove = history[history.length - 2];
      const currentMove = history[history.length - 1];
      setCurrentMove(prevMove, currentMove);
    }

    return validState;
  };

  const setGameState = (move: Move) => {
    try {
      if (game.isCheckmate() || game.isDraw()) gameOverSound.current?.play();
      else if (move.isKingsideCastle() || move.isQueensideCastle())
        castleSound.current?.play();
      else if (move.isCapture()) takesSound.current?.play();
      else if (move.isPromotion()) moveSound.current?.play();
      else if (move.san.endsWith("+")) moveCheckSound.current?.play();
      else moveSound.current?.play();

      setFen(game.fen());
      return true;
    } catch {
      illegalMoveSound.current?.play();
      return false;
    }
  };
  return (
    <>
      <Chessboard
        arePiecesDraggable={true} // ✅ Enable dragging
        position={fen}
        onPieceDrop={onDrop}
        boardWidth={560}
      />
    </>
  );
};
