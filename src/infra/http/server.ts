import express from 'express';
import { routes } from './routes';

const app = express();

app.set('json spaces', 2);
app.use(express.json());
app.use(routes);

app.listen(3009, () => {
  console.log('🚀 API rodando na porta 3009');
});