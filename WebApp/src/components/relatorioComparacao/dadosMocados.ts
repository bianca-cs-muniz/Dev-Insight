export const dadosMocados = {
  dev1: {
    nome: 'Dan Abramov',
    username: 'gaearon',
    avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
    seguidores: 83500,
    repositorios: 264,
    linguagemPrincipal: 'JavaScript',
    pontuacao: {
      atividade: 85,
      popularidade: 98,
      qualidade: 92,
      consistencia: 87,
      stack: 90,
    },
    commitsRecentes: 45,
    starsTotais: 185200,
    forksTotais: 12400,
    linguagens: [
      { nome: 'JavaScript', porcentagem: 67 },
      { nome: 'TypeScript', porcentagem: 16 },
      { nome: 'Html', porcentagem: 8 },
      { nome: 'CSS', porcentagem: 6 },
      { nome: 'Others', porcentagem: 3 },
    ],
    projetosDestaque: [
      { nome: 'react', stars: '215k', descricao: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.', linguagem: 'JavaScript' },
      { nome: 'redux', stars: '60k', descricao: 'Predictable state container for JavaScript apps.', linguagem: 'JavaScript' },
      { nome: 'create-react-app', stars: '100k', descricao: 'Set up a modern web app by running one command.', linguagem: 'JavaScript' },
    ],
  },
  dev2: {
    nome: 'Takuya Matsuyama',
    username: 'tji',
    avatar: 'https://avatars.githubusercontent.com/u/41565?v=4',
    seguidores: 3200,
    repositorios: 154,
    linguagemPrincipal: 'TypeScript',
    pontuacao: {
      atividade: 75,
      popularidade: 82,
      qualidade: 88,
      consistencia: 79,
      stack: 85,
    },
    commitsRecentes: 12,
    starsTotais: 19700,
    forksTotais: 2100,
    linguagens: [
      { nome: 'TypeScript', porcentagem: 58 },
      { nome: 'JavaScript', porcentagem: 22 },
      { nome: 'Swift', porcentagem: 12 },
      { nome: 'Rust', porcentagem: 5 },
      { nome: 'Others', porcentagem: 3 },
    ],
    projetosDestaque: [
      { nome: 'inkdrop', stars: '2.5k', descricao: 'The notebook app for Markdown lovers.', linguagem: 'TypeScript' },
      { nome: 'homepage', stars: '1.2k', descricao: 'Personal website built with Next.js.', linguagem: 'TypeScript' },
      { nome: 'use-clippy', stars: '800', descricao: 'A React hook to handle clipboard.', linguagem: 'TypeScript' },
    ],
  },
  insights: [
    { texto: '@gaearon tem maior consistência com 5 push events recentes vs 0 de @tji' },
    { texto: '@tji possui maior impacto em projetos populares com 19.7k stars no total' },
    { texto: 'Perfis complementares: @gaearon é Frontend e @tji é DevOps' },
    { texto: '@gaearon se destaca com score 87 vs 79 de @tji' },
  ],
  badges: {
    maisAtivo: 'gaearon',
    maisInfluente: 'tji',
    maisConsistente: 'empate'
  }
};
