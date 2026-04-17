import { GithubService } from '../dominio/servicos/GithubService';
import { GithubScoreIA } from '../dominio/utils/GithubScoreIA';

export class CompararUsuarios {
  constructor(private readonly githubService: GithubService) {}

  async execute(nomeUsuario1: string, nomeUsuario2: string) {
    const [usuario1, usuario2] = await Promise.all([
      this.githubService.buscarUsuario(nomeUsuario1),
      this.githubService.buscarUsuario(nomeUsuario2),
    ]);

    const [repositorios1, repositorios2] = await Promise.all([
      this.githubService.buscarRepos(nomeUsuario1),
      this.githubService.buscarRepos(nomeUsuario2),
    ]);

    const contarLinguagens = (repositorios: any[]) => {
      const contagem: Record<string, number> = {};

      for (const repo of repositorios) {
        const linguagem = repo.language;
        if (!linguagem) continue;

        contagem[linguagem] = (contagem[linguagem]?? 0) + 1;
      }

      return contagem;
    };

    const linguagensUsuario1 = contarLinguagens(repositorios1);
    const linguagensUsuario2 = contarLinguagens(repositorios2);

    const pontuacao1 = GithubScoreIA.calcular(
      usuario1,
      repositorios1,
      linguagensUsuario1,
      { totalUltimosRepos: repositorios1.length }
    );

    const pontuacao2 = GithubScoreIA.calcular(
      usuario2,
      repositorios2,
      linguagensUsuario2,
      { totalUltimosRepos: repositorios2.length }
    );

    const vencedor = pontuacao1.score > pontuacao2.score? nomeUsuario1 : nomeUsuario2;

    return {
      user1: {
        dados: usuario1,
        score: pontuacao1,
        repos: repositorios1,
        linguagens: linguagensUsuario1,
      },
      user2: {
        dados: usuario2,
        score: pontuacao2,
        repos: repositorios2,
        linguagens: linguagensUsuario2,
      },
      vencedor,
    };
  }
}