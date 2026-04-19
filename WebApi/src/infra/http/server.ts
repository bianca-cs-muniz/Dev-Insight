import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const PORT = process.env.PORT ?? 3009;

app.set('json spaces', 2);
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});