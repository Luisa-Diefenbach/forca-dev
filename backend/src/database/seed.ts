import { prisma } from './prisma.js'

const palavras: [string, string][] = [
  ['PROMISE', 'JavaScript'],
  ['CALLBACK', 'JavaScript'],
  ['INTERFACE', 'TypeScript'],
  ['GENERICS', 'TypeScript'],
  ['COMPONENTE', 'React'],
  ['ESTADO', 'React'],
  ['PROPS', 'React'],
  ['ROUTER', 'Web'],
  ['FETCH', 'Web'],
  ['ASYNC', 'JavaScript'],
  ['AWAIT', 'JavaScript'],
  ['CLOSURE', 'JavaScript'],
  ['UNION', 'TypeScript'],
  ['ENUM', 'TypeScript'],
  ['HOOKS', 'React'],
  ['EFFECT', 'React'],
  ['REDUCER', 'React'],
  ['SERVER', 'Web'],
  ['CLIENT', 'Web'],
  ['STATUS', 'Web'],
];

async function main() {
  // upsert não duplica se o seed rodar de novo
  await prisma.$transaction(
    palavras.map(([texto, categoria]) =>
      prisma.palavra.upsert({ where: { texto }, update: {}, create: { texto, categoria } }),
    ),
  );
  console.log('Seed concluído:', await prisma.palavra.count(), 'palavras');
}

main().finally(() => prisma.$disconnect());