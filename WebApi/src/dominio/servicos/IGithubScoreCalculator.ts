import { GithubUser, GithubRepo } from "../tipos/Github";

export interface ScoreBreakdown {
  atividade: number;
  repos: number;
  linguagens: number;
  engajamento: number;
  estrelas: number;
}

export interface ScoreResult {
  score: number;
  nivel: string;
  breakdown: Record<string, number>;
}

export interface IGithubScoreCalculator {
  calcular(
    user: GithubUser,
    repos: GithubRepo[],
    linguagens: Record<string, number>,
    freq: { totalUltimosRepos: number; diasAtivos: number; totalCommits: number }
  ): ScoreResult;
}
