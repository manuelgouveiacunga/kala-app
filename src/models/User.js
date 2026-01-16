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
        this.linkConfig = data.linkConfig || {
            token: null,
            expiresAt: null,
            createdAt: null
        }
    }

    static isValidUsername(username) {
        if (!username || typeof username !== 'string') return false

        if (username.length < 3 || username.length > 20) return false

        
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        return usernameRegex.test(username)
    }

    static isValidEmail(email) {
        if (!email || typeof email !== 'string') return false

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    
    hasReachedMessageLimit() {
        if (this.isPremium) return false
        return this.messageCount >= 80
    }
    
    incrementMessageCount() {
        this.messageCount += 1
        this.updatedAt = new Date().toISOString()
    }

    upgradeToPremium() {
        this.isPremium = true
        this.updatedAt = new Date().toISOString()
    }

    toJSON() {
        return {
            uid: this.uid,
            email: this.email,
            username: this.username,
            displayName: this.displayName,
            isPremium: this.isPremium,
            messageCount: this.messageCount,
            createdAt: this.createdAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            linkConfig: this.linkConfig
        }
    }

    static fromFirestore(doc) {
        if (!doc.exists()) return null
        return new User({ uid: doc.id, ...doc.data() })
    }

    hasActiveLink(token = null) {
        if (!this.linkConfig || !this.linkConfig.token || !this.linkConfig.expiresAt) {
            return false
        }

        const now = new Date().getTime()
        const expiresAt = new Date(this.linkConfig.expiresAt).getTime()
        const isActive = now < expiresAt

        if (token) {
            return isActive && this.linkConfig.token === token
        }

        return isActive
    }

    getLinkTimeRemaining() {
        if (!this.hasActiveLink()) return 0
        const now = new Date().getTime()
        const expiresAt = new Date(this.linkConfig.expiresAt).getTime()
        return Math.max(0, expiresAt - now)
    }
}

export default User
