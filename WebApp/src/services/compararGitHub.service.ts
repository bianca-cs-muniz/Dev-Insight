import { httpClient } from "./httpClient";
import { GithubUser, GithubRepo } from "./gitHub.service";

export interface GithubCompareUser {
  dados: GithubUser;
  score: {
    score: number;
    nivel: string;
    breakdown: Record<string, number>;
  };
  repos: GithubRepo[];
  linguagens: Record<string, number>;
}

export interface GithubCompareResponse {
  user1: GithubCompareUser;
  user2: GithubCompareUser;
  vencedor: string;
}

class CompararGitHubService {
  httpClient;

  constructor() {
    this.httpClient = httpClient;
  }

  async compararPerfis(user1: string, user2: string) {
    return await this.httpClient.get<GithubCompareResponse>(
      `/comparar?user1=${user1}&user2=${user2}`,
    );
  }
}

export default new CompararGitHubService();
