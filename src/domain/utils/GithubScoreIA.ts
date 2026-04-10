type Linguagens = Record<string, number>;

type Frequencia = {
  totalUltimosRepos: number;
};

type ResultadoScore = {
  score: number;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
  breakdown: Record<string, number>;
};

export class GithubScoreIA {
  static calcular(
    user: any,
    repos: any[],
    linguagens: Linguagens,
    freq: Frequencia,
  ): ResultadoScore {
    const normalizar = (valor: number, divisor: number) => {
      return Math.log10(valor + 1) / Math.log10(divisor + 1);
    };

    const totalRepos = repos.length;

    const estrelas = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const forks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

    const seguidores = user.followers || 0;
    const seguindo = user.following || 1;

    const diversidadeLinguagens = Object.keys(linguagens).length;

    const engajamentoSocial = seguidores / seguindo;

    const atividade = freq.totalUltimosRepos;

    const pesos = {
      repos: 0.15,
      estrelas: 0.25,
      forks: 0.10,
      seguidores: 0.15,
      atividade: 0.10,
      linguagens: 0.10,
      engajamento: 0.15,
    };

    const scoreNormalizado =
      normalizar(totalRepos, 200) * pesos.repos +
      normalizar(estrelas, 5000) * pesos.estrelas +
      normalizar(forks, 2000) * pesos.forks +
      normalizar(seguidores, 10000) * pesos.seguidores +
      normalizar(atividade, 100) * pesos.atividade +
      normalizar(diversidadeLinguagens, 10) * pesos.linguagens +
      normalizar(engajamentoSocial, 50) * pesos.engajamento;

    const scoreFinal = Math.min(100, Math.round(scoreNormalizado * 100));

    let nivel: ResultadoScore['nivel'];

    if (scoreFinal < 30) nivel = 'Iniciante';
    else if (scoreFinal < 55) nivel = 'Intermediário';
    else if (scoreFinal < 80) nivel = 'Avançado';
    else nivel = 'Especialista';

    const breakdown = {
      repos: Math.round(normalizar(totalRepos, 200) * 100),
      estrelas: Math.round(normalizar(estrelas, 5000) * 100),
      forks: Math.round(normalizar(forks, 2000) * 100),
      seguidores: Math.round(normalizar(seguidores, 10000) * 100),
      atividade: Math.round(normalizar(atividade, 100) * 100),
      linguagens: Math.round(normalizar(diversidadeLinguagens, 10) * 100),
      engajamento: Math.round(normalizar(engajamentoSocial, 50) * 100),
    };

    return {
      score: scoreFinal,
      nivel,
      breakdown,
    };
  }
}