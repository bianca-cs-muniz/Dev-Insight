import { useQuery } from '@tanstack/react-query';
import compararGitHubService from '../services/compararGitHub.service';
import { GithubMapper, FormattedUser } from '../shared/mappers/GithubMapper';
import { GithubCompareResponse } from '../shared/types/github';

interface ComparisonResult {
  dev1: FormattedUser;
  dev2: FormattedUser;
  insights: { texto: string }[];
  badges: {
    maisAtivo: string;
    maisEstudioso: string;
    maisConsistente: string;
  };
}

const formatarComparacao = (data: GithubCompareResponse): ComparisonResult => {
  const dev1Formatted = GithubMapper.toUI(data.user1);
  const dev2Formatted = GithubMapper.toUI(data.user2);

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

