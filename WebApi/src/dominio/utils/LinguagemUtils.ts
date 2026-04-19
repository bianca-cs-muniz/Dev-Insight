import { GithubRepo } from "../tipos/Github";

export class LinguagemUtils {
  static contar(repositorios: GithubRepo[]): Record<string, number> {
    const contagem: Record<string, number> = {};

    for (const repo of repositorios) {
      const linguagem = repo.language;
      if (!linguagem) continue;

      contagem[linguagem] = (contagem[linguagem] ?? 0) + 1;
    }

    return contagem;
  }
}
