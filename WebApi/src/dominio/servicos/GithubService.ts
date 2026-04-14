import axios from 'axios';

export class GithubService {
  private readonly client = axios.create({
    headers: {
      'User-Agent': 'DevInsight-App',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    }
  });

  async buscarUsuario(username: string) {
    const { data } = await this.client.get(`https://api.github.com/users/${username}`);
    return data;
  }

  async buscarRepos(username: string) {
    const { data } = await this.client.get(`https://api.github.com/users/${username}/repos`);
    return data;
  }
}