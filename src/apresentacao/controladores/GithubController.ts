import { Request, Response } from 'express';
import { BuscarUsuario } from '../../aplicacao/BuscarUsuario';
import { GithubService } from '../../dominio/servicos/GithubService';
import AppException from '../../mensagem/app-exception';
import errors from '../../mensagem/messages';

export class GithubController {
  private useCase = new BuscarUsuario(new GithubService());

  async buscar(req: Request<{ username: string }>, res: Response) {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: errors.USUARIO_OBRIGATORIO });
    }

    try {
      const data = await this.useCase.execute(username);
      return res.json(data);
    } catch (error) {
      if (error instanceof AppException) {
        return res.status(error.status).json({ error: error.message });
      }

      return res.status(500).json({ error: errors.ERRO_AO_BUSCAR_USUARIO });
    }
  }
}