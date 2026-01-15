import { NextResponse } from 'next/server'
import PaymentController from '@/controllers/paymentController'

export async function POST(request) {
    try {
        const body = await request.json()
        const { userId } = body

        if (!userId) {
            return NextResponse.json({ success: false, error: 'UserId obrigatório' }, { status: 400 })
        }

        const result = await PaymentController.createPayment(userId)

        if (result.success) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json(result, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
