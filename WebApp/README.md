# 💎 Dev-Insight WebApp

O **Dev-Insight** é uma plataforma front-end premium projetada para transformar dados brutos do GitHub em experiências visuais ricas e intuitivas. Utilizando uma estética moderna baseada em **Glassmorphism**, a aplicação oferece dashboards detalhados e ferramentas de comparação de desenvolvedores.

---

## ✨ Funcionalidades Principais

- **🔍 Busca Inteligente**: Pesquisa instantânea de usuários do GitHub com suporte a parâmetros de URL para compartilhamento facilitado.
- **📊 Dashboard de Performance**: Relatórios completos contendo:
  - Distribuição de linguagens (Gráfico de Pizza).
  - Análise de métricas (Stars, Forks, Seguidores).
  - Insights gerados por IA sobre o perfil.
- **⚔️ Comparação de Perfis (Duelo)**: Interface lado a lado para comparar dois desenvolvedores, com indicadores de vencedor e breakdown de pontuação.
- **🎨 Design System Premium**: Interface futurista utilizando efeitos de desfoque, gradientes vibrantes e micro-animações.
- **📱 Responsividade Total**: Experiência otimizada para desktops, tablets e dispositivos móveis.

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Estado & Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Cliente HTTP**: [Axios](https://axios-http.com/)

---

## 🏗️ Estrutura do Projeto

A aplicação segue uma estrutura modular focada em componentes reutilizáveis:

- **`app/`**: Definição de rotas e layouts globais.
- **`src/components/`**: Componentes de UI organizados por contexto:
  - `buscar-usuario`: Lógica de busca e input.
  - `relatorio-usuario`: Cards, gráficos e informações do perfil individual.
  - `comparar-usuario`: Interface de seleção para duelo.
  - `relatorio-comparacao`: Visualização do resultado do duelo.
- **`src/services/`**: Camada de integração com a WebApi.
- **`src/hooks/`**: Hooks customizados para lógica de negócio e consumo de dados.
- **`src/lib/`**: Configurações de bibliotecas de terceiros.
- **`src/shared/`**: Componentes de UI genéricos (botões, inputs, cards).

---

## 🛣️ Rotas

- **Home**: `/` - Tela de busca e dashboard individual (via query params `?gitHub=username`).
- **Comparação**: `/comparar-perfis` - Ferramenta de duelo entre dois desenvolvedores.

---

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 18+
- [Dev-Insight WebApi](https://github.com/Bia07003MuNiz/Dev-Insight/tree/main/WebApi) rodando localmente ou em produção.

### Passo a Passo

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configuração das Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3009
   ```

3. **Inicie o ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse:**
   O projeto estará disponível em `http://localhost:3000`.

---

Desenvolvido com ❤️ por **Dev-Insight Team** | [Bianca Muñiz](https://github.com/Bia07003MuNiz)
