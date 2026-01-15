import { NextResponse } from 'next/server'
import MessageController from '@/controllers/messageController'

export async function POST(request, { params }) {
    try {
        const { messageId } = params
        const result = await MessageController.markAsRead(messageId)

        if (result.success) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json(result, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
