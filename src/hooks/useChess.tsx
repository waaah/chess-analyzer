"use client";
import { Chess } from "chess.js";
import { useCallback, useEffect, useState } from "react";

export const useChess = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [history, setHistory] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  /**
   * Loads a chess game from a PGN string
   * @param {string} pgn - The PGN string to load
   */
  const loadPosition = (pgn: string) => {
    const chess = new Chess();
    chess.loadPgn(pgn);
    setHistory([...chess.history()]);
    chess.reset();
    setGame(chess);
  };

  const moveAt = useCallback(
    (currentMove: number) => {
      const chess = new Chess();
      const moves = history.slice(0, currentMove);
      for (const move of moves) {
        chess.move(move);
      }
      setGame(chess);
      setCurrentMove(currentMove);
    },
    [history]
  );

  const moveNext = () => {
    if (currentMove <= history.length - 1) moveAt(currentMove + 1);
  };
  const moveBack = () => {
    if (currentMove > 0) moveAt(currentMove - 1);
  };

  const moveToEnd = () => {
    moveAt(history.length);
  };

  const moveToStart = () => {
    moveAt(0);
  };

  useEffect(() => {
    if (currentMove) moveAt(currentMove);
  }, [currentMove, moveAt]);

  return {
    gameInstance: game,
    loadPosition,
    moves: {
      currentMove,
      history,
      setCurrentMove,
      moveNext,
      moveBack,
      moveToEnd,
      moveToStart,
    },
  };
};
