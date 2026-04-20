import { Router } from 'express';
import { ComparacaoController } from '../../apresentacao/controladores/ComparacaoController';
import { GithubController } from '../../apresentacao/controladores/GithubController';
import { buscarUsuarioSchema, compararUsuariosSchema } from '../../apresentacao/controladores/GithubValidator';
import { validate } from '../../apresentacao/middlewares/Validate';
import { GithubRepository } from '../repositories/GithubRepository';
import { BuscarUsuario } from '../../aplicacao/BuscarUsuario';
import { CompararUsuarios } from '../../aplicacao/CompararUsuarios';
import { GithubCache } from '../cache/GithubCache';
import { GerarInsights } from '../../dominio/utils/GerarInsights';
import { GithubScoreIA } from '../../dominio/utils/GithubScoreIA';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Dev-Insight API is running! 🚀' });
});

// Composição das dependências (Manual DI)
const githubCache = new GithubCache();
const gerarInsights = new GerarInsights();
const githubScoreIA = new GithubScoreIA();

const githubRepository = new GithubRepository(githubCache);

const githubController = new GithubController(
  new BuscarUsuario(githubRepository, gerarInsights, githubScoreIA)
);

const comparacaoController = new ComparacaoController(
  new CompararUsuarios(githubRepository, githubScoreIA)
);

routes.get('/github/:username', validate(buscarUsuarioSchema), githubController.buscar.bind(githubController));
routes.get('/comparar', validate(compararUsuariosSchema), comparacaoController.comparar.bind(comparacaoController));

export { routes };