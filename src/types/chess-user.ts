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

export type ChessGame = {
    time_class: string;
    time_control: string;
    white: ChessGamePlayerData,
    black: ChessGamePlayerData
}

export type ChessGamePlayerData = {
    username: string;
    rating: number;
    uuid: string;
    accuracy: number;
    result: ChessResultType
}

export enum ChessResultType {
    agreed = 'agreed',
    draw = 'draw',
    checkmated = 'checkmated',
    resigned = 'resigned',
    win = 'win'
}