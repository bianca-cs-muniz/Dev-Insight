import axios, { AxiosInstance } from 'axios';
import { IGithubRepository } from '../../dominio/repositorios/IGithubRepository';
import { GithubUser, GithubRepo } from '../../dominio/tipos/Github';
import AppException from '../../mensagem/app-exception';
import messages from '../../mensagem/messages';
import { GithubCache } from '../cache/GithubCache';

export class GithubRepository implements IGithubRepository {
  private readonly client: AxiosInstance;

  constructor(private readonly cache: GithubCache) {
    this.client = axios.create({
      headers: {
        'User-Agent': 'DevInsight-App',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    });
  }

  async buscarUsuario(username: string): Promise<GithubUser> {
    const cacheKey = `user:${username}`;
    const cached = this.cache.get<GithubUser>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await this.client.get(`https://api.github.com/users/${username}`);
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new AppException(404, messages.USUARIO_NAO_ENCONTRADO);
      }
      throw error;
    }
  }

  async buscarRepos(username: string): Promise<GithubRepo[]> {
    const cacheKey = `repos:${username}`;
    const cached = this.cache.get<GithubRepo[]>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await this.client.get(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`
      );
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new AppException(404, messages.REPOSITORIOS_NAO_ENCONTRADOS);
      }
      throw error;
    }
  }
}
