'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/views/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/views/components/ui/card'
import { MessageCircle, Crown, Check, Zap, Shield, Star, X, Phone, CreditCard, Smartphone } from 'lucide-react'
import PaymentController from '@/controllers/paymentController'

export default function PremiumPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    useEffect(() => {
        const userData = localStorage.getItem('kala_user')
        if (!userData) {
            router.push('/auth/login')
            return
        }
        setUser(JSON.parse(userData))
    }, [])

    const handleUpgrade = async () => {
        setLoading(true)
        const result = await PaymentController.createPayment(user.uid)

        if (result.success) {
            setShowPaymentModal(true)
        } else {
            toast.error('Ocorreu um erro. Tenta novamente.')
        }

        setLoading(false)
    }

    const openWhatsApp = () => {
        const phoneNumber = '+244926329731'
        const message = 'Olá! Gostaria de fazer upgrade para o plano Premium do KALA.'
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
        setShowPaymentModal(false)
    }

    const closeModal = () => {
        setShowPaymentModal(false)
    }

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }

        if (showPaymentModal) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'auto'
        }
    }, [showPaymentModal])

    const features = [
        {
            icon: <Zap className="w-5 h-5" />,
            title: 'Mensagens Ilimitadas',
            description: 'Recebe quantas mensagens quiseres, sem limite'
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: 'Segurança Premium',
            description: 'Proteção extra contra spam e mensagens impróprias'
        },
        {
            icon: <Star className="w-5 h-5" />,
            title: 'Badge Premium',
            description: 'Mostra que és membro premium na tua página'
        },
        {
            icon: <Crown className="w-5 h-5" />,
            title: 'Suporte Prioritário',
            description: 'Resposta rápida da nossa equipa de suporte'
        }
    ]

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
            {/* Payment Modal - Responsivo */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
                    <div 
                        className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md mx-2 sm:mx-4 animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative max-h-[90vh] overflow-y-auto">
                            {/* Gradient Top Border */}
                            <div className="sticky top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 z-10" />
                            
                            <div className="p-4 sm:p-6">
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-sm"
                                    aria-label="Fechar modal"
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>

                                {/* Header */}
                                <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center shrink-0 border border-yellow-200">
                                        <Crown className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-600" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-tight">Pagamento via WhatsApp</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                                            Entre em contacto para concluir a ativação do Premium
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div className="space-y-4 sm:space-y-5">
                                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs sm:text-sm font-medium text-gray-600">Valor Mensal</span>
                                            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                                3.000 Kz
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs sm:text-sm font-medium text-gray-600">Plano</span>
                                            <span className="text-sm font-semibold text-gray-800 truncate ml-2">Premium Mensal</span>
                                        </div>
                                        <div className="flex items-start justify-between">
                                            <span className="text-xs sm:text-sm font-medium text-gray-600 pt-0.5">Renovação</span>
                                            <span className="text-xs text-gray-600 text-right max-w-[60%]">
                                                Automática (cancela a qualquer momento)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Métodos de pagamento</p>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                            {/* Multicaixa Express */}
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 sm:p-3 border border-blue-200">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md flex items-center justify-center mb-1 sm:mb-2 mx-auto">
                                                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                </div>
                                                <p className="text-center text-xs sm:text-sm font-medium text-gray-800 leading-tight">
                                                    Multicaixa Express
                                                </p>
                                            </div>
                                            
                                            {/* Unitel Money */}
                                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 sm:p-3 border border-orange-200">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center mb-1 sm:mb-2 mx-auto">
                                                    <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                </div>
                                                <p className="text-center text-xs sm:text-sm font-medium text-gray-800 leading-tight">
                                                    Unitel Money
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-200">
                                        <p className="text-xs sm:text-sm font-medium text-yellow-800 mb-2">
                                            Como funciona:
                                        </p>
                                        <ol className="text-xs text-yellow-800 space-y-1.5 pl-1">
                                            <li className="flex items-start gap-2">
                                                <span className="bg-yellow-100 text-yellow-800 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                                                <span className="leading-relaxed">Clique em "Falar no WhatsApp" abaixo</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="bg-yellow-100 text-yellow-800 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                                                <span className="leading-relaxed">Informe que deseja ativar o Premium</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="bg-yellow-100 text-yellow-800 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                                                <span className="leading-relaxed">Receba instruções de pagamento e ativação</span>
                                            </li>
                                        </ol>
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        onClick={openWhatsApp}
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-4 sm:py-6 text-base sm:text-lg font-semibold whitespace-normal h-auto"
                                    >
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                                        <span className="text-sm sm:text-base">Falar no WhatsApp Agora</span>
                                    </Button>

                                    {/* Support Info */}
                                    <div className="text-center space-y-1">
                                        <p className="text-xs text-gray-500">
                                            Atendimento via WhatsApp:
                                        </p>
                                        <p className="text-sm font-semibold text-gray-700 select-all">
                                            +244 926 329 731
                                        </p>
                                        <p className="text-xs text-gray-500 pt-1">
                                            Segunda a Sexta, 9h às 18h
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

            <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
                {/* Hero */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Fica <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Premium</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
                        Desbloqueia todas as funcionalidades e recebe mensagens ilimitadas
                    </p>
                </div>

                {/* Pricing Card */}
                <Card className="border-4 border-yellow-400 shadow-xl sm:shadow-2xl mb-8 sm:mb-12 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                        <div className="bg-white">
                            <CardHeader className="text-center pb-4 px-4 sm:px-6">
                                <div className="flex justify-center mb-2">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                                        MAIS POPULAR
                                    </span>
                                </div>
                                <CardTitle className="text-2xl sm:text-3xl font-bold">Plano Premium</CardTitle>
                                <div className="mt-4">
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">3.000</span>
                                        <span className="text-xl sm:text-2xl font-semibold text-gray-600">Kz</span>
                                    </div>
                                    <p className="text-gray-600 mt-2">por mês</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 px-4 sm:px-6">
                                {/* Features */}
                                <div className="space-y-4">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                                                {feature.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-semibold mb-1 text-sm sm:text-base">{feature.title}</h3>
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="pt-4">
                                    <Button
                                        onClick={handleUpgrade}
                                        disabled={loading || user.isPremium}
                                        className="w-full h-auto py-3 sm:py-4 text-sm sm:text-base md:text-lg whitespace-normal leading-tight bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                                    >
                                        {user.isPremium ? (
                                            <div className="flex items-center justify-center">
                                                <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                                                <span className="text-sm sm:text-base">Já és Premium!</span>
                                            </div>
                                        ) : loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                <span className="text-sm sm:text-base">A preparar...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center flex-wrap gap-1">
                                                <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                                                <span className="text-sm sm:text-base">Pagar com Multicaixa / Unitel Money</span>
                                            </div>
                                        )}
                                    </Button>
                                    <p className="text-xs text-center text-gray-500 mt-3 px-2">
                                        Pagamento seguro • Cancela quando quiseres
                                    </p>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Free vs Premium Comparison */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg sm:text-xl">Plano Grátis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base">Até 80 mensagens</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base">Link pessoal</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base">Mensagens anónimas</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span className="w-4 h-4 sm:w-5 sm:h-5 text-center shrink-0">✗</span>
                                <span className="text-sm sm:text-base">Mensagens ilimitadas</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span className="w-4 h-4 sm:w-5 sm:h-5 text-center shrink-0">✗</span>
                                <span className="text-sm sm:text-base">Badge premium</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-4 border-yellow-400">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 shrink-0" />
                                Plano Premium
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base font-semibold">Mensagens ilimitadas</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base">Link pessoal</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base">Mensagens anónimas</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base font-semibold">Proteção contra spam</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-sm sm:text-base font-semibold">Suporte prioritário</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Perguntas Frequentes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                        <div>
                            <h3 className="font-semibold mb-1 text-sm sm:text-base">Como faço o pagamento?</h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Clique no botão de pagamento e será direcionado ao WhatsApp para receber instruções de pagamento via Multicaixa Express ou Unitel Money.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1 text-sm sm:text-base">Posso cancelar quando quiser?</h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Sim! Podes cancelar a qualquer momento sem custos adicionais.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1 text-sm sm:text-base">O que acontece se eu cancelar?</h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Voltas para o plano grátis com limite de 80 mensagens, mas manténs todas as mensagens já recebidas.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1 text-sm sm:text-base">Como é o atendimento?</h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Atendemos via WhatsApp no número <span className="font-semibold text-purple-600">+244 926 329 731</span>, de segunda a sexta, das 9h às 18h.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
