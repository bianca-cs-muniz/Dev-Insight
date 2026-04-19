'use client';

import { useSearchParams } from 'next/navigation';
import { useBuscarDadosGitHub } from '@hooks/BuscarDadosGitHub';
import { CardUsuario } from './card-usuario';
import { Linguagens } from './Linguagem-commits/Linguagens';
import { Commits } from './Linguagem-commits/Commits';
import { TopRepositorios } from './top-repositorio';
import { Insight } from './insight-score/Insight';
import { Score } from './insight-score/Score';
import { processarLinguagens, processarCommits, obterContagemLinguagens } from '@utils/processamentoConvertido';

export const RelatorioUsuario = () => {
  const searchParams = useSearchParams();
  const gitHubParam = searchParams.get('gitHub') || '';
  const { perfilGitHub } = useBuscarDadosGitHub(gitHubParam);

  if (!perfilGitHub) return null;

  const { repos, insights, score } = perfilGitHub;
  const linguagensProcessadas = processarLinguagens(repos);
  const commitsProcessados = processarCommits(repos);
  const contagemLinguagens = obterContagemLinguagens(repos);

  return (
    <div className="min-h-screen w-full py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-30 flex flex-col gap-5">
        <CardUsuario
          gitHub={perfilGitHub.user}
          followers={perfilGitHub.followers}
          following={perfilGitHub.following}
          publicRepos={perfilGitHub.publicRepos}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Linguagens linguagens={linguagensProcessadas} />
          <Commits commits={commitsProcessados} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <TopRepositorios repositorios={repos} />
          </div>

          <div className="flex flex-col gap-5">
            <Insight insights={insights} linguagens={contagemLinguagens} />
            <Score scoreData={score} />
          </div>
        </div>
      </div>
    </div>
  );
}