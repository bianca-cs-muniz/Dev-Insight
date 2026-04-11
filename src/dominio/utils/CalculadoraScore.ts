export class CalcularScoreDev {
  static executar(user: any, repos: any[], linguagens: Record<string, number>, freq: { totalUltimosRepos: number }) {
    const pontos = {
      seguidores: Math.min(user.followers / 5, 100),
      repositorios: Math.min(repos.length * 5, 100),
      frequencia: Math.min(freq.totalUltimosRepos * 10, 100),
      linguagens: Math.min(Object.keys(linguagens).length * 15, 100),
      estrelas: Math.min(repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0) * 2, 100),
    };

    const score = Math.round(
      pontos.seguidores   * 0.25 +
      pontos.repositorios * 0.20 +
      pontos.frequencia   * 0.20 +
      pontos.linguagens   * 0.15 +
      pontos.estrelas     * 0.20,
    );

    const nivel =
      score < 30 ? 'Iniciante' :
      score < 60 ? 'Intermediário' :
      score < 80 ? 'Avançado' : 'Especialista';

    return { score, nivel, detalhes: pontos };
  }
}