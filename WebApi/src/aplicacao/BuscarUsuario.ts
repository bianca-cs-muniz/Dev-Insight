import { IGithubRepository } from '../dominio/repositorios/IGithubRepository';
import { IGerarInsights } from '../dominio/servicos/IGerarInsights';
import { IGithubScoreIA } from '../dominio/servicos/IGithubScoreIA';
import { LinguagemUtils } from '../dominio/utils/LinguagemUtils';

export class BuscarUsuario {
  constructor(
    private readonly githubRepository: IGithubRepository,
    private readonly gerarInsights: IGerarInsights,
    private readonly githubScoreIA: IGithubScoreIA,
  ) {}

  async execute(nomeUsuario: string) {
    const [usuario, repositorios, eventos] = await Promise.all([
      this.githubRepository.buscarUsuario(nomeUsuario),
      this.githubRepository.buscarRepos(nomeUsuario),
      this.githubRepository.buscarEventos(nomeUsuario),
    ]);

    const contagemLinguagens = LinguagemUtils.contar(repositorios);
    
    const pushEvents = eventos.filter(e => e.type === 'PushEvent');
    const totalCommits = pushEvents.reduce((acc, e) => acc + (e.payload?.commits?.length || 0), 0);
    const diasAtivos = new Set(eventos.map(e => new Date(e.created_at).toDateString())).size;

    const dadosFrequencia = { 
      totalUltimosRepos: repositorios.length,
      diasAtivos,
      totalCommits
    };

    const insights = this.gerarInsights.executar(
      usuario,
      repositorios,
      contagemLinguagens,
      dadosFrequencia
    );

    const pontuacao = this.githubScoreIA.calcular(
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