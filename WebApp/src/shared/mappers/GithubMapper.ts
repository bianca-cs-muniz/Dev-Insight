import { GithubCompareUser, GithubRepo } from "../types/github";

export interface FormattedUser {
  nome: string;
  username: string;
  avatar: string;
  seguidores: number;
  repositorios: number;
  score: number;
  linguagemPrincipal: string;
  pontuacao: {
    atividade: number;
    popularidade: number;
    qualidade: number;
    consistencia: number;
    stack: number;
  };
  starsTotais: number;
  forksTotais: number;
  commitsRecentes: number;
  linguagens: {
    nome: string;
    porcentagem: number;
  }[];
  projetosDestaque: {
    nome: string;
    stars: string;
    descricao: string;
    linguagem: string;
  }[];
  maturidade: number;
  intensidade: number;
}

export class GithubMapper {
  static toUI(user: GithubCompareUser): FormattedUser {
    const repos = user.repos || [];
    
    return {
      nome: user.dados.name || user.dados.login,
      username: user.dados.login,
      avatar: user.dados.avatar_url,
      seguidores: user.dados.followers,
      repositorios: user.dados.public_repos,
      score: user.score.score,
      linguagemPrincipal: this.getLinguagemPrincipal(user.linguagens),
      pontuacao: {
        atividade: user.score.breakdown.atividade || 0,
        popularidade: user.score.breakdown.estrelas || 0,
        qualidade: user.score.breakdown.engajamento || 0,
        consistencia: user.score.breakdown.repos || 0,
        stack: user.score.breakdown.linguagens || 0,
      },
      starsTotais: repos.reduce((acc, curr) => acc + (curr.stargazers_count || 0), 0),
      forksTotais: repos.reduce((acc, curr) => acc + (curr.forks_count || 0), 0),
      commitsRecentes: this.contarCommitsRecentes(repos),
      linguagens: this.formatarLinguagens(user.linguagens, repos.length),
      projetosDestaque: this.getProjetosDestaque(repos),
      maturidade: this.calcularMaturidade(repos),
      intensidade: user.score.breakdown.atividade || 0,
    };
  }

  private static getLinguagemPrincipal(linguagens: Record<string, number>): string {
    const keys = Object.keys(linguagens);
    if (keys.length === 0) return 'Múltiplas';
    return keys.reduce((a, b) => (linguagens[a] > linguagens[b] ? a : b));
  }

  private static contarCommitsRecentes(repos: GithubRepo[]): number {
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    return repos.filter(r => {
      const pushAt = r.pushed_at ? new Date(r.pushed_at) : null;
      return pushAt && pushAt >= trintaDiasAtras;
    }).length;
  }

  private static formatarLinguagens(linguagens: Record<string, number>, totalRepos: number) {
    return Object.entries(linguagens)
      .map(([nome, count]) => ({
        nome,
        porcentagem: Math.round((count / Math.max(1, totalRepos)) * 100),
      }))
      .sort((a, b) => b.porcentagem - a.porcentagem)
      .slice(0, 5);
  }

  private static getProjetosDestaque(repos: GithubRepo[]) {
    return [...repos]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 3)
      .map(repo => ({
        nome: repo.name,
        stars: (repo.stargazers_count || 0) >= 1000
            ? ((repo.stargazers_count || 0) / 1000).toFixed(1) + 'k'
            : String(repo.stargazers_count || 0),
        descricao: repo.description || 'Sem descrição',
        linguagem: repo.language || 'Geral',
      }));
  }

  private static calcularMaturidade(repos: GithubRepo[]): number {
    if (repos.length === 0) return 0;
    return Math.round(repos.reduce((acc, r) => {
      const inicio = new Date(r.created_at).getTime();
      const fim = new Date(r.pushed_at || r.updated_at || r.created_at).getTime();
      return acc + (fim - inicio) / (1000 * 60 * 60 * 24 * 30);
    }, 0) / repos.length);
  }
}
