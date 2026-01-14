'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { MessageCircle, Mail } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleAuth = () => {
    setLoading(true)
    // Mock Google login - Firebase será integrado depois
    setTimeout(() => {
      const mockUser = {
        uid: 'google-' + Date.now(),
        email: 'user@gmail.com',
        displayName: 'Utilizador',
        username: 'user' + Math.floor(Math.random() * 10000),
        isPremium: false,
        messageCount: 0,
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('kala_user', JSON.stringify(mockUser))
      router.push('/dashboard')
    }, 1000)
  }

  const handleEmailAuth = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Mock email login/register - Firebase será integrado depois
    setTimeout(() => {
      const mockUser = {
        uid: 'email-' + Date.now(),
        email: email,
        displayName: username || email.split('@')[0],
        username: username || 'user' + Math.floor(Math.random() * 10000),
        isPremium: false,
        messageCount: 0,
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('kala_user', JSON.stringify(mockUser))
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Entrar no KALA' : 'Criar Conta'}
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Bem-vindo de volta!' : 'Começa a receber mensagens anónimas'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Auth */}
          <Button
            variant="outline"
            className="w-full h-12 text-base"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Continuar com Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Ou</span>
            </div>
          </div>

          {/* Email Auth */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Nome de utilizador</Label>
                <Input
                  id="username"
                  placeholder="seutexto"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  required={!isLogin}
                />
                <p className="text-xs text-gray-500">Teu link será: kala.ao/m/{username || 'seutexto'}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="teu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Palavra-passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-base"
              disabled={loading}
            >
              {loading ? 'Aguarda...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </Button>
          </form>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:underline"
            >
              {isLogin ? 'Não tens conta? Cria aqui' : 'Já tens conta? Entra aqui'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}