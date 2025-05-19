
export enum ErrorType {
    SERVER_FAILURE = 500,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    OK = 200,
}

export class ApiError {
    code: ErrorType;
    message: string;
    /**
     *
     */
    constructor(code: ErrorType, message: string) {
        this.code = code in ErrorType ? code : ErrorType.SERVER_FAILURE;
        this.message = message;
    }

    toJson() {
        return JSON.stringify({ code: this.code, message: this.message })
    }
}