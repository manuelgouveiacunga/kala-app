'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/views/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card'
import { Textarea } from '@/views/components/ui/textarea'
import { MessageCircle, Send, ShieldCheck, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/views/components/ui/alert'
import MessageController from '@/controllers/messageController'
import UserController from '@/controllers/userController'
import User from '@/models/User'

export default function SendMessagePage() {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { username } = params
    const token = searchParams.get('t')

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [targetUser, setTargetUser] = useState(null)
    const [error, setError] = useState('')
    const [pageStatus, setPageStatus] = useState('loading')

    useEffect(() => {
        const checkLinkStatus = async () => {
            if (!username) return

            try {
                const result = await UserController.getUserByUsername(username)

                if (!result.success) {
                    setPageStatus('invalid')
                    return
                }

                if (!token) {
                    setPageStatus('invalid')
                    return
                }

                const user = new User(result.user)
                const isValidLink = user.hasActiveLink(token)

                if (isValidLink) {
                    setTargetUser(user)
                    setPageStatus('valid')
                } else {
                    setPageStatus('expired')
                }

            } catch (err) {
                console.error('Erro ao validar link:', err)
                setPageStatus('invalid')
            }
        }

        checkLinkStatus()
    }, [username, token])

    const handleSendMessage = async (e) => {
        e.preventDefault()

        if (message.trim().length < 10) {
            setError('A mensagem deve ter pelo menos 10 caracteres')
            return
        }

        if (message.trim().length > 500) {
            setError('A mensagem não pode ter mais de 500 caracteres')
            return
        }

        setLoading(true)
        setError('')

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const result = await MessageController.sendMessage({ username, text: message })

            if (result.success) {
                setSent(true)
                setMessage('')

                setTimeout(() => {
                    setSent(false)
                }, 5000)
            } else {
                setError(result.error)
            }
        } catch (err) {
            setError('Erro ao enviar mensagem')
        } finally {
            setLoading(false)
        }
    }

    if (pageStatus === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">A verificar link...</p>
                </div>
            </div>
        )
    }

    if (pageStatus === 'invalid' || pageStatus === 'expired') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-2 border-red-100">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <CardTitle className="text-xl text-red-700">Link Inválido ou Expirado</CardTitle>
                        <CardDescription>
                            {pageStatus === 'expired'
                                ? "Este link expirou pois passou o limite de 48 horas ou o utilizador gerou um novo."
                                : "Não foi possível encontrar este utilizador."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            onClick={() => router.push('/')}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                            Criar o meu próprio link
                        </Button>
                    </CardContent>
                </Card>
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
                    <Button variant="outline" onClick={() => router.push('/')}>
                        Criar meu link
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 md:py-16 max-w-2xl">
                {sent ? (
                    <Card className="border-2 border-green-200 bg-green-50">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2 text-green-900">Mensagem Enviada!</h2>
                                <p className="text-green-700 mb-6">A tua mensagem anónima foi enviada com sucesso</p>
                                <Button
                                    onClick={() => setSent(false)}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                                >
                                    Enviar Outra Mensagem
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-2 border-purple-200">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl md:text-3xl">
                                Envia uma mensagem anónima para @{username}
                            </CardTitle>
                            <CardDescription className="text-base">
                                A tua identidade será mantida em segredo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSendMessage} className="space-y-4">
                                <div>
                                    <Textarea
                                        placeholder="Escreve a tua mensagem aqui... Sê honesto e respeitoso!"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="min-h-[150px] text-base"
                                        maxLength={500}
                                    />
                                    <div className="flex justify-between mt-2">
                                        <p className="text-xs text-gray-500">Mínimo: 10 caracteres</p>
                                        <p className="text-xs text-gray-500">{message.length}/500</p>
                                    </div>
                                </div>

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Alert className="border-purple-200 bg-purple-50">
                                    <ShieldCheck className="h-4 w-4 text-purple-600" />
                                    <AlertDescription className="text-purple-900">
                                        <strong>100% Anónimo:</strong> A tua identidade nunca será revelada. Nem mesmo o destinatário saberá quem és.
                                    </AlertDescription>
                                </Alert>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-base"
                                    disabled={loading || message.trim().length < 10}
                                >
                                    {loading ? (
                                        'A enviar...'
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Enviar Mensagem Anónima
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 mb-3">Queres receber mensagens anónimas também?</p>
                                <Button variant="outline" onClick={() => router.push('/')}>
                                    Criar meu link grátis
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
