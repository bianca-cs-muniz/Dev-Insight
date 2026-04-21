import axios, { AxiosInstance } from 'axios';
import { IGithubRepository } from '../../dominio/repositorios/IGithubRepository';
import { GithubUser, GithubRepo } from '../../dominio/tipos/Github';
import { NotFoundException, RateLimitException } from '../../mensagem/app-exception';
import messages from '../../mensagem/messages';
import { ICache } from '../../dominio/cache/ICache';

export class GithubRepository implements IGithubRepository {
  private readonly client: AxiosInstance;

  constructor(private readonly cache: ICache) {
    this.client = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'User-Agent': 'DevInsight-App',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    });
  }

  private async getCachedOrFetch<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>,
    notFoundMsg?: string
  ): Promise<T> {
    const cached = await this.cache.get<T>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchFn();
      await this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      if (notFoundMsg) {
        this.handleError(error, notFoundMsg);
      }
      throw error;
    }
  }

  async buscarUsuario(username: string): Promise<GithubUser> {
    return this.getCachedOrFetch(
      `user:${username}`,
      async () => {
        const { data } = await this.client.get<GithubUser>(`/users/${username}`);
        return data;
      },
      messages.USUARIO_NAO_ENCONTRADO
    );
  }

  async buscarRepos(username: string): Promise<GithubRepo[]> {
    return this.getCachedOrFetch(
      `repos:${username}`,
      async () => {
        const { data } = await this.client.get<GithubRepo[]>(`/users/${username}/repos?per_page=100&sort=pushed`);
        return data;
      },
      messages.REPOSITORIOS_NAO_ENCONTRADOS
    );
  }

  async buscarEventos(username: string): Promise<any[]> {
    try {
      return await this.getCachedOrFetch(
        `events:${username}`,
        async () => {
          const { data } = await this.client.get<any[]>(`/users/${username}/events/public?per_page=100`);
          return data;
        }
      );
    } catch (error) {
      return [];
    }
  }

  private handleError(error: unknown, notFoundMsg: string): never {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) throw new NotFoundException(notFoundMsg);
      if (error.response?.status === 403) throw new RateLimitException();
    }
    throw error;
  }
}

