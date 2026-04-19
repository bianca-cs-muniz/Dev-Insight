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

  async buscarUsuario(username: string): Promise<GithubUser> {
    const cacheKey = `user:${username}`;
    const cached = await this.cache.get<GithubUser>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await this.client.get(`/users/${username}`);
      await this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      this.handleError(error, messages.USUARIO_NAO_ENCONTRADO);
    }
  }

  async buscarRepos(username: string): Promise<GithubRepo[]> {
    const cacheKey = `repos:${username}`;
    const cached = await this.cache.get<GithubRepo[]>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await this.client.get(`/users/${username}/repos?per_page=100&sort=pushed`);
      await this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      this.handleError(error, messages.REPOSITORIOS_NAO_ENCONTRADOS);
    }
  }

  private handleError(error: any, notFoundMsg: string): never {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) throw new NotFoundException(notFoundMsg);
      if (error.response?.status === 403) throw new RateLimitException();
    }
    throw error;
  }
}
