import { prisma } from '../database/prisma.js'

export async function contarPalavras() {
  return await prisma.palavra.count();
}

export async function buscarPalavraPorSkip(skip: number) {
  const palavras = await prisma.palavra.findMany({ take: 1, skip });
  return palavras[0];
}