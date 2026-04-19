import { IGerarInsights } from "../servicos/IGerarInsights";
import { GithubUser, GithubRepo } from "../tipos/Github";

export class GerarInsights implements IGerarInsights {
  executar(user: GithubUser, repos: GithubRepo[], linguagens: Record<string, number>, freq: { totalUltimosRepos: number }): string[] {
    const linguagemPrincipal = Object.keys(linguagens).reduce((a, b) => (linguagens[a] > linguagens[b] ? a : b), '');

    return [
      repos.length < 5 && 'Poucos repositórios públicos',
      user.followers > 50 && 'Boa relevância na comunidade',
      freq.totalUltimosRepos < 10 && 'Baixa frequência de commits',
      linguagemPrincipal && `Foco principal em ${linguagemPrincipal}`,
    ].filter(Boolean) as string[];
  }
}