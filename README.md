# KALA - Plataforma de Mensagens Anónimas

Plataforma web inspirada no NGL, adaptada ao mercado angolano. Permite aos utilizadores criar links pessoais para receber mensagens anónimas.

## 🚀 Estrutura do Projeto (MVC)

O projeto foi reorganizado seguindo a arquitetura MVC (Model-View-Controller) para melhor escalabilidade e manutenção.

```
kala-app/
├── src/
│   ├── models/              # Lógica de dados e validações (User, Message, Subscription)
│   ├── controllers/         # Lógica de negócio (Auth, Messages, Payments)
│   ├── views/               # Interface do usuário (React)
│   │   ├── pages/           # Componentes de página
│   │   └── components/      # Componentes reutilizáveis (shadcn/ui)
│   ├── services/            # Serviços externos (Firebase, AppyPay)
│   ├── utils/               # Utilitários e helpers
│   └── hooks/               # React hooks customizados
├── app/                     # Next.js App Router (Rotas)
│   ├── api/                 # API Routes (Backend)
│   └── [pages]/             # Rotas de frontend (importam de src/views)
└── docs/                    # Documentação do projeto
```

## ✨ Funcionalidades

- **Mensagens Anónimas**: Envie e receba mensagens sem revelar a identidade.
- **Links Pessoais**: `kala.ao/m/username`
- **Dashboard**: Gerencie suas mensagens recebidas.
- **Premium**: Assinatura para mensagens ilimitadas e funcionalidades extras.

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Firestore (preparado)
- **Auth**: Firebase Auth (preparado)
- **Pagamentos**: AppyPay (preparado)

## 📦 Como Rodar

1. Instale as dependências:

```bash
yarn install
```

2. Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

3. Acesse `http://localhost:3000`

## 📚 Documentação

- [Guia Rápido](./docs/GUIA_RAPIDO.md)
- [Documentação Completa](./docs/README_KALA.md)
- [Estratégia e Negócio](./docs/STRATEGIC_BUSINESS.md)

## 🔒 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure suas credenciais:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...

# AppyPay
APPYPAY_API_KEY=...
```
