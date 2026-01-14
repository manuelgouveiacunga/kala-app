'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Crown, Check, Zap, Shield, Star } from 'lucide-react'

export default function PremiumPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('kala_user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [])

  const handleUpgrade = () => {
    setLoading(true)
    // Mock payment - AppyPay integration will be added later
    alert('Integração de pagamento será adicionada em breve.\n\nSerá possível pagar com:\n- Multicaixa Express\n- Unitel Money\n\nValor: 3.000 Kz/mês')
    setLoading(false)
  }

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
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fica <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Premium</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desbloqueia todas as funcionalidades e recebe mensagens ilimitadas
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="border-4 border-yellow-400 shadow-2xl mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
            <div className="bg-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                    MAIS POPULAR
                  </span>
                </div>
                <CardTitle className="text-3xl font-bold">Plano Premium</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">3.000</span>
                    <span className="text-2xl font-semibold text-gray-600">Kz</span>
                  </div>
                  <p className="text-gray-600 mt-2">por mês</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button
                    onClick={handleUpgrade}
                    disabled={loading || user.isPremium}
                    className="w-full h-14 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    {user.isPremium ? (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Já és Premium!
                      </>
                    ) : loading ? (
                      'A processar...'
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Pagar com Multicaixa / Unitel Money
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Pagamento seguro • Cancela quando quiseres
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Free vs Premium Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl">Plano Grátis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span>Até 80 mensagens</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span>Link pessoal</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span>Mensagens anónimas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-5 h-5 text-center">✗</span>
                <span>Mensagens ilimitadas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-5 h-5 text-center">✗</span>
                <span>Badge premium</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-yellow-400">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                Plano Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-semibold">Mensagens ilimitadas</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span>Link pessoal</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span>Mensagens anónimas</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-semibold">Proteção contra spam</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-semibold">Suporte prioritário</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Como faço o pagamento?</h3>
              <p className="text-sm text-gray-600">Podes pagar com Multicaixa Express ou Unitel Money. O processo é rápido e seguro.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Posso cancelar quando quiser?</h3>
              <p className="text-sm text-gray-600">Sim! Podes cancelar a qualquer momento sem custos adicionais.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">O que acontece se eu cancelar?</h3>
              <p className="text-sm text-gray-600">Voltas para o plano grátis com limite de 80 mensagens, mas manténs todas as mensagens já recebidas.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}