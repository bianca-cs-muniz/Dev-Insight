export class GerarInsights {
  static executar(
    user: any,
    repos: any[],
    linguagens: Record<string, number>,
    freq: { totalUltimosRepos: number },
  ): string[] {
    const insights: string[] = [];

    if (repos.length < 5) {
      insights.push('Poucos repositórios públicos');
    }

    if (user.followers > 50) {
      insights.push('Boa relevância na comunidade');
    }

    if (freq.totalUltimosRepos < 10) {
      insights.push('Baixa frequência de commits');
    }

    const linguagemPrincipal = Object.keys(linguagens).reduce(
      (a, b) => (linguagens[a] > linguagens[b] ? a : b),
      '',
    );

    if (linguagemPrincipal) {
      insights.push(`Foco principal em ${linguagemPrincipal}`);
    }

    return insights;
  }
}