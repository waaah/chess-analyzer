import { NextRequest } from 'next/server';
import { ChessServiceFactory } from '../factory/ChessServiceFactory';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, source } = body;
    const chessService = ChessServiceFactory.create(source);
    const user = await chessService.getUser(username);
    try {
        return new Response(JSON.stringify(user))
    } catch {
        return new Response(JSON.stringify({ "message": "Invalid user." }), { status: 500 })
    }
}