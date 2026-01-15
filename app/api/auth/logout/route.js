import { NextResponse } from 'next/server'
import AuthController from '@/controllers/authController'

export async function POST(request) {
    try {
        const result = await AuthController.logout()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
