'use client';

import { MapPin, Building2, Link2, Users, UserPlus, GitFork, ArrowLeft } from 'lucide-react';
import { formatoNumero } from '@utils/mascara';
import { alfa } from '@lib/fonts';
import { Tipografias } from '@shared/components/tipografias';
import { useRouter } from 'next/navigation';
import { GithubUserResponse } from '@shared/types/github';
import { GitHubIcon } from '@shared/icons';

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5F5] rounded-xl p-3">
      <div className="mb-2">{icon}</div>
      <Tipografias.Titulo className='!text-black sm:!text-2xl'>{value}</Tipografias.Titulo>
      <Tipografias.TextoPequenoSimples>{label}</Tipografias.TextoPequenoSimples>
    </div>
  );
}

export const CardUsuario = ({ gitHub, followers, following, publicRepos }:
  Pick<GithubUserResponse, 'followers' | 'following' | 'publicRepos'> & { gitHub: GithubUserResponse['user'] }) => {
  const router = useRouter();

  return (
      <div className="rounded-3xl shadow-lg bg-white p-8 w-full flex flex-col gap-4 ">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-slate-600 hover:text-[#605d6b] transition w-fit cursor-pointer"
        >
          <ArrowLeft size={16} />
          <Tipografias.TextoPequeno className='text-slate-600 !hover:text-[#605d6b]'>Voltar</Tipografias.TextoPequeno>
        </button>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="relative shrink-0">
            <img
              src={gitHub.avatar_url}
              alt={gitHub.name || gitHub.login}
              className="w-20 h-20 rounded-lg object-cover shadow-md"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className={`${alfa.className} text-3xl text-black`}>{gitHub.name || gitHub.login}</h1>
              <div className="px-2.5 py-0.5 bg-purple-100 text-[#A684FF] text-xs font-medium rounded-full border border-[#7f22fe]">
                <Tipografias.TextoPequeno className='!text-[#7f22fe]'>@{gitHub.login}</Tipografias.TextoPequeno>
              </div>
            </div>

            <Tipografias.TextoPequenoSimples>{gitHub.bio || 'Sem bio disponível'}</Tipografias.TextoPequenoSimples>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {gitHub.location && (
                <div  className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin size={16} className="shrink-0 text-[#A684FF]" />
                  <Tipografias.TextoPequenoSimples>{gitHub.location}</Tipografias.TextoPequenoSimples>
                </div>
              )}
              {gitHub.company && (
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Building2 size={16} className="shrink-0 text-[#A684FF]" />
                  <Tipografias.TextoPequenoSimples>{gitHub.company}</Tipografias.TextoPequenoSimples>
                </div>
              )}
              {gitHub.blog && (
                <a 
                  href={gitHub.blog.startsWith('http') ? gitHub.blog : `https://${gitHub.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-[#A684FF] hover:underline"
                >
                  <Link2 size={16}/>
                  <Tipografias.TextoPequeno className="!text-[#A684FF]">  {gitHub.blog}</Tipografias.TextoPequeno>
                </a>
              )}
              <a 
                href={`https://github.com/${gitHub.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#A684FF] hover:underline"
              >
                <GitFork size={16}/>
                 <Tipografias.TextoPequeno className="!text-[#A684FF]">github.com/{gitHub.login}</Tipografias.TextoPequeno>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <MetricCard 
            icon={<Users size={18} className="text-[#A684FF]" />} 
            label="Seguidores" 
            value={formatoNumero(followers)} 
          />
          <MetricCard 
            icon={<UserPlus size={18} className="text-[#A684FF]" />} 
            label="Seguindo" 
            value={formatoNumero(following)} 
          />
          <MetricCard 
            icon={<GitFork size={18} className="text-[#A684FF]" />} 
            label="Repositórios" 
            value={formatoNumero(publicRepos)} 
          />
        </div>
      </div>
    );
}
