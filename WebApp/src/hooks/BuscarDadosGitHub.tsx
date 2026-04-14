import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import GitHubService from '../services/gitHub.service';
import axios from 'axios';

export const useBuscarDadosGitHub = (userName: string) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: perfilGitHub, isLoading: estaCarregandoPerfilGitHub, refetch } = useQuery({
    queryKey: ['Usuarios', 'buscarGitHub', userName],
    queryFn: async () => {
      try {
        const response = await GitHubService.buscarGitHub(userName);
        return response.data;
      } catch (error) {
        setErrorMsg(axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Ocorreu um erro inesperado ao buscar o desenvolvedor.'
        );
        throw error;
      }
    },
    enabled: !!userName,
    retry: false,
  });

  return { perfilGitHub, estaCarregandoPerfilGitHub, errorMsg, setErrorMsg, refetch };
};