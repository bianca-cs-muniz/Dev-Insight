# DevInsight - WebApp

## 🚀 Sobre o Projeto
O **DevInsight** é uma plataforma moderna de análise de perfis do GitHub. O objetivo principal é fornecer insights visuais e detalhados sobre a atividade de desenvolvedores, transformando dados brutos da API do GitHub em relatórios elegantes com gráficos e métricas de desempenho.

## 🛠️ Tecnologias Utilizadas
- **Core**: [Next.js 15+](https://nextjs.org/) & [React 19](https://react.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) & [Material UI (MUI)](https://mui.com/)
- **Gerenciamento de Dados**: [TanStack Query (v5)](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Visualização de Dados**: [Recharts](https://recharts.org/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Tipografia**: [Google Fonts](https://fonts.google.com/) (Geist, Alfa Slab One)

## 📂 Estrutura de Pastas
O projeto utiliza a estrutura do `App Router` do Next.js, mas centraliza a lógica de negócios e componentes dentro do diretório `src/`:

- `app/`: Configurações globais, metadados e o ponto de entrada principal (`page.tsx`).
- `src/`:
  - `components/`: Componentes modulares, organizados por funcionalidades (`buscarUsuario`, `relatorioUsuario`).
  - `services/`: Camada de comunicação com APIs externas e configuração do cliente HTTP.
  - `Router/`: Lógica central de alternância de visualização baseada em estados da URL.
  - `hooks/`: Hooks customizados para encapsular lógica de estado e efeitos.
  - `lib/`: Configurações de bibliotecas e definições de design (fontes, temas).
  - `utils/`: Funções auxiliares, formatações e máscaras.
  - `constants/`: Enums, configurações de ambiente e valores estáticos.

## 🛣️ Rotas e Navegação
A aplicação opera em uma estrutura de **Single Page Application (SPA)** dentro da rota raíz:

- **Busca**: `/` (Estado inicial)
- **Dashboard/Relatório**: `/?gitHub={username}`
  - O componente `Router` monitora o parâmetro `gitHub` na URL para renderizar dinamicamente o relatório do usuário solicitado ou a tela de busca inicial.

## 🏃 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### Instalação

1. Clone o repositório e navegue até a pasta `WebApp`:
   ```bash
   cd WebApp
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raíz da pasta `WebApp`:
   ```env
   NEXT_PUBLIC_API_URL=SUA_URL_DA_API_AQUI
   ```

### Execução

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.

---
Desenvolvido com foco em performance e experiência do usuário. 💻✨
