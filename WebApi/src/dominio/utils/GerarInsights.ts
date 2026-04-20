import { IGerarInsights } from "../servicos/IGerarInsights";
import { GithubUser, GithubRepo } from "../tipos/Github";

export class GerarInsights implements IGerarInsights {
  executar(user: GithubUser, repos: GithubRepo[], linguagens: Record<string, number>, freq: { totalUltimosRepos: number; diasAtivos: number; totalCommits: number }): string[]{
    const linguagemPrincipal = Object.keys(linguagens).reduce((a, b) => (linguagens[a] > linguagens[b] ? a : b), '');
    const totalLinguagens = Object.keys(linguagens).length;
    const reposProprios = repos.filter(r => !r.fork).length;

    return [
      freq.diasAtivos > 10 ? 'Alta consistência: Atividade em diversos dias no último mês' : 'Atividade esporádica no último mês',
      freq.totalCommits > 30 && 'Grande volume de entregas técnicas recentemente',
      totalLinguagens > 5 && 'Grande diversidade de tecnologias (estudo constante)',
      reposProprios > repos.length / 2 ? 'Foco em projetos originais e autorais' : 'Perfil focado em contribuições externas',
      linguagemPrincipal && `Especialista em ${linguagemPrincipal}`,
    ].filter(Boolean) as string[];
  }
}