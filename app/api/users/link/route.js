import { NextResponse } from 'next/server'
import UserController from '@/controllers/userController'

export async function POST(request) {
    try {
        const body = await request.json()
        const { userId } = body

        if (!userId) {
            return NextResponse.json({ success: false, error: 'UserId obrigat\u00f3rio' }, { status: 400 })
        }

        const result = await UserController.generateLink(userId)

        if (result.success) {
            return NextResponse.json(result)
        }

        return NextResponse.json(result, { status: 400 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
