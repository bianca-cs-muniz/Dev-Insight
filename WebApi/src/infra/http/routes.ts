import { Router } from 'express';
import { ComparacaoController } from '../../apresentacao/controladores/ComparacaoController';
import { GithubController } from '../../apresentacao/controladores/GithubController';
import { buscarUsuarioSchema, compararUsuariosSchema } from '../../apresentacao/controladores/GithubValidator';
import { validate } from '../../apresentacao/middlewares/Validate';

const routes = Router();

const githubController = new GithubController();
const comparacaoController = new ComparacaoController();

routes.get('/github/:username', validate(buscarUsuarioSchema), githubController.buscar.bind(githubController));
routes.get('/comparar', validate(compararUsuariosSchema),  comparacaoController.comparar.bind(comparacaoController));

export { routes };