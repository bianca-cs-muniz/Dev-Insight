import { alfa } from '@lib/fonts'
import { Tipografias } from '@shared/components/tipografias'
import { GitHubIcon } from '@shared/icons';
import { Sparkles } from 'lucide-react'

export const Cabecalho = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7927fd] via-[#6432f9] to-[#5836f7] rounded-2xl blur-lg opacity-60" />
        <div className="relative bg-gradient-to-br from-[#7927fd] via-[#6432f9] to-[#5836f7] p-4 rounded-2xl">
          <GitHubIcon/>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <h1 className={`${alfa.className} text-5xl text-black`}>DevInsight</h1>
        <div className="inline-flex items-center gap-1.5 px-2 py-1 border-2 border-[#e0d9ff] bg-white rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#7f22fe] flex-shrink-0" />
          <Tipografias.LegendaPequena className="!text-[#7f22fe]">Beta</Tipografias.LegendaPequena>
        </div>
      </div> 

      <div className="max-w-md">
        <Tipografias.Legenda>
          Converta atividades e repositórios do GitHub em <br />
          <span className="text-[#314158]">análises inteligentes de desenvolvedor</span>
        </Tipografias.Legenda>
      </div>
    </div>
  )
}
