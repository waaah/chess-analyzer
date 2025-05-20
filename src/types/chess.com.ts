export type ChessComUser = {
    username: string;
    title: string;
    avatar: string;
    name: string;
    location: string;
}

export type ChessComRating = {
    chess_rapid: {
        last: {
            rating: number;
        }
    },
    chess_bullet: {
        last: {
            rating: number;
        }
    },
    chess_blitz: {
        last: {
            rating: number;
        }
    }
}

export type ChessComError = {
    error: string;
    code: string;
}

export type ChessComGamesList = { games: ChessComGame[] }

export type ChessComGame = {
    url: string;
    pgn: string;
    uuid: string;
    fen: string;
    white: ChessComPlayerResult;
    black: ChessComPlayerResult;
    time_class: ChessComTimeClass;
    time_control: string;
    accuracies: {
        white: number;
        black: number
    }
}

export type ChessComPlayerResult = {
    rating: number;
    result: ChessComResultType;
    username: string;
    "@id": string;
    uuid: string
}

export enum ChessComResultType {
    agreed = 'agreed',
    draw = 'draw',
    checkmated = 'checkmated',
    win = 'win',
    resigned = 'resigned'
}

export enum ChessComTimeClass {
    rapid = 'rapid',
    bullet = 'bullet',
    blitz = 'blitz'
}