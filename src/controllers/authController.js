/**
 * Auth Controller
 * Lógica de negócio para autenticação
 */

import User from '@/models/User'

export class AuthController {
    /**
     * Regista um novo utilizador
     */
    static async register({ email, password, username }) {
        try {
            // Validações
            if (!User.isValidEmail(email)) {
                return {
                    success: false,
                    error: 'Email inválido'
                }
            }

            if (!User.isValidUsername(username)) {
                return {
                    success: false,
                    error: 'Username inválido. Use 3-20 caracteres (letras, números e _)'
                }
            }

            if (!password || password.length < 6) {
                return {
                    success: false,
                    error: 'Password deve ter pelo menos 6 caracteres'
                }
            }

            // TODO: Integrar com Firebase Auth
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // const user = userCredential.user

            // Mock: Criar utilizador temporário
            const newUser = new User({
                uid: 'user_' + Date.now(),
                email,
                username,
                displayName: username,
                isPremium: false,
                messageCount: 0
            })

            // TODO: Salvar no Firestore
            // await setDoc(doc(db, 'users', newUser.uid), newUser.toJSON())

            return {
                success: true,
                user: newUser.toJSON()
            }
        } catch (error) {
            console.error('Erro ao registar:', error)
            return {
                success: false,
                error: error.message || 'Erro ao criar conta'
            }
        }
    }

    /**
     * Faz login com email e password
     */
    static async login({ email, password }) {
        try {
            // Validações
            if (!User.isValidEmail(email)) {
                return {
                    success: false,
                    error: 'Email inválido'
                }
            }

            if (!password) {
                return {
                    success: false,
                    error: 'Password é obrigatória'
                }
            }

            // TODO: Integrar com Firebase Auth
            // const userCredential = await signInWithEmailAndPassword(auth, email, password)
            // const user = userCredential.user

            // TODO: Buscar dados do utilizador no Firestore
            // const userDoc = await getDoc(doc(db, 'users', user.uid))
            // const userData = User.fromFirestore(userDoc)

            // Mock: Retornar utilizador temporário
            const mockUser = new User({
                uid: 'user_mock',
                email,
                username: 'utilizador',
                displayName: 'Utilizador',
                isPremium: false,
                messageCount: 2
            })

            return {
                success: true,
                user: mockUser.toJSON()
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            return {
                success: false,
                error: 'Email ou password incorretos'
            }
        }
    }

    /**
     * Faz login com Google
     */
    static async loginWithGoogle() {
        try {
            // TODO: Integrar com Firebase Auth
            // const provider = new GoogleAuthProvider()
            // const result = await signInWithPopup(auth, provider)
            // const user = result.user

            // TODO: Verificar se utilizador já existe no Firestore
            // Se não existir, criar novo registo

            // Mock: Retornar utilizador temporário
            const mockUser = new User({
                uid: 'user_google_mock',
                email: 'user@gmail.com',
                username: 'utilizador_google',
                displayName: 'Utilizador Google',
                isPremium: false,
                messageCount: 0
            })

            return {
                success: true,
                user: mockUser.toJSON()
            }
        } catch (error) {
            console.error('Erro ao fazer login com Google:', error)
            return {
                success: false,
                error: 'Erro ao fazer login com Google'
            }
        }
    }

    /**
     * Faz logout
     */
    static async logout() {
        try {
            // TODO: Integrar com Firebase Auth
            // await signOut(auth)

            return {
                success: true
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
            return {
                success: false,
                error: 'Erro ao fazer logout'
            }
        }
    }

    /**
     * Obtém o utilizador atual
     */
    static async getCurrentUser() {
        try {
            // TODO: Integrar com Firebase Auth
            // const user = auth.currentUser
            // if (!user) return null

            // TODO: Buscar dados do Firestore
            // const userDoc = await getDoc(doc(db, 'users', user.uid))
            // return User.fromFirestore(userDoc)

            // Mock: Retornar null (não autenticado)
            return null
        } catch (error) {
            console.error('Erro ao obter utilizador:', error)
            return null
        }
    }
}

export default AuthController
