import { NextRequest } from 'next/server';
import { ChessServiceFactory } from '../factory/ChessServiceFactory';
import { formatApiError } from '../utils/formatApiError';

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const { username, source } = body;
        const chessService = ChessServiceFactory.create(source);
        const user = await chessService.getUser(username);
        return new Response(JSON.stringify(user))
    } catch (error) {
        return formatApiError(error)
    }
}