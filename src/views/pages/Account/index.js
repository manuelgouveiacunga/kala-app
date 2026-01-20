'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/views/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card'
import { MessageCircle, Crown, LogOut, User, Mail, X } from 'lucide-react'
import { Alert, AlertDescription } from '@/views/components/ui/alert'
import AuthController from '@/controllers/authController'

export default function ContaPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    useEffect(() => {
        const userData = localStorage.getItem('kala_user')
        if (!userData) {
            router.push('/auth/login')
            return
        }
        setUser(JSON.parse(userData))
    }, [])

    const handleLogout = async () => {
        setShowLogoutModal(true)
    }

    const confirmLogout = async () => {
        setIsLoggingOut(true)
        try {
            await AuthController.logout()
            localStorage.removeItem('kala_user')
            window.location.href = '/auth/login'
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
            setIsLoggingOut(false)
        }
    }

    const cancelLogout = () => {
        setShowLogoutModal(false)
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">A carregar...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Confirmar Saída</h3>
                                <button
                                    onClick={cancelLogout}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={isLoggingOut}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="mb-6">
                                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-4">
                                    <LogOut className="w-6 h-6 text-red-600" />
                                </div>
                                <p className="text-center text-gray-700 mb-2">
                                    Tens certeza que queres sair da tua conta?
                                </p>
                                <p className="text-center text-sm text-gray-500">
                                    Serás redirecionado para a página de login.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={cancelLogout}
                                    className="flex-1 border-gray-300 hover:bg-gray-50"
                                    disabled={isLoggingOut}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={confirmLogout}
                                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                            A sair...
                                        </>
                                    ) : (
                                        'Sair da Conta'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shrink-0">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">KALA</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
                        Voltar
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Minha Conta</h1>

                {/* Profile Info */}
                <Card className="mb-6 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg md:text-xl">Informações do Perfil</CardTitle>
                        <CardDescription className="text-xs md:text-sm">Detalhes da tua conta KALA</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs md:text-sm text-gray-500">Nome de utilizador</p>
                                <p className="font-semibold truncate text-sm md:text-base">@{user.username}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs md:text-sm text-gray-500">Email</p>
                                <p className="font-semibold truncate text-sm md:text-base">{user.email}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t mt-2">
                            <p className="text-xs md:text-sm text-gray-500">Membro desde</p>
                            <p className="font-semibold text-sm md:text-base">
                                {new Date(user.createdAt).toLocaleDateString('pt-AO', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription Status */}
                <Card className="mb-6 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            {user.isPremium && <Crown className="w-5 h-5 text-yellow-500 shrink-0" />}
                            Estado da Subscrição
                        </CardTitle>
                        <CardDescription className="text-xs md:text-sm">
                            {user.isPremium ? 'Tens acesso a todas as funcionalidades premium' : 'Estás no plano gratuito'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.isPremium ? (
                            <Alert className="border-yellow-200 bg-yellow-50">
                                <Crown className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                                <AlertDescription className="text-yellow-900 text-xs md:text-sm ml-2">
                                    <strong>Plano Premium Ativo</strong>
                                    <div className="mt-1">
                                        Mensagens ilimitadas • Suporte prioritário • Badge premium
                                    </div>
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div>
                                <Alert className="border-purple-200 bg-purple-50 mb-4">
                                    <AlertDescription className="text-purple-900 text-xs md:text-sm">
                                        <strong>Plano Gratuito</strong>
                                        <br />
                                        Limite de 80 mensagens
                                    </AlertDescription>
                                </Alert>
                                <Button
                                    onClick={() => router.push('/premium')}
                                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 min-h-10 md:min-h-11 h-auto text-sm md:text-base whitespace-normal py-2"
                                >
                                    <Crown className="w-4 h-4 mr-2 shrink-0" />
                                    <span>Fazer Upgrade para Premium</span>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Actions */}
                <Card className="border-red-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg md:text-xl text-red-700">Ações da Conta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="w-full h-10 md:h-11 text-sm md:text-base hover:bg-red-600"
                        >
                            <LogOut className="w-4 h-4 mr-2 shrink-0" />
                            Sair da Conta
                        </Button>
                    </CardContent>
                </Card>

                {/* Support */}
                <div className="mt-8 text-center text-xs md:text-sm text-gray-600 pb-8">
                    <p>Precisas de ajuda? Contacta-nos:</p>
                    <p className="font-semibold mt-1 select-all">+244 926 329 731</p>
                </div>
            </div>
        </div>
    )
}
