async function parseJson(response) {
    const text = await response.text()
    if (!text) return {}

    try {
        return JSON.parse(text)
    } catch {
        return { success: false, error: 'Resposta inv\u00e1lida do servidor' }
    }
}

export async function apiRequest(path, options = {}) {
    const response = await fetch(path, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        ...options
    })

    const data = await parseJson(response)

    if (!response.ok) {
        return {
            success: false,
            error: data.error || `Erro HTTP ${response.status}`
        }
    }

    return data
}
