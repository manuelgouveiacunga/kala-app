'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/views/components/ui/button'
import { Input } from '@/views/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card'
import { Label } from '@/views/components/ui/label'
import { MessageCircle, Eye, EyeOff } from 'lucide-react'
import authApi from '@/services/api/authApi'
import { loginWithGoogleAndSyncProfile } from '@/services/client/googleAuth'
import { isValidEmail, isValidPassword } from '@/utils/validation'
import { FcGoogle } from 'react-icons/fc'

export default function AuthPage() {
    const router = useRouter()
    const [view, setView] = useState('login') // 'login' | 'register' | 'reset'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    const validateUsername = (value) => {
        if (view === 'register') {
            if (!value) {
                setUsernameError('O nome de utilizador é obrigatório')
                return false
            }
            if (value.length < 3) {
                setUsernameError('O nome deve ter pelo menos 3 caracteres')
                return false
            }
        }
        setUsernameError('')
        return true
    }

    const validateConfirmPassword = (value) => {
        if (view !== 'login') {
            if (!value) {
                setConfirmPasswordError('A confirmação da palavra-passe é obrigatória')
                return false
            }
            if (value !== password) {
                setConfirmPasswordError('As palavras-passe não coincidem')
                return false
            }
        }
        setConfirmPasswordError('')
        return true
    }

    const isFormValid = () => {
        if (view === 'login') {
            return isValidEmail(email) && isValidPassword(password) && !emailError && !passwordError
        }
        if (view === 'register') {
            return (
                isValidEmail(email) &&
                isValidPassword(password) &&
                confirmPassword === password &&
                username.length >= 3 &&
                !emailError && !passwordError && !confirmPasswordError && !usernameError
            )
        }
        if (view === 'reset') {
            return isValidPassword(password) && confirmPassword === password && !passwordError && !confirmPasswordError
        }
        return false
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        validateEmail(value)
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        validatePassword(value)
        if (confirmPassword) validateConfirmPassword(confirmPassword)
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        validateConfirmPassword(value)
    }

    const handleUsernameChange = (e) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')
        setUsername(value)
        validateUsername(value)
    }

    const handleGoogleAuth = async () => {
        setLoading(true)
        setError('')

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const result = await loginWithGoogleAndSyncProfile()

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

        const isEmailValid = view === 'reset' || validateEmail(email)
        const isPasswordValid = validatePassword(password)
        const isConfirmMatch = view === 'login' || validateConfirmPassword(confirmPassword)
        const isUsernameValid = view !== 'register' || validateUsername(username)

        if (!isEmailValid || !isPasswordValid || !isConfirmMatch || !isUsernameValid) {
            return
        }

        setLoading(true)
        setError('')

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            let result
            if (view === 'login') {
                result = await authApi.login({ email, password })
            } else if (view === 'register') {
                result = await authApi.register({ email, password, username })
            } else if (view === 'reset') {
                // Simulating password reset
                result = { success: true }
            }

            if (result.success) {
                if (view === 'reset') {
                    toast.success('Palavra-passe redefinida com sucesso!', {
                        description: 'Já podes entrar com a tua nova palavra-passe.',
                    })
                    setView('login')
                    setPassword('')
                    setConfirmPassword('')
                } else {
                    toast.success(view === 'login' ? 'Login efetuado com sucesso!' : 'Conta criada com sucesso!', {
                        description: view === 'login' ? 'Bem-vindo de volta ao KALA.' : 'A tua conta foi criada e já podes usar o KALA.',
                    })
                    localStorage.setItem('kala_user', JSON.stringify(result.user))
                    router.push('/dashboard')
                }
            } else {
                setError(result.error)
                toast.error(view === 'login' ? 'Erro ao entrar' : 'Erro ao criar conta', {
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
                        {view === 'login' ? 'Entrar no KALA' : view === 'register' ? 'Criar Conta' : 'Redefinir Senha'}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        {view === 'login' ? 'Bem-vindo de volta!' : view === 'register' ? 'Começa a receber mensagens anónimas' : 'Cria uma nova palavra-passe para a tua conta'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-xs sm:text-sm text-center">
                            {error}
                        </div>
                    )}

                    {view !== 'reset' && (
                        <>
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
                        </>
                    )}

                    {/* Email Auth */}
                    <form onSubmit={handleEmailAuth} className="space-y-3 sm:space-y-4">
                        {view === 'register' && (
                            <div className="space-y-1.5 sm:space-y-2">
                                <Label htmlFor="username" className="text-xs sm:text-sm">Nome de utilizador</Label>
                                <Input
                                    id="username"
                                    placeholder="Nome de utilizador"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required={view === 'register'}
                                    className={`h-10 sm:h-11 ${usernameError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                />
                                {usernameError ? (
                                    <p className="text-[10px] sm:text-xs text-red-500 font-medium">{usernameError}</p>
                                ) : (
                                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">Teu link: kala.ao/m/{username || 'utilizador'}</p>
                                )}
                            </div>
                        )}

                        {view !== 'reset' && (
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
                        )}

                        <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="password" title="Palavra-passe" className="text-xs sm:text-sm">
                                {view === 'reset' ? 'Nova Palavra-passe' : 'Palavra-passe'}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={view === 'reset' ? "Nova Palavra-passe" : "Palavra-passe"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={() => validatePassword(password)}
                                    className={`h-10 sm:h-11 pr-10 ${passwordError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {passwordError && <p className="text-[10px] sm:text-xs text-red-500 font-medium">{passwordError}</p>}

                            {view === 'login' && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setView('reset')
                                            setPassword('')
                                            setConfirmPassword('')
                                            setError('')
                                        }}
                                        className="text-[10px] sm:text-xs text-purple-600 hover:underline"
                                    >
                                        Esqueci-me da palavra-passe
                                    </button>
                                </div>
                            )}
                        </div>

                        {view !== 'login' && (
                            <div className="space-y-1.5 sm:space-y-2">
                                <Label htmlFor="confirmPassword" title="Confirmar Palavra-passe" className="text-xs sm:text-sm">
                                    {view === 'reset' ? 'Confirmar Nova Palavra-passe' : 'Confirmar Palavra-passe'}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder={view === 'reset' ? "Confirmar Nova Palavra-passe" : "Confirmar Palavra-passe"}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={() => validateConfirmPassword(confirmPassword)}
                                        className={`h-10 sm:h-11 pr-10 ${confirmPasswordError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {confirmPasswordError && <p className="text-[10px] sm:text-xs text-red-500 font-medium">{confirmPasswordError}</p>}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full min-h-12 h-auto bg-gradient-to-r from-purple-600 to-pink-600 text-sm sm:text-base font-medium disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                            disabled={loading || !isFormValid()}
                        >
                            {loading ? 'Aguarda...' : (view === 'login' ? 'Entrar' : view === 'register' ? 'Criar Conta' : 'Confirmar')}
                        </Button>
                    </form>

                    <div className="text-center text-xs sm:text-sm pt-2">
                        {view === 'reset' ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setView('login')
                                    setError('')
                                }}
                                className="text-purple-600 hover:underline font-medium"
                            >
                                Voltar ao Login
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    setView(view === 'login' ? 'register' : 'login')
                                    setError('')
                                }}
                                className="text-purple-600 hover:underline font-medium"
                            >
                                {view === 'login' ? 'Não tens conta? Cria aqui' : 'Já tens conta? Entra aqui'}
                            </button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
