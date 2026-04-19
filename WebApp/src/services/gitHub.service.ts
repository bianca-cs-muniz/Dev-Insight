import { httpClient } from "./httpClient";
import { GithubUserResponse } from "../shared/types/github";

class GitHubService {
  httpClient;
  path: string;

  constructor() {
    this.httpClient = httpClient;
    this.path = '/github';
  }

  async buscarGitHub(userName: string) {
    return await this.httpClient.get<GithubUserResponse>(
      `${this.path}/${userName}`,
    );
  }
}

export default new GitHubService();
