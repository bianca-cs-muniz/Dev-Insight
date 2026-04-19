import { GithubUser, GithubRepo } from "../tipos/Github";

export interface IGerarInsights {
  executar(user: GithubUser, repos: GithubRepo[], linguagens: Record<string, number>, freq: { totalUltimosRepos: number }): string[];
}
