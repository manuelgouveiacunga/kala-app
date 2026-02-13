import { apiRequest } from '@/services/api/http'

export const messageApi = {
    send(payload) {
        return apiRequest('/api/messages/send', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    },

    listByUser(userId) {
        return apiRequest(`/api/messages/list/${encodeURIComponent(userId)}`)
    },

    markAsRead(messageId) {
        return apiRequest(`/api/messages/read/${encodeURIComponent(messageId)}`, {
            method: 'POST'
        })
    }
}

export default messageApi
