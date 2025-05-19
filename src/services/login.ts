import { ChessGameSource } from "@/types/chess";
import { formatApiResponse } from "@/utils/formatApiResponse";

export class LoginService {
    static loginUser = async ({ username, source }: { username: string, source: ChessGameSource }) => {
        const response = await fetch("/api/login", { method: "POST", body: JSON.stringify({ username, source }) })
        return await formatApiResponse(response);
    }
}