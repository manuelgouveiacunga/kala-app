/**
 * User Model
 * Estrutura de dados e validações para utilizadores
 */

export class User {
    constructor(data = {}) {
        this.uid = data.uid || null
        this.email = data.email || ''
        this.username = data.username || ''
        this.displayName = data.displayName || ''
        this.isPremium = data.isPremium || false
        this.messageCount = data.messageCount || 0
        this.createdAt = data.createdAt || new Date().toISOString()
        this.updatedAt = data.updatedAt || new Date().toISOString()
    }

    /**
     * Valida se o username é válido
     */
    static isValidUsername(username) {
        if (!username || typeof username !== 'string') return false

        // Username deve ter entre 3 e 20 caracteres
        if (username.length < 3 || username.length > 20) return false

        // Apenas letras, números e underscore
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        return usernameRegex.test(username)
    }

    /**
     * Valida se o email é válido
     */
    static isValidEmail(email) {
        if (!email || typeof email !== 'string') return false

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    /**
     * Verifica se o utilizador atingiu o limite de mensagens
     */
    hasReachedMessageLimit() {
        if (this.isPremium) return false
        return this.messageCount >= 80
    }

    /**
     * Incrementa o contador de mensagens
     */
    incrementMessageCount() {
        this.messageCount += 1
        this.updatedAt = new Date().toISOString()
    }

    /**
     * Atualiza para premium
     */
    upgradeToPremium() {
        this.isPremium = true
        this.updatedAt = new Date().toISOString()
    }

    /**
     * Converte para objeto simples (para armazenamento)
     */
    toJSON() {
        return {
            uid: this.uid,
            email: this.email,
            username: this.username,
            displayName: this.displayName,
            isPremium: this.isPremium,
            messageCount: this.messageCount,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    /**
     * Cria instância a partir de dados do Firestore
     */
    static fromFirestore(doc) {
        if (!doc.exists()) return null
        return new User({ uid: doc.id, ...doc.data() })
    }
}

export default User
