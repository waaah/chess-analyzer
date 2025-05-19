import { ApiError, ErrorType } from "./api.error"

export const formatApiError = (error: unknown) => {
    if (error instanceof ApiError) return new Response(error.toJson(), { status: error.code })

    const defaultError = new ApiError(ErrorType.SERVER_FAILURE, "Unable to process request.")
    return new Response(defaultError.toJson(), { status: ErrorType.SERVER_FAILURE })
}