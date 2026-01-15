import { NextResponse } from 'next/server'
import UserController from '@/controllers/userController'

export async function PUT(request) {
    try {
        const body = await request.json()
        const { userId, ...updates } = body

        if (!userId) {
            return NextResponse.json({ success: false, error: 'UserId obrigatório' }, { status: 400 })
        }

        const result = await UserController.updateProfile(userId, updates)

        if (result.success) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json(result, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
