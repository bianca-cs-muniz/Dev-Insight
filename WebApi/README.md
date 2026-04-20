# 🚀 Dev-Insight API (Backend)

Bem-vindo à documentação oficial da **Dev-Insight API**. Este projeto é o motor de processamento de dados por trás da plataforma Dev-Insight, responsável por analisar perfis do GitHub, calcular métricas de performance e realizar comparações inteligentes entre desenvolvedores.

---

## 🛠️ Tecnologias e Ferramentas

A API foi construída utilizando as melhores práticas de desenvolvimento back-end:

- **Node.js & TypeScript**: Ambiente de execução e linguagem com tipagem estática para maior segurança.
- **Express**: Framework web robusto para gerenciamento de rotas e middlewares.
- **Axios**: Cliente HTTP para integração com a API oficial do GitHub.
- **Zod**: Validação rigorosa de esquemas de dados.
- **Node-Cache / Redis**: Sistema de cache para otimizar a performance e evitar limites de taxa (rate limit) da API do GitHub.
- **Clean Architecture**: Estrutura organizada para garantir manutenibilidade e escalabilidade.

---

## 🏗️ Arquitetura do Sistema

O projeto segue os princípios da **Clean Architecture**, dividindo responsabilidades de forma clara:

- **`src/apresentacao`**: Camada de entrada. Contém os controladores (Controllers) que recebem as requisições HTTP e os middlewares de validação.
- **`src/aplicacao`**: Contém os **Casos de Uso (Use Cases)**. Aqui reside a orquestração da lógica de negócio (ex: buscar usuário, comparar perfis).
- **`src/dominio`**: O coração do sistema. Define as interfaces (contratos), tipos globais e utilitários de cálculo (como o motor de Score).
- **`src/infra`**: Implementações de detalhes técnicos, como o cliente HTTP, repositórios de dados e mecanismos de cache.
- **`src/mensagem`**: Centralização de mensagens de erro e exceções personalizadas.

---

## 📊 Lógica de Score e Nível (O "Tipo" de Dev)

A inteligência da API reside no `GithubScoreIA`, que processa os dados brutos e gera um **Score (0 a 100)** e um **Nível de Senioridade**.

### Como o Score é calculado?
O cálculo é baseado em pesos específicos para diferentes métricas, normalizados através de uma função logarítmica para garantir que usuários extremamente populares não quebrem a escala:

| Métrica | Peso | Descrição |
| :--- | :--- | :--- |
| **Repositórios** | 15% | Quantidade total de repositórios públicos. |
| **Estrelas (Stars)** | 25% | Reconhecimento da comunidade através de estrelas recebidas. |
| **Forks** | 10% | Impacto do código (outras pessoas replicando seus projetos). |
| **Seguidores** | 15% | Relevância e influência social no ecossistema Dev. |
| **Atividade** | 10% | Frequência de atualizações baseada nos repositórios recentes. |
| **Linguagens** | 10% | Diversidade tecnológica e domínio de diferentes stacks. |
| **Engajamento** | 15% | Proporção entre seguidores e seguidos. |

### Definição do Nível (Senioridade)
Com base no score final, o desenvolvedor é classificado em:
- **Iniciante**: Score < 30
- **Intermediário**: Score entre 30 e 54
- **Avançado**: Score entre 55 e 79
- **Especialista**: Score >= 80

---

## ⚔️ Lógica de Comparação (O Vencedor)

O endpoint de comparação analisa dois desenvolvedores simultaneamente. O **Vencedor** é determinado de forma puramente matemática:

1. A API calcula o score detalhado de ambos os usuários individualmente.
2. Compara os valores absolutos dos scores finais.
3. Se `Score A > Score B`, o Usuário A é o vencedor.
4. Se os scores forem idênticos, o resultado retorna como `"empate"`.

---

## 📡 Endpoints e Estrutura de Retorno

### 1. Relatório de Usuário
`GET /github/:username`

Retorna uma análise completa de um perfil.

**Dados retornados para o Front-end:**
- `user`: Objeto completo com dados do GitHub (avatar, bio, localização, etc).
- `repos`: Lista dos repositórios mais recentes.
- `score`: Objeto contendo o score total, o nível e o `breakdown` (pontuação de 0-100 em cada categoria).
- `insights`: Array de strings com feedbacks automáticos (ex: "Foco principal em TypeScript", "Boa relevância na comunidade").
- `totalRepos`, `followers`, `publicRepos`: Dados consolidados para exibição rápida.

### 2. Relatório de Comparação
`GET /comparar?user1={username}&user2={username}`

Realiza o "Duelo" entre dois perfis.

**Dados retornados para o Front-end:**
- `user1` e `user2`: Objetos contendo:
  - `dados`: Perfil do usuário.
  - `score`: Pontuação detalhada.
  - `repos`: Lista de repositórios.
  - `linguagens`: Contagem de linguagens utilizadas.
- `vencedor`: O nome de usuário do vencedor ou `"empate"`.

---

## 🚀 Como Rodar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Variáveis de Ambiente:**
   Crie um arquivo `.env`:
   ```env
   GITHUB_TOKEN=seu_token_aqui  # Aumenta o limite de requisições
   PORT=3009
   ```

3. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3009`.

---

Desenvolvido por **Dev-Insight Team** | [Bianca Muñiz](https://github.com/Bia07003MuNiz)
