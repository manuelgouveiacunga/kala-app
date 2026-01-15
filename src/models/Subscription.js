/**
 * Subscription Model
 * Estrutura de dados para assinaturas premium
 */

export class Subscription {
    constructor(data = {}) {
        this.id = data.id || null
        this.userId = data.userId || ''
        this.status = data.status || 'inactive' // 'active', 'inactive', 'cancelled', 'expired'
        this.plan = data.plan || 'free' // 'free', 'premium'
        this.price = data.price || 0 // Em Kz
        this.startDate = data.startDate || null
        this.endDate = data.endDate || null
        this.paymentMethod = data.paymentMethod || '' // 'multicaixa', 'unitel_money', 'appypay'
        this.transactionId = data.transactionId || ''
        this.createdAt = data.createdAt || new Date().toISOString()
        this.updatedAt = data.updatedAt || new Date().toISOString()
    }

    /**
     * Preço do plano premium em Kz
     */
    static PREMIUM_PRICE = 3000

    /**
     * Verifica se a assinatura está ativa
     */
    isActive() {
        if (this.status !== 'active') return false
        if (!this.endDate) return false

        const now = new Date()
        const end = new Date(this.endDate)

        return now < end
    }

    /**
     * Verifica se a assinatura expirou
     */
    isExpired() {
        if (!this.endDate) return false

        const now = new Date()
        const end = new Date(this.endDate)

        return now >= end
    }

    /**
     * Ativa a assinatura premium
     */
    activate(transactionId, paymentMethod = 'appypay') {
        this.status = 'active'
        this.plan = 'premium'
        this.price = Subscription.PREMIUM_PRICE
        this.startDate = new Date().toISOString()

        // Premium válido por 30 dias
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 30)
        this.endDate = endDate.toISOString()

        this.transactionId = transactionId
        this.paymentMethod = paymentMethod
        this.updatedAt = new Date().toISOString()
    }

    /**
     * Cancela a assinatura
     */
    cancel() {
        this.status = 'cancelled'
        this.updatedAt = new Date().toISOString()
    }

    /**
     * Renova a assinatura
     */
    renew(transactionId) {
        this.status = 'active'
        this.startDate = new Date().toISOString()

        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 30)
        this.endDate = endDate.toISOString()

        this.transactionId = transactionId
        this.updatedAt = new Date().toISOString()
    }

    /**
     * Retorna dias restantes da assinatura
     */
    getDaysRemaining() {
        if (!this.isActive()) return 0

        const now = new Date()
        const end = new Date(this.endDate)
        const diffMs = end - now
        const diffDays = Math.ceil(diffMs / 86400000)

        return Math.max(0, diffDays)
    }

    /**
     * Converte para objeto simples (para armazenamento)
     */
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            status: this.status,
            plan: this.plan,
            price: this.price,
            startDate: this.startDate,
            endDate: this.endDate,
            paymentMethod: this.paymentMethod,
            transactionId: this.transactionId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    /**
     * Cria instância a partir de dados do Firestore
     */
    static fromFirestore(doc) {
        if (!doc.exists()) return null
        return new Subscription({ id: doc.id, ...doc.data() })
    }
}

export default Subscription
