'use client'
import { useEffect, useRef } from "react";
import { Chess } from "chess.js";

export const useStockfish = () => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Worker' in window) {
      workerRef.current = new Worker('/stockfish/stockfish.js');
      // Initialize Stockfish Web Worker
      workerRef.current.onmessage = (event) => {
        console.log("Stockfish says:", event.data);
      };

      workerRef.current.onerror = (event) => {
        console.log("Stockfish says:", event);
      };


      // Clean up on unmount
      return () => {
        workerRef.current?.terminate();
      };
    }
  }, []);

  const analyzePosition = (pgn: string, depth: number = 30) => {
    const chess = new Chess();
    chess.loadPgn(pgn);
    const fen = chess.fen();

    workerRef.current?.postMessage("uci");
    workerRef.current?.postMessage("isready");
    workerRef.current?.postMessage(`position fen ${fen}`);
    workerRef.current?.postMessage(`go depth ${depth}`);
  };

  return { analyzePosition };
};
