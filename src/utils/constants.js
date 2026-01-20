export const LIMITS = {
    FREE_MESSAGES: 80,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 500,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 20,
    PASSWORD_MIN_LENGTH: 6
}


export const PRICING = {
    PREMIUM_MONTHLY: 3000, 
    CURRENCY: 'AOA'
}

export const PLANS = {
    FREE: 'free',
    PREMIUM: 'premium'
}

export const SUBSCRIPTION_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired'
}

export const PAYMENT_METHODS = {
    MULTICAIXA: 'multicaixa',
    UNITEL_MONEY: 'unitel_money',
    APPYPAY: 'appypay'
}

export const ROUTES = {
    HOME: '/',
    LOGIN: '/auth/login',
    DASHBOARD: '/dashboard',
    PREMIUM: '/premium',
    ACCOUNT: '/conta',
    SEND_MESSAGE: (username) => `/m/${username}`
}

export const API_ENDPOINTS = {
    
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
 
    SEND_MESSAGE: '/api/messages/send',
    LIST_MESSAGES: (userId) => `/api/messages/list/${userId}`,
    READ_MESSAGE: (messageId) => `/api/messages/read/${messageId}`,
    GET_USER: (username) => `/api/users/${username}`,
    UPDATE_PROFILE: '/api/users/profile',
    CREATE_PAYMENT: '/api/payments/create',
    PAYMENT_CALLBACK: '/api/payments/callback'
}

export const ERROR_MESSAGES = {
    INVALID_EMAIL: 'Email inválido',
    INVALID_USERNAME: 'Username inválido. Use 3-20 caracteres (letras, números e _)',
    INVALID_PASSWORD: 'Password deve ter pelo menos 6 caracteres',
    INVALID_MESSAGE: 'Mensagem inválida. Deve ter entre 10 e 500 caracteres',
    MESSAGE_LIMIT_REACHED: 'Atingiu o limite de mensagens. Faça upgrade para Premium!',
    USER_NOT_FOUND: 'Utilizador não encontrado',
    NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
    GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.'
}

export const SUCCESS_MESSAGES = {
    MESSAGE_SENT: 'Mensagem enviada com sucesso! 🎉',
    ACCOUNT_CREATED: 'Conta criada com sucesso!',
    LOGIN_SUCCESS: 'Login efetuado com sucesso!',
    PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
    PAYMENT_SUCCESS: 'Pagamento efetuado com sucesso! Bem-vindo ao Premium!'
}

export const LOCALE = {
    LANGUAGE: 'pt-AO',
    TIMEZONE: 'Africa/Luanda',
    CURRENCY_SYMBOL: 'Kz'
}

export default {
    LIMITS,
    PRICING,
    PLANS,
    SUBSCRIPTION_STATUS,
    PAYMENT_METHODS,
    ROUTES,
    API_ENDPOINTS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    LOCALE
}
