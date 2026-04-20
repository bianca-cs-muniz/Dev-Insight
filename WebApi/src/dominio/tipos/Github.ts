export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  bio: string | null;
}

export interface GithubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  created_at: string;
  size: number;
  description: string | null;
  html_url: string;
  fork: boolean;
}
