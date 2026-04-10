// import { Request, Response, NextFunction } from 'express';
// import { redis } from '../../infra/cache/RedisClient';

// export const cacheInterceptor = (ttl = 60) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const key = `cache:${req.originalUrl}`;

//     try {
//       // 🔍 tenta buscar no cache
//       const cached = await redis.get(key);

//       if (cached) {
//         return res.json(JSON.parse(cached));
//       }

//       // 🔥 intercepta resposta
//       const originalJson = res.json.bind(res);

//       res.json = (data: any) => {
//         // salva no cache
//         redis.set(key, JSON.stringify(data), 'EX', ttl);

//         return originalJson(data);
//       };

//       next();
//     } catch (error) {
//       // se der erro no redis, segue normal
//       next();
//     }
//   };
// };