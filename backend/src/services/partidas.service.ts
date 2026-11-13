import { 
  contarPalavras, 
  buscarPalavraPorSkip 
} from '../repositories/palavras.repository.js';
import { 
  criarPartidaDb, 
  buscarPartidaPorId, 
  atualizarPartida, 
  buscarRankingTop10 
} from '../repositories/partidas.repository.js';
import { gerarMascara, calcularPontos, VIDAS_INICIAIS } from '../game/regras.js'

export function formatarPartida(p: any) {
  const tentadas = p.letrasTentadas ? [...p.letrasTentadas] : [];
  const vidas = VIDAS_INICIAIS - p.erros;
  return {
    id: p.id,
    jogador: p.jogador,
    categoria: p.palavra.categoria,
    mascara: gerarMascara(p.palavra.texto, tentadas),
    letrasTentadas: tentadas,
    vidasRestantes: vidas,
    status: p.status,
    pontos: p.pontos,
    palavra: p.status === "em_andamento" ? null : p.palavra.texto,
  };
}

export async function criarPartidaService(jogador: string) {
  const count = await contarPalavras();
  if (count === 0) throw new Error("Sem palavras no banco");
  
  const skip = Math.floor(Math.random() * count);
  const palavra = await buscarPalavraPorSkip(skip);
  if (!palavra) throw new Error("Erro ao sortear palavra");

  const partida = await criarPartidaDb(jogador, palavra.id);
  return formatarPartida(partida);
}

export async function buscarPartidaService(id: number) {
  const partida = await buscarPartidaPorId(id);
  if (!partida) throw new Error("Partida não encontrada"); // Ou ErroApp(404)
  return formatarPartida(partida);
}

export async function palpitarService(id: number, letra: string) {
  const partida = await buscarPartidaPorId(id);
  if (!partida) throw new Error("Partida não encontrada");
  if (partida.status !== "em_andamento") throw new Error("Partida encerrada");

  const tentadas = partida.letrasTentadas ? [...partida.letrasTentadas] : [];
  if (tentadas.includes(letra)) throw new Error("Letra já tentada");

  const novasTentadas = [...tentadas, letra];
  const erros = partida.palavra.texto.includes(letra) ? partida.erros : partida.erros + 1;
  const vidas = VIDAS_INICIAIS - erros;
  const mascara = gerarMascara(partida.palavra.texto, novasTentadas);
  
  const vitoria = !mascara.includes("_");
  const derrota = vidas <= 0;
  const status = vitoria ? "vitoria" : derrota ? "derrota" : "em_andamento";
  const pontos = vitoria ? calcularPontos(partida.palavra.texto, vidas) : 0;
  const finalizadaEm = status !== "em_andamento" ? new Date().toISOString() : null;

  const atualizada = await atualizarPartida(id, {
    letrasTentadas: novasTentadas.join(""),
    erros,
    status,
    pontos,
    finalizadaEm,
  });

  return formatarPartida(atualizada);
}

export async function rankingService() {
  const ranking = await buscarRankingTop10();
  
  return ranking.map((i: { jogador: string; pontos: number; palavra: { texto: string }; finalizadaEm: Date | null }) => ({
    jogador: i.jogador,
    pontos: i.pontos,
    palavra: i.palavra.texto,
    finalizadaEm: i.finalizadaEm ? i.finalizadaEm.toISOString() : new Date().toISOString(),
  }));
}