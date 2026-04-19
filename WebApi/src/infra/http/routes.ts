import { Router } from 'express';
import { ComparacaoController } from '../../apresentacao/controladores/ComparacaoController';
import { GithubController } from '../../apresentacao/controladores/GithubController';
import { buscarUsuarioSchema, compararUsuariosSchema } from '../../apresentacao/controladores/GithubValidator';
import { validate } from '../../apresentacao/middlewares/Validate';
import { GithubService } from '../../dominio/servicos/GithubService';
import { BuscarUsuario } from '../../aplicacao/BuscarUsuario';
import { CompararUsuarios } from '../../aplicacao/CompararUsuarios';

const routes = Router();

const githubService = new GithubService();
const githubController = new GithubController(new BuscarUsuario(githubService));
const comparacaoController = new ComparacaoController(new CompararUsuarios(githubService));

routes.get('/github/:username', validate(buscarUsuarioSchema), githubController.buscar.bind(githubController));
routes.get('/comparar', validate(compararUsuariosSchema), comparacaoController.comparar.bind(comparacaoController));

export { routes };