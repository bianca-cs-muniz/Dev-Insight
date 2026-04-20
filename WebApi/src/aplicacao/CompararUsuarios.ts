import { IGithubRepository } from '../dominio/repositorios/IGithubRepository';
import { IGithubScoreIA } from '../dominio/servicos/IGithubScoreIA';
import { LinguagemUtils } from '../dominio/utils/LinguagemUtils';

export class CompararUsuarios {
  constructor(
    private readonly githubRepository: IGithubRepository,
    private readonly githubScoreIA: IGithubScoreIA,
  ) {}

  async execute(nomeUsuario1: string, nomeUsuario2: string) {
    const [usuario1, usuario2, repositorios1, repositorios2, eventos1, eventos2] = await Promise.all([
      this.githubRepository.buscarUsuario(nomeUsuario1),
      this.githubRepository.buscarUsuario(nomeUsuario2),
      this.githubRepository.buscarRepos(nomeUsuario1),
      this.githubRepository.buscarRepos(nomeUsuario2),
      this.githubRepository.buscarEventos(nomeUsuario1),
      this.githubRepository.buscarEventos(nomeUsuario2),
    ]);

    const linguagensUsuario1 = LinguagemUtils.contar(repositorios1);
    const linguagensUsuario2 = LinguagemUtils.contar(repositorios2);

    const processarFrequencia = (eventos: any[], repos: any[]) => {
      const pushEvents = eventos.filter(e => e.type === 'PushEvent');
      const totalCommits = pushEvents.reduce((acc, e) => acc + (e.payload?.commits?.length || 0), 0);
      const diasAtivos = new Set(eventos.map(e => new Date(e.created_at).toDateString())).size;
      return { totalUltimosRepos: repos.length, diasAtivos, totalCommits };
    };

    const freq1 = processarFrequencia(eventos1, repositorios1);
    const freq2 = processarFrequencia(eventos2, repositorios2);

    const pontuacao1 = this.githubScoreIA.calcular(
      usuario1,
      repositorios1,
      linguagensUsuario1,
      freq1
    );

    const pontuacao2 = this.githubScoreIA.calcular(
      usuario2,
      repositorios2,
      linguagensUsuario2,
      freq2
    );

    let vencedor = 'empate';
    if (pontuacao1.score > pontuacao2.score) {
      vencedor = nomeUsuario1;
    } else if (pontuacao2.score > pontuacao1.score) {
      vencedor = nomeUsuario2;
    }

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