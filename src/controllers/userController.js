/**
 * User Controller
 * Lógica de negócio para utilizadores
 */

import User from '@/models/User'

export class UserController {
    /**
     * Busca utilizador por username
     */
    static async getUserByUsername(username) {
        try {
            // TODO: Buscar no Firestore
            // const usersRef = collection(db, 'users')
            // const q = query(usersRef, where('username', '==', username))
            // const querySnapshot = await getDocs(q)

            // if (querySnapshot.empty) {
            //   return { success: false, error: 'Utilizador não encontrado' }
            // }

            // const user = User.fromFirestore(querySnapshot.docs[0])

            // Mock: Retornar utilizador de exemplo
            const mockUser = new User({
                uid: 'user_' + username,
                username: username,
                displayName: username,
                isPremium: false,
                messageCount: 0
            })

            return {
                success: true,
                user: mockUser.toJSON()
            }
        } catch (error) {
            console.error('Erro ao buscar utilizador:', error)
            return {
                success: false,
                error: 'Utilizador não encontrado'
            }
        }
    }

    /**
     * Busca utilizador por ID
     */
    static async getUserById(userId) {
        try {
            // TODO: Buscar no Firestore
            // const userDoc = await getDoc(doc(db, 'users', userId))
            // if (!userDoc.exists()) {
            //   return { success: false, error: 'Utilizador não encontrado' }
            // }

            // const user = User.fromFirestore(userDoc)

            // Mock: Retornar utilizador de exemplo
            const mockUser = new User({
                uid: userId,
                username: 'utilizador',
                displayName: 'Utilizador',
                email: 'user@example.com',
                isPremium: false,
                messageCount: 2
            })

            return {
                success: true,
                user: mockUser.toJSON()
            }
        } catch (error) {
            console.error('Erro ao buscar utilizador:', error)
            return {
                success: false,
                error: 'Utilizador não encontrado'
            }
        }
    }

    /**
     * Atualiza perfil do utilizador
     */
    static async updateProfile(userId, updates) {
        try {
            // Validar username se estiver sendo atualizado
            if (updates.username && !User.isValidUsername(updates.username)) {
                return {
                    success: false,
                    error: 'Username inválido'
                }
            }

            // Validar email se estiver sendo atualizado
            if (updates.email && !User.isValidEmail(updates.email)) {
                return {
                    success: false,
                    error: 'Email inválido'
                }
            }

            // TODO: Atualizar no Firestore
            // await updateDoc(doc(db, 'users', userId), {
            //   ...updates,
            //   updatedAt: new Date().toISOString()
            // })

            return {
                success: true
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error)
            return {
                success: false,
                error: 'Erro ao atualizar perfil'
            }
        }
    }

    /**
     * Verifica se username está disponível
     */
    static async isUsernameAvailable(username) {
        try {
            // Validar formato
            if (!User.isValidUsername(username)) {
                return false
            }

            // TODO: Verificar no Firestore
            // const usersRef = collection(db, 'users')
            // const q = query(usersRef, where('username', '==', username))
            // const querySnapshot = await getDocs(q)

            // return querySnapshot.empty

            // Mock: Sempre disponível
            return true
        } catch (error) {
            console.error('Erro ao verificar username:', error)
            return false
        }
    }

    /**
     * Incrementa contador de mensagens
     */
    static async incrementMessageCount(userId) {
        try {
            // TODO: Incrementar no Firestore
            // const userRef = doc(db, 'users', userId)
            // await updateDoc(userRef, {
            //   messageCount: increment(1),
            //   updatedAt: new Date().toISOString()
            // })

            return {
                success: true
            }
        } catch (error) {
            console.error('Erro ao incrementar contador:', error)
            return {
                success: false,
                error: 'Erro ao atualizar contador'
            }
        }
    }
}

export default UserController
