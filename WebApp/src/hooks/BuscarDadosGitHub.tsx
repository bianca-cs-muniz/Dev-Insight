import { useQuery } from '@tanstack/react-query';
import GitHubService from '../services/gitHub.service';
import axios from 'axios';

export const useBuscarDadosGitHub = (userName: string) => {
  const {
    data: perfilGitHub,
    isLoading: estaCarregandoPerfilGitHub,
    error,
    refetch,
  } = useQuery({
    queryKey: ['Usuarios', 'buscarGitHub', userName],
    queryFn: () => GitHubService.buscarGitHub(userName).then((r) => r.data),
    enabled: !!userName,
    retry: false,
  });

  const errorMsg = axios.isAxiosError(error)
    ? (error.response?.data?.error ?? 'Ocorreu um erro inesperado ao buscar o desenvolvedor.')
    : error
    ? 'Ocorreu um erro inesperado ao buscar o desenvolvedor.'
    : null;

  const setErrorMsg = (message: string | null) => {
    return message;
  };

  return { perfilGitHub, estaCarregandoPerfilGitHub, errorMsg, setErrorMsg, refetch };
};