export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  [key: string]: any;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  [key: string]: any;
}

export interface GithubUserResponse {
  user: GithubUser;
  repos: GithubRepo[];
  insights: string[];
  score: {
    score: number;
    nivel: string;
    breakdown: Record<string, number>;
  };
  totalRepos: number;
  followers: number;
  following: number;
  publicRepos: number;
}
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
