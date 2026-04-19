import { formatoNumero } from './mascara';

interface Repo {
  language: string | null;
  pushed_at: string | null;
}

interface LinguagemProcessada {
  nome: string;
  porcentagem: number;
  cor: string;
}

interface CommitProcessado {
  data: string;
  commits: number;
}

export const CORES_LINGUAGENS: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Python: '#3776AB',
  Java: '#b07219',
  PHP: '#4F5D95',
  C: '#f34b7d',
  Vue: '#41B883',
  React: '#61DAFB',
  OpenSCAD: '#66ff33',
  Shell: '#ff3300',
  Makefile: '#00ffff',
  'C++': '#800080',
  'C#': '#178600',
};

export const processarLinguagens = (repositorios: Repo[]): LinguagemProcessada[] => {
  const contagemLinguagens: Record<string, number> = {};

  repositorios.forEach((repo) => {
    if (repo.language) {
      contagemLinguagens[repo.language] = (contagemLinguagens[repo.language] || 0) + 1;
    }
  });

  const totalRepositoriosComLinguagem = Object.values(contagemLinguagens).reduce(
    (acumulador, valor) => acumulador + valor,
    0
  );

  if (totalRepositoriosComLinguagem === 0) return [];

  return Object.entries(contagemLinguagens)
   .map(([nome, quantidade]) => ({
      nome,
      porcentagem: Math.round((quantidade / totalRepositoriosComLinguagem) * 100),
      cor: CORES_LINGUAGENS[nome] || '#8B5CF6',
    }))
   .sort((a, b) => b.porcentagem - a.porcentagem)
   .slice(0, 5);
}

export const processarCommits = (repositorios: Repo[]): CommitProcessado[] => {
  const mapaAtividades: Record<string, number> = {};

  repositorios.forEach((repo) => {
    if (repo.pushed_at) {
      const data = new Date(repo.pushed_at);
      data.setHours(0, 0, 0, 0);
      const timestamp = data.getTime();
      mapaAtividades[timestamp] = (mapaAtividades[timestamp] || 0) + 1;
    }
  });

  return Object.entries(mapaAtividades)
    .map(([timestamp, commits]) => ({
      timestamp: Number(timestamp),
      commits,
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-12)
    .map((item) => ({
      data: new Date(item.timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
      }),
      commits: item.commits,
    }));
}

export const obterContagemLinguagens = (repositorios: Repo[]): Record<string, number> => {
  const contagem: Record<string, number> = {};
  repositorios.forEach((repo) => {
    if (repo.language) {
      contagem[repo.language] = (contagem[repo.language] || 0) + 1;
    }
  });
  return contagem;
}

export const formatarEstrelas = formatoNumero;
