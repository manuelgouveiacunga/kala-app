'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/views/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card'
import { MessageCircle, Copy, Check, Crown, Share2, Settings, RefreshCw, Clock } from 'lucide-react'
import { Progress } from '@/views/components/ui/progress'
import MessageController from '@/controllers/messageController'
import UserController from '@/controllers/userController'
import User from '@/models/User'
import { generateMessageImage } from '@/utils/shareMessageImage'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [copied, setCopied] = useState(false)
    const [generatingLink, setGeneratingLink] = useState(false)
    const [timeLeft, setTimeLeft] = useState('')
    const [sharingId, setSharingId] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            const localData = localStorage.getItem('kala_user')
            if (!localData) {
                router.push('/auth/login')
                return
            }

            const parsedLocalUser = JSON.parse(localData)
            const userResult = await UserController.getUserById(parsedLocalUser.uid)

            let currentUser
            if (userResult.success) {
                currentUser = new User(userResult.user)
                setUser(currentUser)
                localStorage.setItem('kala_user', JSON.stringify(currentUser.toJSON()))
            } else {
                currentUser = new User(parsedLocalUser)
                setUser(currentUser)
            }

            try {
                const msgResult = await MessageController.listMessages(currentUser.uid)
                if (msgResult.success) {
                    setMessages(msgResult.messages)
                    localStorage.setItem(`kala_messages_${currentUser.uid}`, JSON.stringify(msgResult.messages))
                }
            } catch (error) {
                console.error("Failed to load messages:", error)
                const savedMessages = localStorage.getItem(`kala_messages_${currentUser.uid}`)
                if (savedMessages) {
                    setMessages(JSON.parse(savedMessages))
                }
            }
        }

        loadData()
    }, [router])

    useEffect(() => {
        if (!user || typeof user.hasActiveLink !== 'function' || !user.hasActiveLink()) return

        const updateTimeLeft = () => {
            const ms = user.getLinkTimeRemaining()
            if (ms <= 0) {
                setTimeLeft('Expirado')
                setUser(new User(user.toJSON()))
            } else {
                const hours = Math.floor(ms / (1000 * 60 * 60))
                const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
                setTimeLeft(`${hours}h ${minutes}m`)
            }
        }

        updateTimeLeft()
        const interval = setInterval(updateTimeLeft, 60000)

        return () => clearInterval(interval)
    }, [user])

    const handleGenerateLink = async () => {
        setGeneratingLink(true)
        try {
            const result = await UserController.generateLink(user.uid)
            if (result.success) {
                const updatedUser = new User({
                    ...user.toJSON(),
                    linkConfig: result.linkConfig
                })
                setUser(updatedUser)
                localStorage.setItem('kala_user', JSON.stringify(updatedUser.toJSON()))
            }
        } catch (error) {
            console.error('Erro ao gerar link:', error)
        } finally {
            setGeneratingLink(false)
        }
    }

    const getLinkUrl = () => {
        if (!user || !user.linkConfig?.token) return ''
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
        return `${baseUrl}/m/${user.username}?t=${user.linkConfig.token}`
    }

    const messageLimit = user?.isPremium ? Infinity : 80
    const messageCount = messages.length
    const progress = user?.isPremium ? 100 : (messageCount / messageLimit) * 100

    const copyLink = () => {
        navigator.clipboard.writeText(getLinkUrl())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'KALA - Mensagens Anónimas',
                    text: 'Envia-me uma mensagem anónima! O link expira em 48h.',
                    url: getLinkUrl()
                })
            } catch (err) {
                copyLink()
            }
        } else {
            copyLink()
        }
    }

    const handleShareMessage = async (message) => {
        setSharingId(message.id)
        try {
            const imageFile = await generateMessageImage(message.text)

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
                await navigator.share({
                    files: [imageFile],
                    title: 'KALA - Mensagem Anónima',
                })
            } else {
                // Fallback: Download the image
                const url = URL.createObjectURL(imageFile)
                const link = document.createElement('a')
                link.href = url
                link.download = `kala-mensagem-${message.id}.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
            }
        } catch (error) {
            console.error('Erro ao partilhar mensagem:', error)
        } finally {
            setSharingId(null)
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

    const hasActiveLink = typeof user.hasActiveLink === 'function' && user.hasActiveLink()
    const linkUrl = getLinkUrl()

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shrink-0">
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
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 break-words">Olá, {user.displayName}! 👋</h1>
                    <p className="text-gray-600">Tens {messageCount} mensagem{messageCount !== 1 ? 's' : ''} anónima{messageCount !== 1 ? 's' : ''}</p>
                </div>

                <Card className="mb-6 border-2 border-purple-200 shadow-sm overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-3">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                <span className="text-base sm:text-lg">Teu Link Pessoal</span>
                            </div>
                            {hasActiveLink && (
                                <div className="flex items-center text-[10px] sm:text-sm font-medium text-purple-600 bg-purple-50 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full w-fit">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                    Expira em: <span className="ml-1 font-bold">{timeLeft}</span>
                                </div>
                            )}
                        </CardTitle>
                        <CardDescription className="text-[11px] sm:text-sm">
                            {hasActiveLink
                                ? "Partilha este link para receber mensagens"
                                : "Gera um novo link para começares a receber mensagens"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                        {hasActiveLink ? (
                            <>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 sm:py-3 font-mono text-[10px] xs:text-xs sm:text-sm break-all border border-gray-200">
                                        {linkUrl}
                                    </div>
                                    <Button onClick={copyLink} variant="outline" className="shrink-0 h-9 sm:h-auto w-full sm:w-auto text-xs sm:text-sm">
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" />
                                                <span>Copiado!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" />
                                                <span>Copiar</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <Button onClick={shareLink} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 h-10 sm:h-11 text-xs sm:text-base">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Partilhar
                                    </Button>
                                    <Button
                                        onClick={handleGenerateLink}
                                        variant="outline"
                                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-10 sm:h-11 text-xs sm:text-base"
                                        disabled={generatingLink}
                                    >
                                        <RefreshCw className={`w-4 h-4 mr-2 ${generatingLink ? 'animate-spin' : ''}`} />
                                        {generatingLink ? 'Gerando...' : 'Gerar Novo'}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4 sm:py-8">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Sem link ativo</h3>
                                <p className="text-[11px] sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-sm mx-auto px-4">
                                    Gera um link temporário partilhável. Por segurança, expira em 48h.
                                </p>
                                <Button
                                    onClick={handleGenerateLink}
                                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 min-w-[200px] h-11 text-base"
                                    disabled={generatingLink}
                                >
                                    {generatingLink ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            A gerar...
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Gerar o meu Link
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {!user.isPremium && (
                    <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                        <CardHeader className="p-4 sm:p-6 pb-3">
                            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                                <span>Limite de Mensagens</span>
                                {user.isPremium && <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />}
                            </CardTitle>
                            <CardDescription className="text-[10px] xs:text-xs sm:text-sm">
                                {user.isPremium ? 'Mensagens ilimitadas' : `${messageCount} / ${messageLimit} mensagens`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                            <Progress value={progress} className="h-2" />
                            {!user.isPremium && (
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-purple-100 shadow-sm">
                                    <div className="flex items-start gap-2 sm:gap-3 mb-3">
                                        <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-full shrink-0">
                                            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">Fica Premium!</p>
                                            <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 leading-snug">Recebe mensagens ilimitadas por 3.000 Kz/mês</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => router.push('/premium')}
                                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 h-9 sm:h-10 text-[11px] sm:text-sm font-semibold"
                                    >
                                        Ver Plano Premium
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Mensagens Recebidas</CardTitle>
                        <CardDescription>
                            {messageCount === 0 ? 'Ainda não recebeste mensagens' : `${messageCount} mensagem${messageCount !== 1 ? 's' : ''}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {messageCount === 0 ? (
                            <div className="text-center py-10 px-4">
                                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm sm:text-base text-gray-600 mb-6">
                                    {hasActiveLink
                                        ? "Partilha o teu link para começar a receber mensagens!"
                                        : "Gera um link para começar a receber mensagens!"}
                                </p>
                                {hasActiveLink && (
                                    <Button onClick={shareLink} variant="outline" className="w-full sm:w-auto">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Partilhar Agora
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className="bg-white hover:bg-purple-50 transition-colors rounded-xl p-4 border border-purple-100 shadow-sm group"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <p className="text-gray-800 mb-2 break-words text-sm sm:text-base leading-relaxed">{message.text}</p>
                                                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                                                    {new Date(message.timestamp).toLocaleString('pt-AO', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="shrink-0 h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                                                onClick={() => handleShareMessage(message)}
                                                disabled={sharingId === message.id}
                                            >
                                                {sharingId === message.id ? (
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Share2 className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
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
