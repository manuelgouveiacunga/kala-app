/**
 * AppyPay Service
 * Integração com gateway de pagamento AppyPay
 * 
 * NOTA: Este arquivo está preparado para integração futura.
 * Adicione as credenciais no arquivo .env quando estiver pronto.
 */

const appyPayConfig = {
    apiKey: process.env.APPYPAY_API_KEY || '',
    merchantId: process.env.APPYPAY_MERCHANT_ID || '',
    baseUrl: process.env.APPYPAY_BASE_URL || 'https://api.appypay.ao/v1'
}

// Verificar se as credenciais estão configuradas
const isConfigured = () => {
    return appyPayConfig.apiKey && appyPayConfig.merchantId
}

/**
 * Cria uma transação de pagamento
 */
export const createTransaction = async ({ amount, currency = 'AOA', description, userId, callbackUrl }) => {
    if (!isConfigured()) {
        console.warn('AppyPay não está configurado. Usando modo mock.')
        return {
            success: true,
            transactionId: 'mock_txn_' + Date.now(),
            paymentUrl: '/premium?mock=true',
            status: 'pending'
        }
    }

    try {
        // TODO: Implementar chamada real à API AppyPay
        // const response = await fetch(`${appyPayConfig.baseUrl}/transactions`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${appyPayConfig.apiKey}`,
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     merchant_id: appyPayConfig.merchantId,
        //     amount,
        //     currency,
        //     description,
        //     metadata: { userId },
        //     callback_url: callbackUrl
        //   })
        // })

        // const data = await response.json()
        // return {
        //   success: true,
        //   transactionId: data.transaction_id,
        //   paymentUrl: data.payment_url,
        //   status: data.status
        // }

        // Mock response
        return {
            success: true,
            transactionId: 'mock_txn_' + Date.now(),
            paymentUrl: '/premium?mock=true',
            status: 'pending'
        }
    } catch (error) {
        console.error('Erro ao criar transação AppyPay:', error)
        return {
            success: false,
            error: error.message || 'Erro ao criar transação'
        }
    }
}

/**
 * Verifica o status de uma transação
 */
export const getTransactionStatus = async (transactionId) => {
    if (!isConfigured()) {
        console.warn('AppyPay não está configurado. Usando modo mock.')
        return {
            success: true,
            status: 'completed',
            transactionId
        }
    }

    try {
        // TODO: Implementar chamada real à API AppyPay
        // const response = await fetch(`${appyPayConfig.baseUrl}/transactions/${transactionId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${appyPayConfig.apiKey}`
        //   }
        // })

        // const data = await response.json()
        // return {
        //   success: true,
        //   status: data.status,
        //   transactionId: data.transaction_id,
        //   amount: data.amount,
        //   currency: data.currency
        // }

        // Mock response
        return {
            success: true,
            status: 'completed',
            transactionId,
            amount: 3000,
            currency: 'AOA'
        }
    } catch (error) {
        console.error('Erro ao verificar status da transação:', error)
        return {
            success: false,
            error: error.message || 'Erro ao verificar transação'
        }
    }
}

/**
 * Valida callback de pagamento
 */
export const validateCallback = async (signature, payload) => {
    if (!isConfigured()) {
        console.warn('AppyPay não está configurado. Usando modo mock.')
        return true
    }

    try {
        // TODO: Implementar validação de assinatura
        // const crypto = require('crypto')
        // const hash = crypto
        //   .createHmac('sha256', appyPayConfig.apiKey)
        //   .update(JSON.stringify(payload))
        //   .digest('hex')

        // return hash === signature

        // Mock: sempre válido
        return true
    } catch (error) {
        console.error('Erro ao validar callback:', error)
        return false
    }
}

export const isAppyPayConfigured = isConfigured

/**
 * Instruções para configurar AppyPay:
 * 
 * 1. Criar conta em https://www.appypay.ao/
 * 2. Obter credenciais de API (API Key e Merchant ID)
 * 3. Adicionar ao .env:
 * 
 *    APPYPAY_API_KEY=sua_chave_api
 *    APPYPAY_MERCHANT_ID=seu_merchant_id
 *    APPYPAY_BASE_URL=https://api.appypay.ao/v1
 * 
 * 4. Configurar webhook/callback URL no painel AppyPay:
 *    https://seu-dominio.com/api/payments/callback
 * 
 * 5. Testar em ambiente sandbox antes de produção
 */

export default {
    createTransaction,
    getTransactionStatus,
    validateCallback,
    isConfigured: isAppyPayConfigured
}
