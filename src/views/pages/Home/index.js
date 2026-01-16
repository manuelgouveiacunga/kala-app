'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/views/components/ui/button'
import { Card } from '@/views/components/ui/card'
import { MessageCircle, Shield, Zap } from 'lucide-react'
import ROUTES from '@/utils/constants'

export default function LandingPage() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('kala_user')
        if (user) {
            setIsLoggedIn(true)
        }
    }, [])

    const handleGetStarted = () => {
        if (isLoggedIn) {
            router.push('/dashboard')
        } else {
            router.push('/auth/login')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">KALA</span>
                    </div>
                    <div className="flex gap-2">
                        {isLoggedIn ? (
                            <Button onClick={() => router.push('/dashboard')} className="bg-gradient-to-r from-purple-600 to-pink-600">
                                Meu Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" onClick={() => router.push('/auth/login')}>Entrar</Button>
                                <Button onClick={() => router.push('/auth/login')} className="bg-gradient-to-r from-purple-600 to-pink-600">Criar Conta</Button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-12 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight md:leading-tight">
                        Recebe mensagens anónimas dos teus amigos
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto px-4">
                        Cria o teu link pessoal e descobre o que as pessoas realmente pensam de ti. Totalmente anónimo e seguro.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
                        <Button
                            size="lg"
                            onClick={handleGetStarted}
                            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 text-lg h-auto hover:shadow-lg transition-all"
                        >
                            Criar meu link grátis
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Sem cartão de crédito. Começa em 30 segundos.</p>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <MessageCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Mensagens Anónimas</h3>
                        <p className="text-gray-600">Recebe feedback honesto sem saber quem enviou. Total privacidade garantida.</p>
                    </Card>

                    <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-pink-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Seguro e Privado</h3>
                        <p className="text-gray-600">Teus dados estão protegidos. Ninguém saberá quem enviou as mensagens.</p>
                    </Card>

                    <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Rápido e Fácil</h3>
                        <p className="text-gray-600">Cria teu link em segundos e partilha nas tuas redes sociais.</p>
                    </Card>
                </div>
            </section>

            {/* How it works */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Como funciona?</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-2">Cria tua conta</h3>
                            <p className="text-gray-600">Regista-te grátis com Google ou email em segundos</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-2">Partilha teu link</h3>
                            <p className="text-gray-600">Partilha nas tuas redes sociais e grupos de WhatsApp</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-2">Recebe mensagens</h3>
                            <p className="text-gray-600">Vê o que as pessoas pensam de ti de forma anónima</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar?</h2>
                    <p className="text-lg mb-6 opacity-90">Junta-te a milhares de angolanos que já usam KALA</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={handleGetStarted}
                            className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg h-auto font-bold"
                        >
                            Criar meu link agora
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-gray-50 py-8">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>© 2025 KALA. Feito em Angola 🇦🇴</p>
                </div>
            </footer>
        </div>
    )
}
