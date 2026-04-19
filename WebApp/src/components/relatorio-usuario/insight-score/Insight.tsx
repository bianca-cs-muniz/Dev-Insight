import { Tipografias } from '@shared/components/tipografias';
import { Info, Code2 } from 'lucide-react';

interface Props {
  insights: string[];
  linguagens: Record<string, number>;
}

export const Insight = ({ insights, linguagens }: Props) => {
  const linguagemPrincipal = Object.entries(linguagens).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="rounded-2xl shadow-md bg-white/80 backdrop-blur-sm border border-purple-100 p-6 flex flex-col">
      
      <div className="flex flex-col mb-3">
        <Tipografias.TextoPequeno16 className="!text-black !leading-none">Insights</Tipografias.TextoPequeno16>
        <Tipografias.TextoPequenoSimples className="!text-[13px] !text-slate-600">Análise automática do perfil</Tipografias.TextoPequenoSimples>
      </div>

      <div className="flex flex-col gap-2">
        <InsightItem
          icon={<Code2 size={15} className="text-blue-500" />}
          label="Linguagem principal"
          bg="bg-blue-50"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
            {linguagemPrincipal}
          </span>
        </InsightItem>

        <div className="w-full h-px bg-purple-50 my-1" />

        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
              <Info size={12} className="text-purple-700" />
            </div>

            <Tipografias.TextoPequeno16 className="!text-[14px]">
              {insight}
            </Tipografias.TextoPequeno16>
          </div>
        ))}

        {insights.length === 0 && (
          <Tipografias.TextoPequeno16 className="!text-[14px]">
            Nenhum insight disponível
          </Tipografias.TextoPequeno16>
        )}
      </div>
    </div>
  );
}

const InsightItem = ({ icon, label, bg, children }: { icon: React.ReactNode; label: string; bg: string; children: React.ReactNode; }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <Tipografias.TextoPequeno16 className='!text-[14px]'>{label}</Tipografias.TextoPequeno16>
      </div>
      {children}
    </div>
  );
}

