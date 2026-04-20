import { useQuery } from '@tanstack/react-query';
import compararGitHubService from '../services/compararGitHub.service';

const formatarComparacao = (data: any) => {
  const formatUser = (user: any) => ({
    nome: user.dados.name || user.dados.login,
    username: user.dados.login,
    avatar: user.dados.avatar_url,
    seguidores: user.dados.followers,
    repositorios: user.dados.public_repos,
    score: user.score.score,
    linguagemPrincipal:
      Object.keys(user.linguagens).length > 0
        ? Object.keys(user.linguagens).reduce((a, b) =>
            user.linguagens[a] > user.linguagens[b] ? a : b
          )
        : 'Múltiplas',
    pontuacao: {
      atividade: user.score.breakdown.atividade || 0,
      popularidade: user.score.breakdown.estrelas || 0,
      qualidade: user.score.breakdown.engajamento || 0,
      consistencia: user.score.breakdown.repos || 0,
      stack: user.score.breakdown.linguagens || 0,
    },
    starsTotais: user.repos.reduce(
      (acc: any, curr: any) => acc + (curr.stargazers_count || 0),
      0
    ),
    forksTotais: user.repos.reduce(
      (acc: any, curr: any) => acc + (curr.forks_count || 0),
      0
    ),
    commitsRecentes: user.repos.filter(
      (r: any) => {
        const pushAt = r.pushed_at ? new Date(r.pushed_at) : null;
        if (!pushAt) return false;
        const trintaDiasAtras = new Date();
        trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
        return pushAt >= trintaDiasAtras;
      }
    ).length,
    linguagens: Object.entries(user.linguagens)
      .map(([nome, count]: any) => ({
        nome,
        porcentagem: Math.round((count / Math.max(1, user.repos.length)) * 100),
      }))
      .sort((a, b) => b.porcentagem - a.porcentagem)
      .slice(0, 5),
    projetosDestaque: [...user.repos]
      .sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 3)
      .map((repo: any) => ({
        nome: repo.name,
        stars:
          (repo.stargazers_count || 0) >= 1000
            ? ((repo.stargazers_count || 0) / 1000).toFixed(1) + 'k'
            : String(repo.stargazers_count || 0),
        descricao: repo.description || 'Sem descrição',
        linguagem: repo.language || 'Geral',
      })),
    maturidade: user.repos.length > 0 
      ? Math.round(user.repos.reduce((acc: number, r: any) => {
          const inicio = new Date(r.created_at).getTime();
          const fim = new Date(r.pushed_at || r.updated_at).getTime();
          return acc + (fim - inicio) / (1000 * 60 * 60 * 24 * 30);
        }, 0) / user.repos.length)
      : 0,
    intensidade: user.score.breakdown.atividade,
  });

  const dev1Formatted = formatUser(data.user1);
  const dev2Formatted = formatUser(data.user2);

  const insights = [
    {
      texto: `@${dev1Formatted.username} tem ${dev1Formatted.repositorios} repositórios vs ${dev2Formatted.repositorios} de @${dev2Formatted.username}`,
    },
    {
      texto: `@${data.vencedor === 'empate' ? 'O confronto' : data.vencedor} ${data.vencedor === 'empate' ? 'terminou em empate' : 'apresenta um melhor desempenho geral'} com score ${
        data.vencedor === data.user1.dados.login || data.vencedor === 'empate'
          ? data.user1.score.score
          : data.user2.score.score
      }`,
    },
    {
      texto: `@${dev1Formatted.username} usa mais ${dev1Formatted.linguagemPrincipal} enquanto @${dev2Formatted.username} foca em ${dev2Formatted.linguagemPrincipal}`,
    },
  ];

  const badges = {
    maisAtivo:
      data.user1.score.breakdown.atividade > data.user2.score.breakdown.atividade
        ? data.user1.dados.login
        : data.user2.dados.login,
    maisEstudioso:
      data.user1.score.breakdown.linguagens > data.user2.score.breakdown.linguagens
        ? data.user1.dados.login
        : data.user2.dados.login,
    maisConsistente:
      data.user1.score.breakdown.repos > data.user2.score.breakdown.repos
        ? data.user1.dados.login
        : data.user2.dados.login,
  };

  return { dev1: dev1Formatted, dev2: dev2Formatted, insights, badges };
};

export const useCompararDadosGitHub = (user1: string, user2: string) => {
  return useQuery({
    queryKey: ['comparar-github', user1, user2],
    queryFn: () => compararGitHubService.compararPerfis(user1, user2).then(res => res.data),
    select: formatarComparacao,
    enabled: !!user1 && !!user2,
    refetchOnWindowFocus: false,
  });
};
