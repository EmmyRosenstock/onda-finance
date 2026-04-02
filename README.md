#  Onda Finance

> Uma experiência moderna de gestão financeira construída com foco em UX, arquitetura escalável e boas práticas de front-end.

---

##  Acesse o projeto
 **Aplicação online:**  
https://onda-finance-sigma.vercel.app/

 **Repositório:**  
 https://github.com/EmmyRosenstock/onda-finance 

---

## Visão geral

O **Onda Finance** é uma aplicação que simula um ambiente bancário digital, permitindo ao usuário:

- Criar conta
- Realizar login
- Visualizar saldo
- Realizar depósitos
- Fazer transferências
- Acompanhar transações


---

##  Objetivo do projeto

Este projeto foi desenvolvido para demonstrar:

- Capacidade de construção de interfaces modernas
- Organização de código escalável
- Uso de múltiplas bibliotecas em conjunto
- Boas práticas de desenvolvimento front-end
- Simulação de regras de negócio reais

---

##  Stack utilizada

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

##  Arquitetura

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

  ## Segurança

 Este projeto é uma simulação front-end. Abaixo está como ele seria protegido em produção.

 Engenharia reversa

Para mitigar engenharia reversa:

Código minificado e otimizado em produção
Remoção de logs sensíveis
Nenhuma lógica crítica exposta no front-end
Uso de variáveis de ambiente seguras
Separação de responsabilidades (front vs backend)
Regras sensíveis implementadas no servidor

## Vazamento de dados

Para evitar vazamento de dados:

Comunicação via HTTPS
Tokens seguros (JWT) com expiração
Cookies HttpOnly para sessão
Nunca armazenar senha em texto puro
Criptografia e hashing no backend
Controle de acesso por usuário
Proteção contra XSS e CSRF
Minimização de dados expostos

## Importante

Nesta versão:

O login utiliza localStorage apenas para simulação
Não é adequado para produção real
 ## Como rodar o projeto
 -> Instalar dependências
npm install
 -> Rodar em desenvolvimento
npm run dev
 -> Build de produção
npm run build
 -> Rodar testes
npm run test

 ## Melhorias futuras
Integração com backend real
Autenticação com JWT
Dashboard com gráficos reais
Modo dark/light
Notificações em tempo real
Testes E2E
Upload de comprovantes
Controle financeiro avançado
## Autor

Desenvolvido Emmy Rosenstock

💬 Considerações finais

Este projeto foi desenvolvido com foco em demonstrar não apenas código funcional, mas pensamento de produto, experiência do usuário e arquitetura escalável.