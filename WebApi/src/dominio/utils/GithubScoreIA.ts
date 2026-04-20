import { IGithubScoreIA } from "../servicos/IGithubScoreIA";
import { GithubUser, GithubRepo } from "../tipos/Github";

type Linguagens = Record<string, number>;
type Frequencia = { totalUltimosRepos: number };
type Nivel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
type ResultadoScore = { score: number; nivel: Nivel; breakdown: Record<string, number> };

export class GithubScoreIA implements IGithubScoreIA {
  private normalizar = (valor: number, divisor: number) =>
    Math.log10(valor + 1) / Math.log10(divisor + 1);

  calcular(user: GithubUser, repos: GithubRepo[], linguagens: Linguagens, freq: { totalUltimosRepos: number; diasAtivos: number; totalCommits: number }): ResultadoScore {
    const norm = this.normalizar;
    
    const scoreRitmo = (norm(freq.diasAtivos, 20) * 0.7) + (norm(freq.totalCommits, 60) * 0.3);
    const reposProprios = repos.filter(r => !r.fork);
    const tamanhoTotal = reposProprios.reduce((acc, r) => acc + (r.size || 0), 0);
    const scoreVolume = (norm(reposProprios.length, 30) * 0.5) + (norm(tamanhoTotal, 50000) * 0.5);
    const ratioOriginalidade = repos.length > 0 ? (reposProprios.length / repos.length) : 0;
    const totalEstrelas = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const seguidores = user.followers || 0;

    const metricas = {
      atividade: { valor: scoreRitmo * 100, max: 100, peso: 0.40 },
      repos: { valor: scoreVolume * 100, max: 100, peso: 0.20 },
      linguagens: { valor: Object.keys(linguagens).length, max: 12, peso: 0.20 },
      engajamento: { valor: ratioOriginalidade * 10, max: 10, peso: 0.10 },
      estrelas: { valor: (totalEstrelas * 0.1) + (seguidores * 0.05), max: 50, peso: 0.10 },
    };

    const score = Math.min(100, Math.round(
      Object.values(metricas).reduce((acc, { valor, max, peso }) => acc + (valor / max) * peso * 100, 0)
    ));

    const nivel: Nivel =
      score < 30 ? 'Iniciante' :
      score < 55 ? 'Intermediário' :
      score < 80 ? 'Avançado' : 'Especialista';

    const breakdown = Object.fromEntries(
      Object.entries(metricas).map(([chave, { valor, max }]) => [chave, Math.round(norm(valor, max) * 100)]),
    );

    return { score, nivel, breakdown };
  }
}