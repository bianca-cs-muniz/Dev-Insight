# 🚀 Dev-Insight API (Backend)

Bem-vindo à documentação oficial da **Dev-Insight API**. Este é o motor por trás da plataforma Dev-Insight, responsável por analisar perfis do GitHub, calcular métricas de desenvolvedores e realizar comparações inteligentes entre perfis.

## 🗒️ O que é o Backend?

O backend da Dev-Insight é uma API construída com **Node.js**, **TypeScript** e **Express**. Ele serve como uma camada de inteligência que consome a API oficial do GitHub, processa os dados brutos e os transforma em insights valiosos (como scores e níveis de experiência).

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **TypeScript**: Ambiente de execução e linguagem com tipagem estática.
- **Express**: Framework web para criação de rotas e middlewares.
- **Axios**: Cliente HTTP para comunicação com a API do GitHub.
- **Redis (ioredis)**: Preparado para cache de dados para performance (opcional na execução local).
- **Zod**: Validação de esquemas e dados de entrada.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Passo a Passo

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente (Opcional):**
   Crie um arquivo `.env` na raiz se desejar configurar tokens do GitHub para aumentar o limite de requisições.

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A API estará rodando em: `http://localhost:3009`

---

## ⚙️ O que o Backend faz?

O backend processa requisições complexas em etapas:

1.  **Coleta de Dados:** Busca informações de perfil e todos os repositórios públicos de um usuário no GitHub.
2.  **Análise de Métricas:** Avalia estrelas (stars), forks, quantidade de seguidores, diversidade de linguagens e frequência de commits.
3.  **Cálculo de Score (IA):** Utiliza um algoritmo próprio (`GithubScoreIA`) para gerar um score de 0 a 100, normalize os dados e define o nível do desenvolvedor.
4.  **Comparação:** Analisa dois perfis simultaneamente, define um vencedor com base nas métricas e retorna um breakdown detalhado de cada um.

---

## 📡 Endpoints e Retornos

### 1. Buscar Usuário
`GET /github/:username`

Retorna os dados processados de um único usuário.

**Exemplo de Resposta:**
```json
{
  "login": "octocat",
  "name": "The Octocat",
  "public_repos": 8,
  "followers": 3900,
  "score": 65,
  "nivel": "Avançado"
}
```

### 2. Comparar Usuários
`GET /comparar?user1={user1}&user2={user2}`

Retorna uma comparação detalhada entre dois desenvolvedores.

**O que ele retorna:**
- `user1` e `user2`: Objetos contendo dados do perfil e breakdown do score.
- `vencedor`: O nome do usuário que obteve a maior pontuação.
- `breakdown`: Pontuação detalhada por categoria (estrelas, forks, engajamento, etc).

---

## 🏗️ Estrutura de Pastas

O projeto utiliza uma arquitetura limpa (Clean Architecture):

- `src/aplicacao`: Casos de uso e lógica de negócio principal.
- `src/apresentacao`: Controladores e middlewares (Express).
- `src/dominio`: Entidades, serviços básicos e utilitários de cálculo.
- `src/infra`: Implementações externas como HTTP (servidor) e Cache (Redis).
- `src/mensagem`: Centralização de mensagens de erro e exceções.

---

Feito com ❤️ por [Bianca] (Dev-Insight Team)
