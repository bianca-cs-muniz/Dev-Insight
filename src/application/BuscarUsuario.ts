import { GithubService } from '../domain/services/GithubService';
import { GerarInsights } from '../domain/utils/GerarInsights';
import { GithubScoreIA } from '../domain/utils/GithubScoreIA';

export class BuscarUsuario {
  constructor(private service: GithubService) {}

  async execute(username: string) {
    const user = await this.service.buscarUsuario(username);
    const repos = await this.service.buscarRepos(username);

    const linguagens: Record<string, number> = {};

    repos.forEach((repo: any) => {
      if (repo.language) {
        linguagens[repo.language] =
          (linguagens[repo.language] || 0) + 1;
      }
    });

    const freq = { totalUltimosRepos: repos.length };
    const insights = GerarInsights.executar(user, repos, linguagens, freq);
    const score = GithubScoreIA.calcular(user, repos, linguagens, freq);

    return {
      user,
      repos,
      insights,
      score,
      totalRepos: repos.length,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
    };
  }
}