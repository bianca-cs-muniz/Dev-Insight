# 🔍 Dev-Insight: GitHub Intelligence Platform

O **Dev-Insight** é uma solução Full-Stack completa projetada para transformar perfis do GitHub em inteligência acionável. A plataforma analisa métricas complexas de desenvolvedores, gera scores baseados em performance real e oferece ferramentas de comparação visual para recrutadores e desenvolvedores.

---

## 🚀 O que o Sistema faz?

- **Análise Profunda**: Conecta-se à API do GitHub para extrair dados de repositórios, estrelas, forks, seguidores e atividade recente.
- **Score Inteligente**: Aplica um algoritmo proprietário para calcular a senioridade e relevância de um desenvolvedor no ecossistema (de 0 a 100).
- **Relatórios Visuais**: Transforma dados técnicos em gráficos intuitivos e cards elegantes com estética Glassmorphism.
- **Insights com IA**: Gera feedbacks automáticos sobre pontos fortes e áreas de foco do perfil analisado.
- **Duelo de Perfis**: Permite comparar dois desenvolvedores lado a lado, identificando quem possui maior impacto técnico com base em métricas reais.

---

## 🛠️ Stack Tecnológica

O ecossistema Dev-Insight é dividido em dois repositórios principais:

### 🎨 [Front-end (WebApp)](./WebApp)
Uma interface futurista e performática focada na experiência do usuário.
- **Framework**: Next.js 15+ (App Router) & React 19.
- **Estilização**: Tailwind CSS 4 & Glassmorphism UI.
- **Gráficos**: Recharts para visualização de dados.
- **Data Fetching**: TanStack Query (React Query) para cache e sincronização de estado.
- **Design**: Micro-animações e layout totalmente responsivo.

### ⚙️ [Back-end (WebApi)](./WebApi)
Um motor de processamento robusto seguindo padrões de arquitetura corporativa.
- **Ambiente**: Node.js & TypeScript.
- **Arquitetura**: Clean Architecture (Separação clara entre Domínio, Aplicação e Infraestrutura).
- **Segurança**: Validação de dados com Zod e Middlewares personalizados.
- **Performance**: Sistema de Cache em memória para otimização de requisições à API do GitHub.
- **Algoritmos**: Motor de cálculo de score normalizado via logaritmo.

---

## 📁 Estrutura do Projeto

```bash
Dev-Insight/
├── 🌐 WebApp/       # Front-end (Next.js, Tailwind, React Query)
│   ├── app/         # Rotas e Layouts
│   └── src/         # Componentes, Hooks e Serviços
└── 🏗️ WebApi/       # Back-end (Node.js, Express, Clean Architecture)
    ├── src/
    │   ├── dominio/ # Regras de negócio e Utils de cálculo
    │   ├── aplicacao/# Casos de uso
    │   └── infra/   # Implementações técnicas e integradores
```

---

## 🏃 Como Rodar o Projeto Completo

Para rodar o Dev-Insight localmente, você precisará de dois terminais abertos:

### 1. Iniciar o Back-end
```bash
cd WebApi
npm install
npm run dev
```
*A API estará rodando em `http://localhost:3009`.*

### 2. Iniciar o Front-end
```bash
cd WebApp
npm install
npm run dev
```
*O App estará rodando em `http://localhost:3000`.*

---

## 📜 Documentações Detalhadas

Para informações técnicas específicas, consulte os READMEs internos:
- [Documentação Técnica da API (Arquitetura e Cálculos)](./WebApi/README.md)
- [Documentação do Front-end (Design e Componentes)](./WebApp/README.md)

---

Desenvolvido por **Dev-Insight Team** | [Bianca Muñiz](https://github.com/Bia07003MuNiz)
