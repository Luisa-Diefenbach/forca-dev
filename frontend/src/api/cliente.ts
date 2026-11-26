import type { EstadoPartida, ItemRanking } from '../types';

async function requisitar<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...init });
  const corpo = await res.json();
  if (!res.ok) throw new Error(corpo.erro ?? 'Erro inesperado');
  return corpo as T;
}

export const api = {
  novaPartida: (jogador: string) =>
    requisitar<EstadoPartida>('/api/partidas', {
      method: 'POST', body: JSON.stringify({ jogador }) }),
  palpitar: (id: number, letra: string) =>
    requisitar<EstadoPartida>(`/api/partidas/${id}/palpites`, {
      method: 'POST', body: JSON.stringify({ letra }) }),
  ranking: () => requisitar<ItemRanking[]>('/api/ranking'),
};