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
