import { NextResponse } from 'next/server'
import UserController from '@/controllers/userController'

export async function GET(request, { params }) {
    try {
        const { userId } = params
        const result = await UserController.getUserById(userId)

        if (result.success) {
            return NextResponse.json(result)
        }

        return NextResponse.json(result, { status: 404 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
