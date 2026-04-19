import { Tipografias } from '@shared/components/tipografias';
import { CustomLabel, CustomLabelProps } from '@utils/porcentagem';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  linguagens: {
    nome: string;
    porcentagem: number;
    cor: string;
  }[];
}

export const Linguagens = ({ linguagens }: Props) => {
  return (
    <div className="rounded-2xl shadow-md bg-white/80 backdrop-blur-sm border border-purple-100 p-6 h-full flex flex-col">

      <div className="mb-4">
        <Tipografias.TextoPequeno16 className='!text-black !leading-none'>Linguagens</Tipografias.TextoPequeno16>
        <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>Distribuição por repositórios públicos</Tipografias.TextoPequenoSimples>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
        {/* grafico */}
        <div className="w-full sm:w-44 h-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={linguagens}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={2}
                dataKey="porcentagem"
                labelLine={false}
                label={(props) => <CustomLabel {...props as CustomLabelProps} />}
              >
                {linguagens.map((lang) => (
                  <Cell key={lang.nome} fill={lang.cor} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [`${value}%`, 'Uso']}
                contentStyle={{
                  borderRadius: '10px',
                  border: '1px solid #e9d5ff',
                  fontSize: '12px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* lista */}
        <ul className="flex flex-col gap-2 w-full">
          {linguagens.map((lang) => (
            <li key={lang.nome} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: lang.cor }} />
                <Tipografias.TextoPequeno className='text-slate-600 !text-[13px]'>{lang.nome}</Tipografias.TextoPequeno>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-purple-50 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${lang.porcentagem}%`, backgroundColor: lang.cor }} />
                </div>
                <Tipografias.TextoPequeno className='text-slate-600 !text-[13px]'>{lang.porcentagem}%</Tipografias.TextoPequeno>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
