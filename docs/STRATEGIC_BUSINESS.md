# 🎯 Documentação Estratégica e de Negócio - KALA

## 1. Visão Geral do Produto
O **KALA** é uma plataforma de mensagens anónimas concebida especificamente para o mercado angolano. Inspirado em sucessos globais como o NGL, o KALA diferencia-se pela localização cultural, linguística e financeira.

### Proposta de Valor
- **Liberdade de Expressão:** Espaço seguro para feedback honesto e interações divertidas.
- **Identidade Local:** Focado no público angolano (domínio .ao, moeda Kwanza, gírias locais).
- **Simplicidade:** Fluxo de uso direto — criar link, partilhar, receber mensagens.

---

## 2. Análise Técnica (O que está a ser bem feito)

### ✅ Arquitetura MVC (Model-View-Controller)
Diferente de muitos projetos Next.js que misturam lógica de negócio nos componentes, o KALA utiliza uma estrutura MVC clara em `src/`.
- **Benefício:** Facilita a manutenção e permite que a lógica de backend (Controllers) seja testada independentemente da UI.

### ✅ Modelagem de Domínio Robusta
As entidades `User`, `Message` e `Subscription` possuem lógica de validação interna.
- **Exemplo:** `User.isValidUsername` e `Message.isValid` garantem a integridade dos dados antes mesmo de chegarem à base de dados.

### ✅ Interface Moderna e Responsiva
O uso de `shadcn/ui` com `Tailwind CSS` garante uma experiência de utilizador (UX) de alta qualidade, com componentes acessíveis e um design "mobile-first" que é essencial para o público-alvo.

### ✅ Preparação para Escalabilidade Financeira
A estrutura já prevê a integração com o **AppyPay**, demonstrando uma visão clara de monetização desde o MVP.

---

## 3. Oportunidades de Melhoria (Débito Técnico e Riscos)

### 🛠️ Migração para TypeScript
Atualmente, o projeto utiliza JavaScript. A migração para TypeScript reduziria drasticamente erros de "undefined" e melhoraria a produtividade com autocompletar mais inteligente.

### 🧪 Implementação de Testes Automatizados
O diretório `tests/` está praticamente vazio. Recomenda-se:
- **Testes Unitários:** Para os Controllers e Models em `src/`.
- **Testes de Integração:** Para os fluxos de API em `app/api/`.

### 🔐 Reforço na Segurança e Moderação
- **Regras do Firestore:** Garantir que apenas o dono da conta possa ler suas mensagens.
- **Filtro de Conteúdo:** Implementar um sistema de moderação para evitar bullying abusivo, o que é um risco reputacional para este tipo de plataforma.
- **Rate Limiting:** Proteger os endpoints de envio de mensagens contra ataques de spam.

### 📊 Consistência de Dados
Observou-se o uso misto de `new Date().toISOString()` e `serverTimestamp()`. Para evitar problemas de ordenação causados por relógios locais desalinhados, recomenda-se padronizar para `serverTimestamp()` em todas as operações de escrita no Firestore.

---

## 4. Estratégia de Negócio e Próximos Passos

### 📈 Funil de Conversão
Para impulsionar o crescimento, deve-se focar na otimização do funil:
1. **Atração:** Melhorar o SEO e o Social Preview (Open Graph) dos links dos utilizadores.
2. **Retenção:** Notificações push ou email quando uma nova mensagem é recebida.
3. **Monetização:** Finalizar a integração real com AppyPay e considerar pacotes de "Dicas" para revelar quem enviou a mensagem (modelo de negócio principal do NGL).

### 🇦🇴 Expansão Local
- Parcerias com influenciadores digitais angolanos.
- Campanhas focadas em datas festivas locais.

---

**Conclusão:** O código do KALA está bem estruturado e acima da média para um MVP. Focar em testes e segurança será o diferencial para transformar este projeto numa plataforma estável e lucrativa.
