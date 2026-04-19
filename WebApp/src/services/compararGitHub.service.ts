import { httpClient } from "./httpClient";
import { GithubCompareResponse } from "../shared/types/github";

class CompararGitHubService {
  httpClient;

  constructor() {
    this.httpClient = httpClient;
  }

  async compararPerfis(user1: string, user2: string) {
    const params = new URLSearchParams({ user1, user2 });
    return await this.httpClient.get<GithubCompareResponse>(
      `/comparar?${params.toString()}`,
    );
  }
}

export default new CompararGitHubService();
