'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/views/components/ui/button'
import { Input } from '@/views/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card'
import { Label } from '@/views/components/ui/label'
import { MessageCircle } from 'lucide-react'
import AuthController from '@/controllers/authController'
import { isValidEmail, isValidPassword } from '@/utils/validation'
import { FcGoogle } from 'react-icons/fc'

export default function AuthPage() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateEmail = (value) => {
        if (!value) {
            setEmailError('O email é obrigatório')
            return false
        }
        if (!isValidEmail(value)) {
            setEmailError('Insere um email válido')
            return false
        }
        setEmailError('')
        return true
    }

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('A palavra-passe é obrigatória')
            return false
        }
        if (!isValidPassword(value)) {
            setPasswordError('A palavra-passe deve ter pelo menos 6 caracteres')
            return false
        }
        setPasswordError('')
        return true
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        if (emailError) validateEmail(value)
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        if (passwordError) validatePassword(value)
    }

    const handleGoogleAuth = async () => {
        setLoading(true)
        setError('')

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const result = await AuthController.loginWithGoogle()

            if (result.success) {
                toast.success('Autenticado com sucesso!', {
                    description: `Bem-vindo, ${result.user.displayName}`,
                })
                localStorage.setItem('kala_user', JSON.stringify(result.user))
                router.push('/dashboard')
            } else {
                setError(result.error)
                toast.error('Erro ao entrar com Google', {
                    description: result.error
                })
            }
        } catch (err) {
            setError('Erro ao autenticar com Google')
            toast.error('Erro ao autenticar', {
                description: 'Ocorreu um erro inesperado ao tentar entrar com Google.'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleEmailAuth = async (e) => {
        e.preventDefault()

        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)

        if (!isEmailValid || !isPasswordValid) {
            return
        }

        setLoading(true)
        setError('')

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            let result
            if (isLogin) {
                result = await AuthController.login({ email, password })
            } else {
                result = await AuthController.register({ email, password, username })
            }

            if (result.success) {
                toast.success(isLogin ? 'Login efetuado com sucesso!' : 'Conta criada com sucesso!', {
                    description: isLogin ? 'Bem-vindo de volta ao KALA.' : 'A tua conta foi criada e já podes usar o KALA.',
                })
                localStorage.setItem('kala_user', JSON.stringify(result.user))
                router.push('/dashboard')
            } else {
                setError(result.error)
                toast.error(isLogin ? 'Erro ao entrar' : 'Erro ao criar conta', {
                    description: result.error
                })
            }
        } catch (err) {
            setError('Erro ao autenticar')
            toast.error('Erro ao processar pedido', {
                description: 'Ocorreu um erro inesperado. Por favor tenta novamente.'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-2 sm:p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center pb-2 sm:pb-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold">
                        {isLogin ? 'Entrar no KALA' : 'Criar Conta'}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        {isLogin ? 'Bem-vindo de volta!' : 'Começa a receber mensagens anónimas'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-xs sm:text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Google Auth */}
                    <Button
                        variant="outline"
                        className="w-full min-h-12 h-auto text-sm sm:text-base py-2 whitespace-normal"
                        onClick={handleGoogleAuth}
                        disabled={loading}
                    >
                        <FcGoogle className="w-5 h-5 mr-2 shrink-0" />
                        <span>Continuar com Google</span>
                    </Button>

                    <div className="relative py-1 sm:py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Ou</span>
                        </div>
                    </div>

                    {/* Email Auth */}
                    <form onSubmit={handleEmailAuth} className="space-y-3 sm:space-y-4">
                        {!isLogin && (
                            <div className="space-y-1.5 sm:space-y-2">
                                <Label htmlFor="username" className="text-xs sm:text-sm">Nome de utilizador</Label>
                                <Input
                                    id="username"
                                    placeholder="Nome de utilizador"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                                    required={!isLogin}
                                    className="h-10 sm:h-11"
                                />
                                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Teu link: kala.ao/m/{username || 'utilizador'}</p>
                            </div>
                        )}

                        <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={() => validateEmail(email)}
                                className={`h-10 sm:h-11 ${emailError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                required
                            />
                            {emailError && <p className="text-[10px] sm:text-xs text-red-500 font-medium">{emailError}</p>}
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="password" className="text-xs sm:text-sm">Palavra-passe</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Palavra-passe"
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={() => validatePassword(password)}
                                className={`h-10 sm:h-11 ${passwordError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                required
                            />
                            {passwordError && <p className="text-[10px] sm:text-xs text-red-500 font-medium">{passwordError}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full min-h-12 h-auto bg-gradient-to-r from-purple-600 to-pink-600 text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            {loading ? 'Aguarda...' : (isLogin ? 'Entrar' : 'Criar Conta')}
                        </Button>
                    </form>

                    <div className="text-center text-xs sm:text-sm pt-2">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-600 hover:underline font-medium"
                        >
                            {isLogin ? 'Não tens conta? Cria aqui' : 'Já tens conta? Entra aqui'}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
