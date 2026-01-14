# 🇦🇴 KALA - Plataforma de Mensagens Anónimas

Plataforma web inspirada no NGL, adaptada ao mercado angolano. Permite aos utilizadores criar links pessoais para receber mensagens anónimas.

## ✨ Funcionalidades Implementadas

### ✅ Core Features (MVP)
- **Landing Page** - Headline clara, CTAs, descrição do produto
- **Autenticação** - Login/Registro com Google e Email (UI pronta para Firebase)
- **Dashboard** - Link pessoal, contador de mensagens (2/80), lista de mensagens
- **Página de Envio** - Formulário para enviar mensagens anónimas
- **Página Premium** - Benefícios, preço (3.000 Kz), botão de pagamento
- **Página de Conta** - Informações do utilizador, estado da subscrição, logout

### 🎨 Design
- ✅ Mobile-first responsive
- ✅ Design limpo com gradientes purple/pink
- ✅ Linguagem em Português de Angola
- ✅ Componentes shadcn/ui
- ✅ Tailwind CSS

### 📊 Regras de Negócio
- ✅ Plano gratuito: 80 mensagens
- ✅ Paywall ao atingir limite
- ✅ Plano Premium: Mensagens ilimitadas (3.000 Kz/mês)
- ✅ Formato de link: `kala.ao/m/username`

## 🚀 Como Usar

### Desenvolvimento
```bash
cd /app
yarn dev
```

Acesse: `http://localhost:3000`

### Estrutura de Arquivos
```
/app
├── app/
│   ├── page.js                    # Landing page
│   ├── auth/login/page.js         # Login/Registro
│   ├── dashboard/page.js          # Dashboard principal
│   ├── m/[username]/page.js       # Página de envio de mensagens
│   ├── premium/page.js            # Página Premium
│   ├── conta/page.js              # Configurações da conta
│   └── api/[[...path]]/route.js   # API routes (mock)
├── components/ui/                 # Componentes shadcn/ui
└── README_KALA.md                 # Este arquivo
```

## 🔧 Integrações Pendentes

### 1. Firebase Auth + Firestore

**Status:** UI pronta, credenciais pendentes

**Arquivos que precisam de atualização:**
- `/app/app/auth/login/page.js` - Substituir mock por Firebase Auth
- `/app/app/api/[[...path]]/route.js` - Adicionar queries Firestore

**Passos para integração:**

1. Criar projeto Firebase (https://console.firebase.google.com)
2. Ativar Authentication (Google + Email/Password)
3. Criar Firestore Database
4. Copiar credenciais e adicionar ao `.env`:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

5. Instalar Firebase SDK:
```bash
yarn add firebase
```

6. Criar `/app/lib/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

**Estrutura Firestore:**
```
users/
  {userId}/
    username: string
    email: string
    displayName: string
    isPremium: boolean
    messageCount: number
    createdAt: timestamp

messages/
  {messageId}/
    userId: string (owner)
    text: string
    timestamp: timestamp
    read: boolean
```

### 2. AppyPay (Pagamentos)

**Status:** UI pronta (botão), integração pendente

**Arquivo a atualizar:**
- `/app/app/premium/page.js` - Função `handleUpgrade()`

**Passos para integração:**

1. Criar conta AppyPay (https://www.appypay.ao/)
2. Obter credenciais API
3. Adicionar ao `.env`:
```env
APPYPAY_API_KEY=sua_chave_api
APPYPAY_MERCHANT_ID=seu_merchant_id
```

4. Instalar SDK (se disponível):
```bash
yarn add @appypay/sdk
# ou usar fetch direto para API REST
```

5. Criar endpoint de pagamento:
```javascript
// /app/app/api/payment/create/route.js
export async function POST(request) {
  const { userId } = await request.json()
  
  // Chamar API AppyPay para criar transação
  const response = await fetch('https://api.appypay.ao/v1/transactions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.APPYPAY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: 3000, // 3.000 Kz
      currency: 'AOA',
      description: 'KALA Premium - Mensagens Ilimitadas',
      userId: userId,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`
    })
  })
  
  const data = await response.json()
  return NextResponse.json(data)
}
```

## 📱 Testes Realizados

### ✅ Fluxos Testados
- [x] Landing page → Login → Dashboard
- [x] Criação de conta
- [x] Visualização de mensagens no dashboard
- [x] Partilhar link pessoal
- [x] Enviar mensagem anónima (página pública)
- [x] Página Premium
- [x] Página de Conta
- [x] Logout

### 🎯 Funcionalidades Mock (Temporárias)
- Autenticação (localStorage) → Substituir por Firebase
- Mensagens (localStorage) → Substituir por Firestore
- Pagamento (alert) → Substituir por AppyPay

## 🌐 URLs da Aplicação

- **Landing:** `/`
- **Login:** `/auth/login`
- **Dashboard:** `/dashboard`
- **Premium:** `/premium`
- **Conta:** `/conta`
- **Enviar Mensagem:** `/m/{username}`

## 🎨 Design System

### Cores
- **Primary:** Purple 600 → Pink 600 (gradient)
- **Premium:** Yellow 500 → Orange 500
- **Backgrounds:** Purple/Pink 50 (subtle gradient)

### Componentes UI (shadcn/ui)
- Button, Card, Input, Textarea
- Alert, Progress, Label
- Todos já instalados e configurados

## 📋 Próximos Passos

1. **Integrar Firebase:**
   - Configurar projeto
   - Adicionar credenciais
   - Substituir mocks de autenticação
   - Implementar Firestore queries

2. **Integrar AppyPay:**
   - Criar conta de merchant
   - Implementar fluxo de pagamento
   - Adicionar webhook de confirmação
   - Atualizar status premium no Firestore

3. **Testes:**
   - Testar autenticação completa
   - Testar envio de mensagens
   - Testar limite de 80 mensagens
   - Testar fluxo de pagamento

4. **Deploy:**
   - Configurar variáveis de ambiente
   - Deploy em produção
   - Configurar domínio kala.ao

## 🔒 Segurança

### Implementado:
- Validação de formulários
- Limite de caracteres nas mensagens
- Anonimato garantido (sem rastreamento de sender)

### A Implementar:
- Firebase Security Rules (Firestore)
- Rate limiting (proteção contra spam)
- Moderação de conteúdo
- Captcha no envio de mensagens

## 🐛 Known Issues

Nenhum issue crítico. Aplicação funcionando perfeitamente em modo de desenvolvimento.

## 📞 Suporte

Para dúvidas sobre a implementação:
- Email: suporte@kala.ao (configurar)

---

**Desenvolvido com ❤️ para Angola 🇦🇴**

Última atualização: 14 de Janeiro de 2026
