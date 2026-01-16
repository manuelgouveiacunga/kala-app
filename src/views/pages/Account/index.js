'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/views/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card'
import { MessageCircle, Crown, LogOut, User, Mail } from 'lucide-react'
import { Alert, AlertDescription } from '@/views/components/ui/alert'
import AuthController from '@/controllers/authController'

export default function ContaPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = localStorage.getItem('kala_user')
        if (!userData) {
            router.push('/auth/login')
            return
        }
        setUser(JSON.parse(userData))
    }, [])

    const handleLogout = async () => {
        if (confirm('Tens certeza que queres sair?')) {
            await AuthController.logout()
            localStorage.removeItem('kala_user')
            router.push('/')
        }
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
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">KALA</span>
                    </div>
                    <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                        Voltar
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

                {/* Profile Info */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Informações do Perfil</CardTitle>
                        <CardDescription>Detalhes da tua conta KALA</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shrink-0">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-gray-500">Nome de utilizador</p>
                                <p className="font-semibold truncate">@{user.username}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                <Mail className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-semibold truncate">{user.email}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <p className="text-sm text-gray-500">Membro desde</p>
                            <p className="font-semibold">
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
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {user.isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
                            Estado da Subscrição
                        </CardTitle>
                        <CardDescription>
                            {user.isPremium ? 'Tens acesso a todas as funcionalidades premium' : 'Estás no plano gratuito'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.isPremium ? (
                            <Alert className="border-yellow-200 bg-yellow-50">
                                <Crown className="h-4 w-4 text-yellow-600" />
                                <AlertDescription className="text-yellow-900">
                                    <strong>Plano Premium Ativo</strong>
                                    <br />
                                    Mensagens ilimitadas • Suporte prioritário • Badge premium
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div>
                                <Alert className="border-purple-200 bg-purple-50 mb-4">
                                    <AlertDescription className="text-purple-900">
                                        <strong>Plano Gratuito</strong>
                                        <br />
                                        Limite de 80 mensagens
                                    </AlertDescription>
                                </Alert>
                                <Button
                                    onClick={() => router.push('/premium')}
                                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                                >
                                    <Crown className="w-4 h-4 mr-2" />
                                    Fazer Upgrade para Premium
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Actions */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle>Ações da Conta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="w-full"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sair da Conta
                        </Button>
                    </CardContent>
                </Card>

                {/* Support */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>Precisas de ajuda? Contacta-nos:</p>
                    <p className="font-semibold mt-1">suporte@kala.ao</p>
                </div>
            </div>
        </div>
    )
}
