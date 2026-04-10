import { Request, Response } from 'express';
import { GithubService } from '../../domain/services/GithubService';
import { BuscarUsuario } from '../../application/BuscarUsuario';

type Params = {
  username: string;
};

export class GithubController {
  async buscar(req: Request<Params>, res: Response) {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(400).json({
          error: 'username é obrigatório',
        });
      }

      const service = new GithubService();
      const useCase = new BuscarUsuario(service);

      const data = await useCase.execute(username);

      return res.json(data);
    } catch (error: any) {
      return res.status(500).json({
        error: 'Erro ao buscar usuário',
        details: error.message,
      });
    }
  }
}