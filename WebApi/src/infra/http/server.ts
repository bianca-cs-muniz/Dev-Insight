import 'dotenv/config'; // ← primeira linha, antes de tudo
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.set('json spaces', 2);
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(routes);

app.listen(3009, () => {
  console.log('🚀 API rodando na porta 3009');
});