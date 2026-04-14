import { Request, Response } from 'express';
import { GithubService } from '../../dominio/servicos/GithubService';
import { CompararUsuarios } from '../../aplicacao/CompararUsuarios';

const service = new GithubService();
const useCase = new CompararUsuarios(service);

export class ComparacaoController {
  async comparar(req: Request, res: Response) {
    const { user1, user2 } = req.query as any;
    const data = await useCase.execute(user1, user2);
    return res.json(data);
  }
}