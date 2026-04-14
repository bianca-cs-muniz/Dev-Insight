import { GithubService } from '../dominio/servicos/GithubService';
import { GerarInsights } from '../dominio/utils/GerarInsights';
import { GithubScoreIA } from '../dominio/utils/GithubScoreIA';

export class BuscarUsuario {
  constructor(private readonly githubService: GithubService) {}

  async execute(nomeUsuario: string) {
    const usuario = await this.githubService.buscarUsuario(nomeUsuario);
    const repositorios = await this.githubService.buscarRepos(nomeUsuario);

    const contagemLinguagens: Record<string, number> = {};

    for (const repositorio of repositorios) {
      const linguagem = repositorio.language;
      if (!linguagem) continue;

      contagemLinguagens[linguagem] = (contagemLinguagens[linguagem]?? 0) + 1;
    }

    const dadosFrequencia = { totalUltimosRepos: repositorios.length };

    const insights = GerarInsights.executar(
      usuario,
      repositorios,
      contagemLinguagens,
      dadosFrequencia
    );

    const pontuacao = GithubScoreIA.calcular(
      usuario,
      repositorios,
      contagemLinguagens,
      dadosFrequencia
    );

    return {
      user: usuario,
      repos: repositorios,
      insights,
      score: pontuacao,
      totalRepos: repositorios.length,
      followers: usuario.followers,
      following: usuario.following,
      publicRepos: usuario.public_repos,
    };
  }
}