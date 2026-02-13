import { apiRequest } from '@/services/api/http'

export const userApi = {
    getByUsername(username) {
        return apiRequest(`/api/users/${encodeURIComponent(username)}`)
    },

    getById(userId) {
        return apiRequest(`/api/users/id/${encodeURIComponent(userId)}`)
    },

    updateProfile(payload) {
        return apiRequest('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify(payload)
        })
    },

    generateLink(userId) {
        return apiRequest('/api/users/link', {
            method: 'POST',
            body: JSON.stringify({ userId })
        })
    }
}

export default userApi
