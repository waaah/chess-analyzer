import { ApiError } from "./api.error";

export class HttpClient {
    static async get<T>(url: string) {
        const response = await fetch(url);
        return await this.formatResponse(response) as T;
    }

    private static async formatResponse(response: Response) {
        if (response.ok) {
            return await response.json();
        } else {
            throw new ApiError(response.status, response.statusText);
        }
    }
}