import User from '@/models/User'
import { db } from '@/services/firebase'
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

export class UserController {

    static async getUserByUsername(username) {
        try {
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('username', '==', username))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                return {
                    success: false,
                    error: 'Utilizador não encontrado'
                }
            }

            const userDoc = querySnapshot.docs[0]
            const user = User.fromFirestore(userDoc)

            return {
                success: true,
                user: user.toJSON()
            }
        } catch (error) {
            console.error('Erro ao buscar utilizador:', error)
            return {
                success: false,
                error: 'Erro ao buscar utilizador'
            }
        }
    }

    static async getUserById(userId) {
        try {
            const userDocRef = doc(db, 'users', userId)
            const userDoc = await getDoc(userDocRef)

            if (!userDoc.exists()) {
                return {
                    success: false,
                    error: 'Utilizador não encontrado'
                }
            }

            const user = User.fromFirestore(userDoc)

            return {
                success: true,
                user: user.toJSON()
            }
        } catch (error) {
            console.error('Erro ao buscar utilizador:', error)
            return {
                success: false,
                error: 'Erro ao buscar utilizador'
            }
        }
    }


    static async updateProfile(userId, updates) {
        try {
            if (updates.username && !User.isValidUsername(updates.username)) {
                return {
                    success: false,
                    error: 'Username inválido'
                }
            }


            if (updates.email && !User.isValidEmail(updates.email)) {
                return {
                    success: false,
                    error: 'Email inválido'
                }
            }

            // Verificar se username já existe (se estiver a ser atualizado)
            if (updates.username) {
                const isAvailable = await this.isUsernameAvailable(updates.username)
                if (!isAvailable) {

                    // Verificar se é o próprio utilizador (ex: atualizando outra info mas mantendo username)
                    const currentUser = await this.getUserById(userId)
                    if (currentUser.success && currentUser.user.username !== updates.username) {
                        return {
                            success: false,
                            error: 'Username já está em uso'
                        }
                    }
                }
            }

            const userRef = doc(db, 'users', userId)
            await updateDoc(userRef, {
                ...updates,
                updatedAt: new Date().toISOString()
            })

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

    static async isUsernameAvailable(username) {
        try {

            if (!User.isValidUsername(username)) {
                return false
            }

            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('username', '==', username))
            const querySnapshot = await getDocs(q)

            return querySnapshot.empty
        } catch (error) {
            console.error('Erro ao verificar username:', error)
            return false
        }
    }

    /**
     * Gera um novo link para o utilizador com validade de 48h
     */
    static async generateLink(userId) {
        try {
            const token = uuidv4()
            // 48 horas a partir de agora
            const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()

            const linkConfig = {
                token,
                expiresAt,
                createdAt: new Date().toISOString()
            }

            const userRef = doc(db, 'users', userId)
            await updateDoc(userRef, {
                linkConfig,
                updatedAt: new Date().toISOString()
            })

            return {
                success: true,
                linkConfig
            }
        } catch (error) {
            console.error('Erro ao gerar link:', error)
            return {
                success: false,
                error: 'Erro ao gerar link'
            }
        }
    }

    static async incrementMessageCount(userId) {
        try {
            // Nota: Esta função é redundante se já usamos updateDoc com increment no messageController,
            // mas mantemos para compatibilidade se necessário.
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
