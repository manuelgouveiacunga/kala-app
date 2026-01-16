import User from '@/models/User'
import {
    loginWithGoogle as googleLoginService,
    loginWithEmail as emailLoginService,
    registerWithEmail as emailRegisterService,
    logout as logoutService
} from '@/services/auth'
import {
    getDataByField,
} from '@/services/firestore'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'

export class AuthController {
    
    static async register({ email, password, username }) {
        try {

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
            
            const checkUsernamePromise = getDataByField('users', 'username', username);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout ao verificar username')), 5000)
            );

            try {
                const existingUsers = await Promise.race([checkUsernamePromise, timeoutPromise]);
                if (existingUsers && existingUsers.length > 0) {
                    return {
                        success: false,
                        error: 'Este nome de utilizador já está em uso.'
                    }
                }
            } catch (err) {
                console.error('Erro/Timeout ao verificar username:', err);
                
                
                return {
                    success: false,
                    error: 'Erro de conexão com o banco de dados. Verifique se o Firestore está habilitado.'
                }
            }
            
            const firebaseUser = await emailRegisterService(email, password)
            const newUser = new User({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                username,
                displayName: username, 
                isPremium: false,
                messageCount: 0
            })
            
            const saveProfilePromise = setDoc(doc(db, 'users', newUser.uid), newUser.toJSON());

            try {
                await Promise.race([
                    saveProfilePromise,
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout ao salvar perfil')), 5000)
                    )
                ]);
            } catch (firestoreError) {
                return {
                    success: true,
                    user: newUser.toJSON(),
                    warning: 'Conta criada, mas houve um erro ao salvar o perfil. Algumas funcionalidades podem falhar.'
                }
            }

            return {
                success: true,
                user: newUser.toJSON()
            }
        } catch (error) {
            console.error('Erro ao registar:', error)
            let errorMessage = 'Erro ao criar conta'
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este email já está registado.'
            }
            return {
                success: false,
                error: errorMessage
            }
        }
    }

    static async login({ email, password }) {
        try {
            
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
            
            const firebaseUser = await emailLoginService(email, password)
            const userDocRef = doc(db, 'users', firebaseUser.uid)
            const userDoc = await getDoc(userDocRef)

            if (!userDoc.exists()) {
                
                return {
                    success: false,
                    error: 'Perfil de utilizador não encontrado.'
                }
            }

            const userData = User.fromFirestore(userDoc)

            return {
                success: true,
                user: userData.toJSON()
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            let errorMessage = 'Email ou password incorretos'
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Credenciais inválidas.'
            }
            return {
                success: false,
                error: errorMessage
            }
        }
    }

    
    static async loginWithGoogle() {
        try {
            
            const firebaseUser = await googleLoginService()

            
            const userDocRef = doc(db, 'users', firebaseUser.uid)
            const userDoc = await getDoc(userDocRef)

            let userProfile;

            if (userDoc.exists()) {
                
                userProfile = User.fromFirestore(userDoc)
            } else {
                
                
                const baseUsername = firebaseUser.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '')
                const username = `${baseUsername}_${Math.floor(Math.random() * 1000)}`

                userProfile = new User({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    username: username,
                    displayName: firebaseUser.displayName || username,
                    isPremium: false,
                    messageCount: 0
                })

                await setDoc(doc(db, 'users', userProfile.uid), userProfile.toJSON())
            }

            return {
                success: true,
                user: userProfile.toJSON()
            }
        } catch (error) {
            console.error('Erro ao fazer login com Google:', error)
            return {
                success: false,
                error: 'Erro ao conectar com Google'
            }
        }
    }
    
    static async logout() {
        try {
            await logoutService()
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

    
    static async getCurrentUser(uid) {
        try {
            if (!uid) return null

            const userDocRef = doc(db, 'users', uid)
            const userDoc = await getDoc(userDocRef)

            if (userDoc.exists()) {
                return User.fromFirestore(userDoc)
            }
            return null
        } catch (error) {
            console.error('Erro ao obter utilizador:', error)
            return null
        }
    }
}

export default AuthController
