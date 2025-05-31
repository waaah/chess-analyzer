"use client";
import { Chess } from "chess.js";
import { useCallback, useEffect, useState } from "react";
import * as openings from "../../public/openings/openings.json";

export type MoveTree = {
  square: string;
  alternates: MoveTree[];
};

export const useChess = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [moveTree, setMoveTree] = useState<MoveTree[]>([]);
  const [currentMove, selectCurrentMove] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [opening, setOpening] = useState<string>("");

  /**
   * Loads a chess game from a PGN string
   * @param {string} pgn - The PGN string to load
   */
  const loadPosition = (pgn: string) => {
    const chess = new Chess();
    chess.loadPgn(pgn);
    const history = chess.history();
    setMoveTree(history.map((h) => ({ square: h, alternates: [] })));
    chess.reset();
    setGame(chess);
  };

  const moveAt = useCallback(
    (currentMove: number) => {
      const chess = new Chess();
      const moves = moveTree.slice(0, currentMove);
      for (const move of moves) {
        chess.move(move.square);
      }
      setGame(chess);
      selectCurrentMove(currentMove);
    },
    [moveTree]
  );

  const moveNext = useCallback(() => {
    if (currentMove <= moveTree.length - 1) moveAt(currentMove + 1);
  }, [currentMove, moveTree, moveAt]);

  const moveBack = () => {
    if (currentMove > 0) moveAt(currentMove - 1);
  };

  const moveToEnd = () => {
    moveAt(moveTree.length);
  };

  const moveToStart = () => {
    moveAt(0);
  };

  const setCurrentMove = (sourceSquare: string, targetSquare: string) => {
    const index = moveTree.findIndex((t) => t.square === sourceSquare);

    if (index >= 0) {
      moveTree[index].alternates = [
        ...(moveTree[index]?.alternates || []),
        { square: targetSquare, alternates: [] },
      ];
      // refresh move tree based on updated data
      setMoveTree([...moveTree]);
    }
  };

  useEffect(() => {
    if (currentMove) moveAt(currentMove);
  }, [currentMove, moveAt]);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      if (currentMove <= moveTree.length - 1) moveAt(currentMove + 1);
      else setIsAutoplay(false);
    }, 500);

    return () => clearInterval(interval);
  }, [currentMove, moveTree.length, isAutoplay, moveAt, moveNext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") moveNext();
      if (event.key === "ArrowLeft") moveBack();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveBack, moveNext]);

  // load opening from game history
  useEffect(() => {
    if (game) {
      const history = game.history();
      const aggregatedMoves = [];
      let foundOpening: string = "";
      for (let i = 0; i < Math.ceil(history.length / 2); i++) {
        const whiteMove = history[i * 2];
        const blackMove = history[i * 2 + 1] ? " " + history[i * 2 + 1] : "";
        aggregatedMoves.push(`${i + 1}. ${whiteMove}${blackMove}`);
        const openingMoves = aggregatedMoves.join(" ");
        const currentOpening = (
          openings as Record<string, { pgn: string; name: string }>
        )[openingMoves];
        console.log(currentOpening, openingMoves);
        if (!currentOpening) {
          break;
        } else {
          foundOpening = currentOpening.name;
        }
      }

      if (foundOpening) {
        setOpening(foundOpening);
      }
    }
  }, [game]);

  return {
    opening,
    gameInstance: game,
    loadPosition,
    moves: {
      moveTree,
      currentMove,
      selectCurrentMove,
      moveNext,
      moveBack,
      moveToEnd,
      moveToStart,
      setIsAutoplay,
      setCurrentMove,
      isAutoplay,
    },
  };
};
