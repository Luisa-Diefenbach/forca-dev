export const VIDAS_INICIAIS = 6;

/** Mostra as letras já tentadas e troca as demais por "_". */
export function gerarMascara(palavra: string, tentadas: string[]): string {
  return [...palavra]
    .map((letra) => (tentadas.includes(letra) ? letra : '_'))
    .join('');
}

/** RN06: vidas restantes × 10 + letras distintas × 5. */
export function calcularPontos(palavra: string, vidasRestantes: number): number {
  const letrasDistintas = new Set(palavra).size;
  return vidasRestantes * 10 + letrasDistintas * 5;
}