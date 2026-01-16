export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const isValidUsername = (username) => {
    if (!username || typeof username !== 'string') return false
    if (username.length < 3 || username.length > 20) return false
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    return usernameRegex.test(username)
}

export const isValidPassword = (password) => {
    if (!password || typeof password !== 'string') return false
    return password.length >= 6
}

export const isValidMessage = (message) => {
    if (!message || typeof message !== 'string') return false
    const trimmed = message.trim()
    return trimmed.length >= 10 && trimmed.length <= 500
}

export const sanitizeText = (text) => {
    if (!text) return ''
    return text
        .trim()
        .replace(/[<>]/g, '') 
        .substring(0, 500) 
}

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
