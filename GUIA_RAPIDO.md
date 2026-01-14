# 🚀 GUIA RÁPIDO - KALA MVP

## ✅ O QUE ESTÁ PRONTO

### 1. **Landing Page Completa**
- Design moderno com gradientes purple/pink
- Headline clara: "Recebe mensagens anónimas dos teus amigos"
- CTAs para criar conta
- Seções de features e "Como funciona"
- Footer com bandeira de Angola 🇦🇴

### 2. **Sistema de Autenticação**
- Login com Google (UI pronta)
- Login com Email/Password (UI pronta)
- Criação de conta com escolha de username
- Preview do link pessoal durante registro

### 3. **Dashboard Interativo**
- Link pessoal para partilhar
- Botão de copiar link
- Botão de partilhar (funciona no mobile com Web Share API)
- Contador de mensagens (X / 80)
- Barra de progresso visual
- Lista de mensagens recebidas com timestamps
- CTA para Premium quando se aproxima do limite

### 4. **Página Pública de Envio**
- Design limpo e convidativo
- Campo de texto com contador de caracteres (10-500)
- Aviso de anonimato garantido
- Validação de mensagens
- Confirmação de envio com animação
- Responsiva para mobile

### 5. **Página Premium**
- Preço destacado: 3.000 Kz/mês
- Lista de benefícios (mensagens ilimitadas, badge, suporte)
- Comparação Grátis vs Premium
- Botão "Pagar com Multicaixa / Unitel Money"
- FAQ integrada

### 6. **Página de Conta**
- Informações do perfil (username, email)
- Data de criação da conta
- Estado da subscrição
- Botão de upgrade para premium
- Botão de logout

## 🎨 DESIGN IMPLEMENTADO

- ✅ Mobile-first (testado em 375px)
- ✅ Gradientes suaves purple/pink
- ✅ Ícones lucide-react
- ✅ Componentes shadcn/ui
- ✅ Animações e transições suaves
- ✅ Dark mode ready (via Tailwind)
- ✅ Linguagem 100% em Português de Angola

## 📱 ROTAS FUNCIONAIS

```
/                    → Landing page
/auth/login          → Login/Registro
/dashboard           → Dashboard do utilizador
/m/{username}        → Página pública de envio
/premium             → Upgrade para premium
/conta               → Configurações da conta
```

## 🔄 FLUXOS TESTADOS

1. **Novo Utilizador:**
   - Landing → Criar Conta → Escolher username → Dashboard

2. **Enviar Mensagem:**
   - Aceder /m/username → Escrever mensagem → Enviar → Confirmação

3. **Ver Mensagens:**
   - Dashboard → Ver lista de mensagens recebidas

4. **Upgrade Premium:**
   - Dashboard → Ver Plano Premium → Página Premium → Botão de Pagamento

## 🛠️ TECNOLOGIAS USADAS

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** JavaScript (pronto para TypeScript)
- **Styling:** Tailwind CSS
- **Componentes:** shadcn/ui (Button, Card, Input, Textarea, Alert, Progress)
- **Ícones:** lucide-react + react-icons (Google)
- **Responsivo:** Mobile-first design

## ⚠️ PENDENTE (Próxima Fase)

### Firebase Integration
- [ ] Configurar projeto Firebase
- [ ] Adicionar credenciais ao .env
- [ ] Implementar Firebase Auth real
- [ ] Conectar Firestore para mensagens
- [ ] Security Rules

### AppyPay Integration
- [ ] Criar conta merchant
- [ ] Obter API keys
- [ ] Implementar fluxo de pagamento
- [ ] Webhook de confirmação

### Deploy
- [ ] Configurar domínio kala.ao
- [ ] Deploy em produção
- [ ] Configurar variáveis de ambiente
- [ ] SSL certificate

## 💾 DADOS ATUAIS (Mock)

**Importante:** Atualmente a aplicação usa `localStorage` para simular:
- Autenticação de utilizadores
- Armazenamento de mensagens
- Estado de subscrição

Isso permite testar todos os fluxos sem Firebase. Os dados são locais ao navegador.

## 🎯 COMO TESTAR

### 1. Criar Conta:
```
1. Aceda http://localhost:3000
2. Clique em "Criar Conta"
3. Use qualquer email/password
4. Escolha um username
5. Será redirecionado para o Dashboard
```

### 2. Enviar Mensagem (teste em outra janela anónima):
```
1. No Dashboard, copie o link pessoal
2. Abra em janela anónima/outro navegador
3. Escreva uma mensagem (mín. 10 caracteres)
4. Clique "Enviar Mensagem Anónima"
5. Verá confirmação de sucesso
```

### 3. Testar Limite:
```
1. No Dashboard, veja o contador X / 80
2. Ao aproximar-se de 80, veja o CTA Premium
3. Clique para ver detalhes do plano
```

### 4. Testar Mobile:
```
1. Abra DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Escolha iPhone ou Galaxy
4. Teste todos os fluxos
```

## 📸 SCREENSHOTS DISPONÍVEIS

```
/app/screenshot_landing.png          → Landing page desktop
/app/screenshot_login.png            → Página de login
/app/screenshot_dashboard.png        → Dashboard com mensagens
/app/screenshot_premium.png          → Página Premium
/app/screenshot_conta.png            → Página de conta
/app/screenshot_send_message.png     → Página de envio
/app/screenshot_mobile_send.png      → Mobile: formulário vazio
/app/screenshot_mobile_filled.png    → Mobile: com mensagem
/app/screenshot_mobile_success.png   → Mobile: confirmação
```

## 🐛 DEBUGGING

### Ver logs do servidor:
```bash
tail -f /var/log/supervisor/nextjs.out.log
```

### Reiniciar servidor:
```bash
sudo supervisorctl restart nextjs
```

### Verificar se está rodando:
```bash
curl http://localhost:3000
```

## 📝 PRÓXIMAS TAREFAS SUGERIDAS

### Prioridade Alta:
1. **Integrar Firebase** - Autenticação e Firestore
2. **Configurar Security Rules** - Proteger dados
3. **Implementar AppyPay** - Pagamentos reais

### Prioridade Média:
4. Rate limiting no envio de mensagens
5. Moderação de conteúdo
6. Notificações de novas mensagens
7. Analytics (quantas mensagens, utilizadores, etc)

### Prioridade Baixa:
8. Temas personalizados
9. Exportar mensagens
10. Estatísticas avançadas (Premium feature)

## 🎉 CONCLUSÃO

O MVP está **100% funcional** em modo de desenvolvimento. Todas as telas estão prontas, o design está polido, e os fluxos estão testados.

**Próximo passo:** Adicionar credenciais Firebase e AppyPay para tornar a aplicação produtiva.

Qualquer dúvida, consulte o `README_KALA.md` para instruções detalhadas de integração.

---

**Desenvolvido para Angola 🇦🇴 com Next.js + Tailwind + shadcn/ui**
