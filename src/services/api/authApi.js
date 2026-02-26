import { apiRequest } from '@/services/api/http'

export const authApi = {
    login(payload) {
        return apiRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    },

    register(payload) {
        return apiRequest('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    },

    logout() {
        return apiRequest('/api/auth/logout', {
            method: 'POST'
        })
    }
}

export default authApi
