import { Tipografias } from '@shared/components/tipografias';
import { CORES_LINGUAGENS, formatarEstrelas } from '@utils/processamentoConvertido';
import { Star, GitFork } from 'lucide-react';

interface Props {
  repositorios: {
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
  }[];
}

export const TopRepositorios = ({ repositorios }: Props) => {
  const topRepos = [...repositorios]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return (
    <div className="rounded-2xl shadow-md bg-white/80 backdrop-blur-sm border border-purple-100 p-6 h-full flex flex-col">
      <div>
        <Tipografias.TextoPequeno16 className='!text-black !leading-none'>Top Repositórios</Tipografias.TextoPequeno16>
        <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>Ordenado por estrelas</Tipografias.TextoPequenoSimples>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {topRepos.map((repo) => (
          <li
            key={repo.name}
            className="group flex flex-col gap-1.5 rounded-xl border border-purple-50 bg-purple-50/40 px-4 py-3
            hover:bg-purple-50 hover:border-purple-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2">
              <Tipografias.TextoPequeno className='!text-purple-700 !text-[14px] !leading-none'>{repo.name}</Tipografias.TextoPequeno>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: (repo.language && CORES_LINGUAGENS[repo.language]) || '#8B5CF6' }}
                  />
                  <Tipografias.TextoPequenoSimples className='!text-slate-500 !text-[13px] !leading-none'>{repo.language || 'Geral'}</Tipografias.TextoPequenoSimples>
                </div>
                <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  {formatarEstrelas(repo.stargazers_count)}
                </span>
                
                <span className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                  <GitFork size={12} />
                  {formatarEstrelas(repo.forks_count)}
                </span>
              </div>
            </div>

            {repo.description && (
              <Tipografias.TextoPequenoSimples className='!text-slate-500 !text-[13px] !leading-none'>{repo.description}</Tipografias.TextoPequenoSimples>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

