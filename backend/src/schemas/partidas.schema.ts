import { z } from 'zod';

export const novaPartidaSchema = z.object({
  jogador: z.string().trim().min(3).max(20),
});

export const palpiteSchema = z.object({
  letra: z.string().regex(/^[a-zA-Z]$/).transform(l => l.toUpperCase()),
});

export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});