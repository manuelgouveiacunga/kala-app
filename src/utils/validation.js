/**
 * Validation Utilities
 * Funções auxiliares para validação de dados
 */

/**
 * Valida formato de email
 */
export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Valida formato de username
 */
export const isValidUsername = (username) => {
    if (!username || typeof username !== 'string') return false
    if (username.length < 3 || username.length > 20) return false
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    return usernameRegex.test(username)
}

/**
 * Valida comprimento de password
 */
export const isValidPassword = (password) => {
    if (!password || typeof password !== 'string') return false
    return password.length >= 6
}

/**
 * Valida comprimento de mensagem
 */
export const isValidMessage = (message) => {
    if (!message || typeof message !== 'string') return false
    const trimmed = message.trim()
    return trimmed.length >= 10 && trimmed.length <= 500
}

/**
 * Sanitiza texto removendo caracteres perigosos
 */
export const sanitizeText = (text) => {
    if (!text) return ''
    return text
        .trim()
        .replace(/[<>]/g, '') // Remove < e >
        .substring(0, 500) // Limita comprimento
}

/**
 * Valida URL
 */
export const isValidUrl = (url) => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export default {
    isValidEmail,
    isValidUsername,
    isValidPassword,
    isValidMessage,
    sanitizeText,
    isValidUrl
}
