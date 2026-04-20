import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const PORT = process.env.PORT ?? 3009;

if (!process.env.GITHUB_TOKEN) {
  console.error('❌ ERRO: GITHUB_TOKEN não definido no .env');
  process.exit(1);
}

if (!process.env.FRONTEND_URL) {
  console.warn('⚠️ AVISO: FRONTEND_URL não definido. O CORS pode bloquear requisições.');
}

const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '') || '*';

app.set('json spaces', 2);
app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(routes);

// Exporta para a Vercel
export default app;


// Roda o listen apenas se não estiver na Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 API rodando na porta ${PORT}`);
  });
}