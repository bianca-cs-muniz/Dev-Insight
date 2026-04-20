import { GithubUser, GithubRepo } from "../tipos/Github";

export interface IGithubScoreIA {
  calcular(user: GithubUser, repos: GithubRepo[], linguagens: Record<string, number>, freq: { totalUltimosRepos: number; diasAtivos: number; totalCommits: number }): {
    score: number;
    nivel: string;
    breakdown: Record<string, number>;
  };
}
