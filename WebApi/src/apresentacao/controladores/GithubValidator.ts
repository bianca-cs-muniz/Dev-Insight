import { z } from 'zod';

const usernameSchema = z
  .string()
  .min(1, 'username é obrigatório')
  .max(39, 'username inválido')
  .regex(/^[a-zA-Z0-9-]+$/, 'username inválido');

export const buscarUsuarioSchema = z.object({
  params: z.object({
    username: usernameSchema,
  }),
});

export const compararUsuariosSchema = z.object({
  query: z.object({
    user1: usernameSchema,
    user2: usernameSchema,
  }),
});

export type BuscarUsuarioDTO = z.infer<typeof buscarUsuarioSchema>;
export type CompararUsuariosDTO = z.infer<typeof compararUsuariosSchema>;