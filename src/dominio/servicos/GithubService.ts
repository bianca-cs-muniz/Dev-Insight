import axios from 'axios';

export class GithubService {
  async buscarUsuario(username: string) {
    const { data } = await axios.get(`https://api.github.com/users/${username}`);
    return data;
  }

  async buscarRepos(username: string) {
    const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
    return data;
  }
}