import { GithubUser, GithubRepo } from "../tipos/Github";

export interface IGithubRepository {
  buscarUsuario(username: string): Promise<GithubUser>;
  buscarRepos(username: string): Promise<GithubRepo[]>;
  buscarEventos(username: string): Promise<any[]>;
}
