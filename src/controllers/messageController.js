/**
 * Message Controller
 * Lógica de negócio para mensagens
 */

import Message from '@/models/Message'
import User from '@/models/User'

export class MessageController {
    /**
     * Envia uma mensagem anónima
     */
    static async sendMessage({ username, text }) {
        try {
            // Validar mensagem
            if (!Message.isValid(text)) {
                return {
                    success: false,
                    error: 'Mensagem inválida. Deve ter entre 10 e 500 caracteres.'
                }
            }

            // TODO: Buscar utilizador pelo username no Firestore
            // const usersRef = collection(db, 'users')
            // const q = query(usersRef, where('username', '==', username))
            // const querySnapshot = await getDocs(q)

            // if (querySnapshot.empty) {
            //   return { success: false, error: 'Utilizador não encontrado' }
            // }

            // const recipientUser = User.fromFirestore(querySnapshot.docs[0])

            // Mock: Simular utilizador destinatário
            const recipientUserId = 'user_' + username

            // Verificar se utilizador atingiu limite (se não for premium)
            // TODO: Implementar verificação real
            // if (recipientUser.hasReachedMessageLimit()) {
            //   return { success: false, error: 'Utilizador atingiu o limite de mensagens' }
            // }

            // Criar mensagem
            const message = new Message({
                userId: recipientUserId,
                text: text.trim(),
                timestamp: new Date().toISOString(),
                read: false
            })

            // TODO: Salvar mensagem no Firestore
            // const messageRef = await addDoc(collection(db, 'messages'), message.toJSON())
            // message.id = messageRef.id

            // TODO: Incrementar contador de mensagens do utilizador
            // recipientUser.incrementMessageCount()
            // await updateDoc(doc(db, 'users', recipientUser.uid), {
            //   messageCount: recipientUser.messageCount
            // })

            // Mock: Simular ID da mensagem
            message.id = 'msg_' + Date.now()

            return {
                success: true,
                messageId: message.id
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error)
            return {
                success: false,
                error: 'Erro ao enviar mensagem'
            }
        }
    }

    /**
     * Lista mensagens de um utilizador
     */
    static async listMessages(userId) {
        try {
            // TODO: Buscar mensagens do Firestore
            // const messagesRef = collection(db, 'messages')
            // const q = query(
            //   messagesRef, 
            //   where('userId', '==', userId),
            //   orderBy('timestamp', 'desc')
            // )
            // const querySnapshot = await getDocs(q)

            // const messages = querySnapshot.docs.map(doc => 
            //   Message.fromFirestore(doc)
            // )

            // Mock: Retornar mensagens de exemplo
            const mockMessages = [
                new Message({
                    id: '1',
                    userId: userId,
                    text: 'És uma pessoa incrível!',
                    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                    read: false
                }),
                new Message({
                    id: '2',
                    userId: userId,
                    text: 'Admiro muito a tua dedicação',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                    read: false
                })
            ]

            return {
                success: true,
                messages: mockMessages.map(m => m.toJSON())
            }
        } catch (error) {
            console.error('Erro ao listar mensagens:', error)
            return {
                success: false,
                error: 'Erro ao carregar mensagens',
                messages: []
            }
        }
    }

    /**
     * Marca uma mensagem como lida
     */
    static async markAsRead(messageId) {
        try {
            // TODO: Atualizar mensagem no Firestore
            // await updateDoc(doc(db, 'messages', messageId), {
            //   read: true
            // })

            return {
                success: true
            }
        } catch (error) {
            console.error('Erro ao marcar mensagem como lida:', error)
            return {
                success: false,
                error: 'Erro ao marcar mensagem como lida'
            }
        }
    }

    /**
     * Elimina uma mensagem
     */
    static async deleteMessage(messageId, userId) {
        try {
            // TODO: Verificar se a mensagem pertence ao utilizador
            // const messageDoc = await getDoc(doc(db, 'messages', messageId))
            // if (!messageDoc.exists() || messageDoc.data().userId !== userId) {
            //   return { success: false, error: 'Mensagem não encontrada' }
            // }

            // TODO: Eliminar mensagem do Firestore
            // await deleteDoc(doc(db, 'messages', messageId))

            return {
                success: true
            }
        } catch (error) {
            console.error('Erro ao eliminar mensagem:', error)
            return {
                success: false,
                error: 'Erro ao eliminar mensagem'
            }
        }
    }

    /**
     * Conta mensagens não lidas
     */
    static async countUnread(userId) {
        try {
            // TODO: Contar mensagens não lidas no Firestore
            // const messagesRef = collection(db, 'messages')
            // const q = query(
            //   messagesRef,
            //   where('userId', '==', userId),
            //   where('read', '==', false)
            // )
            // const querySnapshot = await getDocs(q)
            // return querySnapshot.size

            // Mock: Retornar contagem de exemplo
            return 2
        } catch (error) {
            console.error('Erro ao contar mensagens não lidas:', error)
            return 0
        }
    }
}

export default MessageController
