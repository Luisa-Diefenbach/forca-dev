import "dotenv/config";
import { criarApp } from './app.js';

const PORTA = Number(process.env.PORT ?? 3333);
const app = criarApp();

await app.listen({ port: PORTA, host: "0.0.0.0" });
console.log(`Servidor rodando na porta ${PORTA}`);