import { useEffect, useState } from 'react'
import { Search, ArrowRight, Icon, GitCompare } from 'lucide-react'
import { Tipografias } from '@shared/components/tipografias'
import { useRouter } from 'next/navigation'
import { CarregandoProcesso } from '@shared/components/carregandoProcesso/carregandoProcesso'
import { Snackbar } from '@shared/components/snackBar/Snackbar'
import { useBuscarDadosGitHub } from '@hooks/BuscarDadosGitHub'

export const Buscar = () => {
  const [username, setUsername] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchUser, setSearchUser] = useState('')
  const router = useRouter()
  const sugestões = ['@bianca-cs-muniz', '@torvalds', '@gaearon', '@sindresorhus', '@tj']

  const { perfilGitHub, estaCarregandoPerfilGitHub, errorMsg, setErrorMsg, refetch } = useBuscarDadosGitHub(searchUser);

  useEffect(() => {
    if (perfilGitHub) router.push(`/?gitHub=${searchUser}`);
  }, [perfilGitHub]);

  const handleBuscarUsuario = () => {
    const user = username.trim().replace('@', '');
    if (!user) return;
    setErrorMsg(null);
    user === searchUser ? refetch() : setSearchUser(user);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleBuscarUsuario()
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      <CarregandoProcesso 
        loading={estaCarregandoPerfilGitHub} 
        label="Buscando dados, aguarde um momento..." 
      />
      <Snackbar 
        message={errorMsg} 
        onClose={() => setErrorMsg(null)} 
      />

      <div className="flex flex-col gap-2">
        <div className={`relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border ${errorMsg ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'} focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 dark:focus-within:ring-violet-900 transition px-3`}>
          <Search className="w-5 h-5 text-gray-400" />
          
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              if (errorMsg) setErrorMsg(null)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Digite um username do GitHub..."
            className="flex-1 pl-3 py-5 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
            disabled={isSearching}
          />

          <button
            onClick={handleBuscarUsuario}
            disabled={!username || isSearching}
            className={`
              px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all
              ${username && !isSearching
                ? 'bg-gradient-to-r from-[#7927fd] via-[#6432f9] to-[#5836f7] text-white hover:opacity-90 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              }
            `}
          >
            <Tipografias.TextoPequeno className='!text-white'>
              {isSearching ? 'Analisando...' : 'Analisar'}
            </Tipografias.TextoPequeno>
            <ArrowRight className="w-4 h-4" color='white'/>
          </button>
          
        </div>
        
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
        <Tipografias.TextoPequeno className='!text-[#90a1b9]'>Experimentar:</Tipografias.TextoPequeno>
        {sugestões.map((sugestao) => (
          <button
            key={sugestao}
            onClick={() => {
              setUsername(sugestao.replace('@', ''))
              if (errorMsg) setErrorMsg(null)
            }}
            disabled={isSearching}
            className="px-3 py-1 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-600 transition dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-violet-600"
          >
            <Tipografias.TextoPequeno>{sugestao}</Tipografias.TextoPequeno>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => router.push("/comparar-perfis")}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-600 transition dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 w-fit"
        >
          <GitCompare className="w-4 h-4" />
          <Tipografias.TextoPequeno>Comparar dois perfis</Tipografias.TextoPequeno>
        </button>
      </div>
    </div>
  )
}
