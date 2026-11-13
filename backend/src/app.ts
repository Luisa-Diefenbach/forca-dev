import Fastify, { type FastifyError } from 'fastify';
import cors from '@fastify/cors';
import { ZodError } from 'zod';
import { rotasPartidas } from './routes/partidas.routes.js';

export function criarApp() {
  const app = Fastify();
  app.register(cors, { origin: true });
  
  // Registra as rotas com o prefixo /api exigido pelo contrato
  app.register(rotasPartidas, { prefix: '/api' });

  app.setErrorHandler((err: FastifyError, _req, reply) => {
    if (err instanceof ZodError) {
      return reply.status(400).send({ erro: 'Dados inválidos', detalhes: err.issues });
    }
    // Tratativa simples para erros de validação ou regras jogadas
    if (err.message.includes("encontrada") || err.message.includes("encerrada") || err.message.includes("tentada")) {
      const status = err.message.includes("encontrada") ? 404 : 409;
      return reply.status(status).send({ erro: err.message });
    }
    console.error(err);
    return reply.status(500).send({ erro: 'Erro interno' });
  });

  return app;
}