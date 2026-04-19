'use client';

import { alfa } from '@lib/fonts';
import { Tipografias } from '@shared/components/tipografias';
import { GitHubIcon } from '@shared/icons';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Cabecalho = () => {

  const router = useRouter();

  const handleVoltar = () => {
    router.push('/');
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleVoltar}>
        <div className="bg-gradient-to-br from-[#7927fd] to-[#6432f9] p-2 rounded-xl shadow-lg shadow-purple-200">
          <GitHubIcon size={30}/>
        </div>
        <p className={`${alfa.className} text-4xl md:text-1xl lg:text-2xl text-slate-900 tracking-tight`}>
          DevInsight
        </p>
      </div>
      
      <Link 
        href="/" 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={18}/>
        <Tipografias.LegendaPequena>Voltar</Tipografias.LegendaPequena>
      </Link>
    </nav>
  );
};
