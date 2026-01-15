import { NextResponse } from 'next/server'
import PaymentController from '@/controllers/paymentController'

export async function POST(request) {
    try {
        const body = await request.json()
        const { transactionId, status } = body

        const result = await PaymentController.processPaymentCallback(transactionId, status)

        if (result.success) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json(result, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
    }
}
