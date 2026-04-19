import { Tipografias } from '@shared/components/tipografias'
import { GitFork, Users, Star } from 'lucide-react'

export const CardsInformacao = () => {
  const cards = [
    {
      icon: GitFork,
      valor: '420M+',
      label: 'Repositórios',
    },
    {
      icon: Users,
      valor: '100M+',
      label: 'Desenvolvedores',
    },
    {
      icon: Star,
      valor: '1B+',
      label: 'Stars no GitHub',
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="bg-white rounded-2xl px-4 py-4 flex flex-col items-center justify-center gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100"
          >
            <Icon className="w-6 h-6 text-[#7f22fe]" strokeWidth={2} />
            <Tipografias.Titulo> {card.valor} </Tipografias.Titulo>
            <Tipografias.TextoPequeno> {card.label} </Tipografias.TextoPequeno>
          </div>
        )
      })}
    </div>
  )
}
