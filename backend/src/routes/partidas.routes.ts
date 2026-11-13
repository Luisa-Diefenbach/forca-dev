import type { FastifyInstance } from 'fastify'
import { novaPartidaSchema, palpiteSchema, paramsSchema } from '../schemas/partidas.schema.js'
import * as service from '../services/partidas.service.js'

export async function rotasPartidas(app: FastifyInstance) {
  app.post('/partidas', async (req, reply) => {
    const { jogador } = novaPartidaSchema.parse(req.body);
    const partida = await service.criarPartidaService(jogador);
    return reply.status(201).send(partida);
  });

  app.get('/partidas/:id', async (req) => {
    const { id } = paramsSchema.parse(req.params);
    return await service.buscarPartidaService(id);
  });

  app.post('/partidas/:id/palpites', async (req) => {
    const { id } = paramsSchema.parse(req.params);
    const { letra } = palpiteSchema.parse(req.body);
    return await service.palpitarService(id, letra);
  });

  app.get('/ranking', async () => {
    return await service.rankingService();
  });
}