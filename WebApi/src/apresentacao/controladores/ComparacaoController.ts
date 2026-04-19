import { Request, Response } from 'express';
import { CompararUsuarios } from '../../aplicacao/CompararUsuarios';
import AppException from '../../mensagem/app-exception';
import errors from '../../mensagem/messages';

export class ComparacaoController {
  constructor(private readonly useCase: CompararUsuarios) {}

  async comparar(req: Request, res: Response) {
    try {
      const { user1, user2 } = req.query as { user1: string; user2: string };
      const data = await this.useCase.execute(user1, user2);
      return res.json(data);
    } catch (error) {
      if (error instanceof AppException) {
        return res.status(error.status).json({ error: error.message });
      }
      console.error(error);
      return res.status(500).json({ error: errors.ERRO_AO_COMPARAR_USUARIOS });
    }
  }
}