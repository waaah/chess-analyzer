import { ChessGameSource, GameModes, GameResult } from "./chess";

export type ChessUser = {
  username: string;
  title?: string;
  avatar?: string;
  name?: string;
  location?: string;
  rating: {
    rapid: number;
    bullet: number;
    blitz: number;
  };
  source: ChessGameSource;
};

export type ChessGame = {
  time_class: GameModes;
  time_control: string;
  white: ChessGamePlayerData;
  black: ChessGamePlayerData;
};

export type ChessGamePlayerData = {
  username: string;
  rating: number;
  uuid: string;
  accuracy: number;
  result: GameResult;
  originalResult: string;
};
