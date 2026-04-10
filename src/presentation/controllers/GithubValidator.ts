import { z } from 'zod';

export const buscarUsuarioSchema = z.object({
  params: z.object({
    username: z
      .string()
      .min(1, 'username é obrigatório')
      .max(39, 'username inválido')
      .regex(/^[a-zA-Z0-9-]+$/, 'username inválido'),
  }),
});

export const compararUsuariosSchema = z.object({
  query: z.object({
    user1: z.string().min(1, 'user1 é obrigatório'),
    user2: z.string().min(1, 'user2 é obrigatório'),
  }),
});

export type BuscarUsuarioDTO = z.infer<typeof buscarUsuarioSchema>;
export type CompararUsuariosDTO = z.infer<typeof compararUsuariosSchema>;