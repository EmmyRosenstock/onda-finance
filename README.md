#  Onda Finance

> Uma experiência moderna de gestão financeira construída com foco em UX, arquitetura escalável e boas práticas de front-end.

---

## 🚀 Acesse o projeto

🌐 **Aplicação online:**  
👉 https://SEU-LINK-AQUI.vercel.app  

 **Repositório:**  
 https://github.com/EmmyRosenstock/onda-finance 

---

## ✨ Visão geral

O **Onda Finance** é uma aplicação que simula um ambiente bancário digital, permitindo ao usuário:

- Criar conta
- Realizar login
- Visualizar saldo
- Realizar depósitos
- Fazer transferências
- Acompanhar transações

Tudo isso com uma interface moderna inspirada em fintechs como Nubank e Stripe.

---

## 🧠 Objetivo do projeto

Este projeto foi desenvolvido para demonstrar:

- Capacidade de construção de interfaces modernas
- Organização de código escalável
- Uso de múltiplas bibliotecas em conjunto
- Boas práticas de desenvolvimento front-end
- Simulação de regras de negócio reais

---

## 🛠️ Stack utilizada

| Tecnologia | Função |
|------|--------|
| React + TypeScript | Base da aplicação |
| Vite | Build e ambiente rápido |
| Tailwind CSS | Estilização moderna |
| CVA | Componentes reutilizáveis |
| React Router | Navegação |
| React Query | Gerenciamento de dados assíncronos |
| Zustand | Estado financeiro |
| Redux Toolkit | Estado de autenticação |
| React Hook Form | Formulários |
| Zod | Validação |
| Axios | Requisições HTTP |
| Vitest | Testes |

---

## 🧩 Arquitetura

O projeto segue uma separação clara de responsabilidades:

```bash
src/
  api/            # Configuração de requisições
  components/     # Componentes reutilizáveis
  hooks/          # Hooks customizados
  pages/          # Páginas da aplicação
  redux/          # Estado global (auth)
  store/          # Estado financeiro (Zustand)
  lib/            # Utilidades (CVA, helpers)
  tests/          # Testes