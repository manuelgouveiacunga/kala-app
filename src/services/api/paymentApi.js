import { apiRequest } from '@/services/api/http'

export const paymentApi = {
    createPayment(userId) {
        return apiRequest('/api/payments/create', {
            method: 'POST',
            body: JSON.stringify({ userId })
        })
    }
}

export default paymentApi
