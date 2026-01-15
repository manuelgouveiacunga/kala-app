/**
 * Message Model
 * Estrutura de dados e validações para mensagens anónimas
 */

export class Message {
    constructor(data = {}) {
        this.id = data.id || null
        this.userId = data.userId || '' // ID do destinatário
        this.text = data.text || ''
        this.timestamp = data.timestamp || new Date().toISOString()
        this.read = data.read || false
    }

    /**
     * Valida se a mensagem é válida
     */
    static isValid(text) {
        if (!text || typeof text !== 'string') return false

        const trimmedText = text.trim()

        // Mensagem deve ter entre 10 e 500 caracteres
        if (trimmedText.length < 10 || trimmedText.length > 500) return false

        return true
    }

    /**
     * Valida comprimento mínimo
     */
    static hasMinLength(text) {
        if (!text) return false
        return text.trim().length >= 10
    }

    /**
     * Valida comprimento máximo
     */
    static hasMaxLength(text) {
        if (!text) return false
        return text.trim().length <= 500
    }

    /**
     * Retorna o comprimento atual da mensagem
     */
    static getLength(text) {
        if (!text) return 0
        return text.trim().length
    }

    /**
     * Marca a mensagem como lida
     */
    markAsRead() {
        this.read = true
    }

    /**
     * Verifica se a mensagem foi lida
     */
    isRead() {
        return this.read === true
    }

    /**
     * Formata a data da mensagem
     */
    getFormattedDate() {
        const date = new Date(this.timestamp)
        const now = new Date()
        const diffMs = now - date
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Agora mesmo'
        if (diffMins < 60) return `Há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
        if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`
        if (diffDays < 7) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`

        return date.toLocaleDateString('pt-AO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    /**
     * Converte para objeto simples (para armazenamento)
     */
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            text: this.text,
            timestamp: this.timestamp,
            read: this.read
        }
    }

    /**
     * Cria instância a partir de dados do Firestore
     */
    static fromFirestore(doc) {
        if (!doc.exists()) return null
        return new Message({ id: doc.id, ...doc.data() })
    }
}

export default Message
