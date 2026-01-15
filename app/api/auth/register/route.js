import { NextResponse } from 'next/server'
import AuthController from '@/controllers/authController'

export async function POST(request) {
    try {
        const body = await request.json()
        const result = await AuthController.register(body)

        if (result.success) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json(result, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
