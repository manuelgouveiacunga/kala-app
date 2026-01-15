'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/views/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card'
import { MessageCircle, Copy, Check, Crown, Share2, Settings } from 'lucide-react'
import { Progress } from '@/views/components/ui/progress'
import MessageController from '@/controllers/messageController'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        // Check authentication
        const userData = localStorage.getItem('kala_user')
        if (!userData) {
            router.push('/auth/login')
            return
        }

        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        // Load messages
        // In real app we would call MessageController.listMessages(parsedUser.uid)
        const loadMessages = async () => {
            // First try to load from localStorage for demo persistence
            const savedMessages = localStorage.getItem(`kala_messages_${parsedUser.uid}`)

            if (savedMessages) {
                setMessages(JSON.parse(savedMessages))
            } else {
                // Fallback to mock messages from controller
                const result = await MessageController.listMessages(parsedUser.uid)
                if (result.success) {
                    setMessages(result.messages)
                    localStorage.setItem(`kala_messages_${parsedUser.uid}`, JSON.stringify(result.messages))
                }
            }
        }

        loadMessages()
    }, [])

    const userLink = user ? `${typeof window !== 'undefined' ? window.location.origin : ''}/m/${user.username}` : ''
    const messageLimit = user?.isPremium ? Infinity : 80
    const messageCount = messages.length
    const progress = user?.isPremium ? 100 : (messageCount / messageLimit) * 100

    const copyLink = () => {
        navigator.clipboard.writeText(userLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'KALA - Mensagens Anónimas',
                    text: 'Envia-me uma mensagem anónima!',
                    url: userLink
                })
            } catch (err) {
                copyLink()
            }
        } else {
            copyLink()
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
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">KALA</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/conta')}>
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Welcome */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Olá, {user.displayName}! 👋</h1>
                    <p className="text-gray-600">Tens {messageCount} mensagem{messageCount !== 1 ? 's' : ''} anónima{messageCount !== 1 ? 's' : ''}</p>
                </div>

                {/* Link Share Card */}
                <Card className="mb-6 border-2 border-purple-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Share2 className="w-5 h-5" />
                            Teu Link Pessoal
                        </CardTitle>
                        <CardDescription>Partilha este link para receber mensagens anónimas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3 font-mono text-sm break-all">
                                {userLink}
                            </div>
                            <Button onClick={copyLink} variant="outline" className="shrink-0">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                        <Button onClick={shareLink} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                            <Share2 className="w-4 h-4 mr-2" />
                            Partilhar Link
                        </Button>
                    </CardContent>
                </Card>

                {/* Message Limit Card */}
                {!user.isPremium && (
                    <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Limite de Mensagens</span>
                                {user.isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
                            </CardTitle>
                            <CardDescription>
                                {user.isPremium ? 'Mensagens ilimitadas' : `${messageCount} / ${messageLimit} mensagens`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Progress value={progress} className="h-2" />
                            {!user.isPremium && (
                                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                                    <div className="flex items-start gap-3 mb-3">
                                        <Crown className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold mb-1">Fica Premium!</p>
                                            <p className="text-sm text-gray-600">Recebe mensagens ilimitadas por apenas 3.000 Kz/mês</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => router.push('/premium')}
                                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                                    >
                                        Ver Plano Premium
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Messages */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mensagens Recebidas</CardTitle>
                        <CardDescription>
                            {messageCount === 0 ? 'Ainda não recebeste mensagens' : `${messageCount} mensagem{messageCount !== 1 ? 's' : ''}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {messageCount === 0 ? (
                            <div className="text-center py-12">
                                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">Partilha o teu link para começar a receber mensagens!</p>
                                <Button onClick={shareLink} variant="outline">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Partilhar Agora
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-100"
                                    >
                                        <p className="text-gray-800 mb-2">{message.text}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(message.timestamp).toLocaleString('pt-AO', {
                                                day: 'numeric',
                                                month: 'long',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
