import Message from '@/models/Message'
import User from '@/models/User'
import { db } from '@/services/firebase'
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    orderBy,
    getDoc,
    increment,
    serverTimestamp
} from 'firebase/firestore'

export class MessageController {
    
    static async sendMessage({ username, text }) {
        try {
            
            if (!Message.isValid(text)) {
                return {
                    success: false,
                    error: 'Mensagem inválida. Deve ter entre 10 e 500 caracteres.'
                }
            }
            
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('username', '==', username))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                return {
                    success: false,
                    error: 'Utilizador não encontrado'
                }
            }

            const recipientDoc = querySnapshot.docs[0]
            const recipientUser = User.fromFirestore(recipientDoc)
            const recipientUserId = recipientDoc.id

            
            if (recipientUser.hasReachedMessageLimit()) {
                return {
                    success: false,
                    error: 'A caixa de entrada deste utilizador está cheia.'
                }
            }

            
            const messageData = {
                userId: recipientUserId,
                text: text.trim(),
                timestamp: new Date().toISOString(), 
                createdAt: serverTimestamp(), 
                read: false
            }

            
            const messageRef = await addDoc(collection(db, 'messages'), messageData)

            
            await updateDoc(doc(db, 'users', recipientUserId), {
                messageCount: increment(1),
                updatedAt: new Date().toISOString()
            })

            return {
                success: true,
                messageId: messageRef.id
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error)
            return {
                success: false,
                error: 'Erro ao enviar mensagem'
            }
        }
    }

    static async listMessages(userId) {
        try {
            const messagesRef = collection(db, 'messages')
            const q = query(
                messagesRef,
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            const messages = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return new Message({
                    id: doc.id,
                    ...data,
                    
                })
            })

            return {
                success: true,
                messages: messages.map(m => m.toJSON())
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

    static async markAsRead(messageId) {
        try {
            await updateDoc(doc(db, 'messages', messageId), {
                read: true
            })

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

    static async deleteMessage(messageId, userId) {
        try {
            const messageDocRef = doc(db, 'messages', messageId)
            const messageDoc = await getDoc(messageDocRef)

            if (!messageDoc.exists()) {
                return { success: false, error: 'Mensagem não encontrada' }
            }

            if (messageDoc.data().userId !== userId) {
                return { success: false, error: 'Sem permissão para apagar esta mensagem' }
            }
            await deleteDoc(messageDocRef)
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

    static async countUnread(userId) {
        try {
            const messagesRef = collection(db, 'messages')
            const q = query(
                messagesRef,
                where('userId', '==', userId),
                where('read', '==', false)
            )
            const querySnapshot = await getDocs(q)
            return querySnapshot.size
        } catch (error) {
            console.error('Erro ao contar mensagens não lidas:', error)
            return 0
        }
    }
}

export default MessageController
