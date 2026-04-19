import { IGithubScoreIA } from "../servicos/IGithubScoreIA";
import { GithubUser, GithubRepo } from "../tipos/Github";

type Linguagens = Record<string, number>;
type Frequencia = { totalUltimosRepos: number };
type Nivel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
type ResultadoScore = { score: number; nivel: Nivel; breakdown: Record<string, number> };

export class GithubScoreIA implements IGithubScoreIA {
  private normalizar = (valor: number, divisor: number) =>
    Math.log10(valor + 1) / Math.log10(divisor + 1);

  calcular(user: GithubUser, repos: GithubRepo[], linguagens: Linguagens, freq: Frequencia): ResultadoScore {
    const norm = this.normalizar;

    const metricas = {
      repos:       { valor: repos.length,                                              max: 200,   peso: 0.15 },
      estrelas:    { valor: repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0), max: 5000,  peso: 0.25 },
      forks:       { valor: repos.reduce((acc, r) => acc + (r.forks_count || 0), 0),     max: 2000,  peso: 0.10 },
      seguidores:  { valor: user.followers || 0,                                       max: 10000, peso: 0.15 },
      atividade:   { valor: freq.totalUltimosRepos,                                    max: 100,   peso: 0.10 },
      linguagens:  { valor: Object.keys(linguagens).length,                            max: 10,    peso: 0.10 },
      engajamento: { valor: (user.followers || 0) / (user.following || 1),             max: 50,    peso: 0.15 },
    };

    const score = Math.min(100, Math.round(
      Object.values(metricas).reduce((acc, { valor, max, peso }) => acc + norm(valor, max) * peso, 0) * 100,
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