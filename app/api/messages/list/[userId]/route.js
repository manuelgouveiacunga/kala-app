import { NextResponse } from 'next/server'
import MessageController from '@/controllers/messageController'

export async function GET(request, { params }) {
    try {
        const { userId } = params
        const result = await MessageController.listMessages(userId)

        if (result.success) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json(result, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
