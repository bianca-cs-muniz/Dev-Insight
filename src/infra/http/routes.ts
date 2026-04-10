import { Router } from 'express';
import { ComparacaoController } from '../../presentation/controllers/ComparacaoController';
import { GithubController } from '../../presentation/controllers/GithubController';
import { buscarUsuarioSchema, compararUsuariosSchema } from '../../presentation/controllers/GithubValidator';
import { validate } from '../../presentation/middlewares/validate';

const routes = Router();

const githubController = new GithubController();
const comparacaoController = new ComparacaoController();

routes.get('/github/:username', validate(buscarUsuarioSchema), githubController.buscar.bind(githubController));
routes.get('/comparar', validate(compararUsuariosSchema),  comparacaoController.comparar.bind(comparacaoController));

export { routes };