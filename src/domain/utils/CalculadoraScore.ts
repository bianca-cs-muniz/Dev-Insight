export class CalcularScoreDev {
  static executar(
    user: any,
    repos: any[],
    linguagens: Record<string, number>,
    freq: { totalUltimosRepos: number },
  ) {
    let score = 0;

    const scoreFollowers = Math.min(user.followers / 5, 100);
    score += scoreFollowers * 0.25;

    const scoreRepos = Math.min(repos.length * 5, 100);
    score += scoreRepos * 0.2;

    const scoreFreq = Math.min(freq.totalUltimosRepos * 10, 100);
    score += scoreFreq * 0.2;

    const totalLinguagens = Object.keys(linguagens).length;
    const scoreLinguagens = Math.min(totalLinguagens * 15, 100);
    score += scoreLinguagens * 0.15;

    const totalStars = repos.reduce(
      (acc, repo) => acc + (repo.stargazers_count || 0),
      0,
    );

    const scoreStars = Math.min(totalStars * 2, 100);
    score += scoreStars * 0.2;

    const scoreFinal = Math.round(score);

    let nivel = '';

    if (scoreFinal < 30) nivel = 'Iniciante';
    else if (scoreFinal < 60) nivel = 'Intermediário';
    else if (scoreFinal < 80) nivel = 'Avançado';
    else nivel = 'Especialista';

    return {
      score: scoreFinal,
      nivel,
      detalhes: {
        followers: scoreFollowers,
        repos: scoreRepos,
        frequencia: scoreFreq,
        linguagens: scoreLinguagens,
        stars: scoreStars,
      },
    };
  }
}