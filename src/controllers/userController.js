import User from '@/models/User'
export class UserController {
    
    static async getUserByUsername(username) {
        try {
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
    
    static async getUserById(userId) {
        try {
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
  
            return true
        } catch (error) {
            console.error('Erro ao verificar username:', error)
            return false
        }
    }

    static async incrementMessageCount(userId) {
        try {
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
