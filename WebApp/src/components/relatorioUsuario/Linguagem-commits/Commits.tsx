import { Tipografias } from '@shared/components/tipografias';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Propriedades {
  commits: {
    data: string;
    commits: number;
  }[];
}

interface PropriedadesTooltip {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const TooltipPersonalizado = ({ active, payload, label }: PropriedadesTooltip) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 border border-purple-100 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="text-slate-400 mb-0.5">{label}</p>
      <p className="font-bold text-purple-600">{payload[0].value} commits</p>
    </div>
  );
}

export const Commits = ({ commits }: Propriedades) => {
  return (
    <div className="rounded-2xl shadow-md bg-white/80 backdrop-blur-sm border border-purple-100 p-6 h-full flex flex-col">
      <div>
        <Tipografias.TextoPequeno16 className='!text-black !leading-none'>Frequência de Commits</Tipografias.TextoPequeno16>
        <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-400'>Últimas semanas de atividade</Tipografias.TextoPequenoSimples>
      </div>

      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={commits} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e6ff" vertical={false} />
            <XAxis
              dataKey="data"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<TooltipPersonalizado  />} />
            <Area
              type="monotone"
              dataKey="commits"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              fill="url(#commitGradient)"
              dot={{ r: 3, fill: '#8B5CF6', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#7C3AED', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 mt-4 pt-4 border-t border-purple-50">
        <ResumoCommits label="Total (período)" value={String(commits.reduce((total, commit) => total + commit.commits, 0))} />
        <ResumoCommits label="Média diária" value={(commits.reduce((total, commit) => total + commit.commits, 0) / commits.length).toFixed(1)} />
        <ResumoCommits label="Pico" value={String(Math.max(...commits.map((commit) => commit.commits)))} />
      </div>
    </div>
  );
}

const ResumoCommits = ({ label, value }: { label: string; value: string }) => {
  return (
   <div className="flex flex-col">
  <Tipografias.TextoPequeno className="!text-slate-400 !text-[11px]">{label}</Tipografias.TextoPequeno>
  <Tipografias.TextoPequeno className="!text-purple-600 !text-[13px] !leading-none">{value}</Tipografias.TextoPequeno>
</div>
  );
}
