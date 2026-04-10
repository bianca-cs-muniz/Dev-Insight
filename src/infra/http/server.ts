import express from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 3009;

app.listen(PORT, () => {
  console.log('🚀 API rodando na porta ' + PORT);
});