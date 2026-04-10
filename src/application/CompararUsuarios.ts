import { GithubService } from '../domain/services/GithubService';
import { GithubScoreIA } from '../domain/utils/GithubScoreIA';

export class CompararUsuarios {
  constructor(private service: GithubService) {}

  async execute(user1: string, user2: string) {
    const [u1, u2] = await Promise.all([
      this.service.buscarUsuario(user1),
      this.service.buscarUsuario(user2),
    ]);

    const [repos1, repos2] = await Promise.all([
      this.service.buscarRepos(user1),
      this.service.buscarRepos(user2),
    ]);

    const montarLinguagens = (repos: any[]) => {
      const langs: Record<string, number> = {};

      repos.forEach((r) => {
        if (r.language) {
          langs[r.language] = (langs[r.language] || 0) + 1;
        }
      });

      return langs;
    };

    const score1 = GithubScoreIA.calcular(u1, repos1, montarLinguagens(repos1), 
      { totalUltimosRepos: repos1.length });

    const score2 = GithubScoreIA.calcular(u2, repos2, montarLinguagens(repos2),
      { totalUltimosRepos: repos2.length });

    const vencedor = score1.score > score2.score ? user1 : user2;

    return {
      user1: {
        dados: u1,
        score: score1,
      },
      user2: {
        dados: u2,
        score: score2,
      },
      vencedor,
    };
  }
}