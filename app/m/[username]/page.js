'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, Send, ShieldCheck } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SendMessagePage() {
  const params = useParams()
  const router = useRouter()
  const { username } = params
  
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [targetUser, setTargetUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // Simulate finding user - In real app, this would query Firestore
    // For now, we'll just accept any username
    setTargetUser({
      username: username,
      displayName: username,
      isPremium: false
    })
  }, [username])

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

    // Simulate sending message - In real app, this would save to Firestore
    setTimeout(() => {
      // In a real implementation, we would:
      // 1. Check if user exists
      // 2. Check message limit (if not premium)
      // 3. Save message to Firestore
      
      // For demo, we'll show success
      setSent(true)
      setMessage('')
      setLoading(false)
      
      setTimeout(() => {
        setSent(false)
      }, 5000)
    }, 1000)
  }

  if (!targetUser) {
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