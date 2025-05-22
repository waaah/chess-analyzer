import { useEffect, useRef } from "react";
import { Chess } from "chess.js";

export const useStockfish = () => {
  const workerRef = useRef(new Worker("public/stockfish.js"));

  useEffect(() => {
    // Initialize Stockfish Web Worker
    workerRef.current = new Worker("/stockfish.js");

    workerRef.current.onmessage = (event) => {
      console.log("Stockfish says:", event.data);
    };

    // Clean up on unmount
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const analyzePosition = (pgn: string, depth: number = 15) => {
    const chess = new Chess(pgn);
    chess.loadPgn(pgn);
    const fen = chess.fen();

    workerRef.current.postMessage("uci");
    workerRef.current.postMessage("isready");
    workerRef.current.postMessage(`position fen ${fen}`);
    workerRef.current.postMessage(`go depth ${depth}`);
  };

  return { analyzePosition };
};
