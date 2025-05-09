export interface ILichessUser {
    id: string;
    username: string;
    perfs: {
        bullet: {
            rating: number
        },
        rapid: {
            rating: number
        },
        blitz: {
            rating: number
        }
    }
}