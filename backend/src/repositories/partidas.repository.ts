import { prisma } from '../database/prisma.js'

export async function criarPartidaDb(jogador: string, palavraId: number) {
  return await prisma.partida.create({
    data: { jogador, palavraId, status: "em_andamento" },
    include: { palavra: true },
  });
}

export async function buscarPartidaPorId(id: number) {
  return await prisma.partida.findUnique({
    where: { id },
    include: { palavra: true },
  });
}

export async function atualizarPartida(id: number, dados: any) {
  return await prisma.partida.update({
    where: { id },
    data: dados,
    include: { palavra: true },
  });
}

export async function buscarRankingTop10() {
  return await prisma.partida.findMany({
    where: { status: "vitoria" },
    orderBy: [{ pontos: "desc" }, { finalizadaEm: "asc" }],
    take: 10,
    include: { palavra: true },
  });
}