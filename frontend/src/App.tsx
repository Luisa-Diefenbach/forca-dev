import { useState, useEffect } from 'react';
import { JogoPage } from './pages/JogoPage';
import { Ranking } from './components/Ranking';
import type { EstadoPartida } from './types';

export function App() {
  const [jogador, setJogador] = useState('');
  const [partida, setPartida] = useState<EstadoPartida | null>(null);
  const [ranking, setRanking] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  // Carrega o ranking ao abrir a aplicação com segurança
  useEffect(() => {
    carregarRanking();
  }, []);

  async function carregarRanking() {
    try {
      const res = await fetch('/api/ranking');
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) {
        setRanking(data);
      }
    } catch (err: any) {
      console.error("Erro no palpite:", err);
      setErro(`Erro da API: ${err.message}`); // Isto garante que o erro exato aparece na tela
    } finally {
      setCarregando(false);
    }
  }

  async function iniciarPartida() {
    if (jogador.trim().length < 3) return;
    setCarregando(true);
    setErro('');

    try {
      const res = await fetch('/api/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jogador: jogador.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao iniciar partida');

      setPartida(data);
    } catch (err: any) {
      setErro(err.message || 'Erro de conexão com o back-end');
    } finally {
      setCarregando(false);
    }
  }

  async function enviarPalpite(letra: string) {
    alert(`Clicou na letra: ${letra}`); // <-- Isto vai disparar um pop-up na tela assim que clicar
    
    if (!partida) return;
    setCarregando(true);
    setErro('');

    const partidaId = partida.id;

    try {
      const res = await fetch(`/api/partidas/${partidaId}/palpites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letra }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.erro || `Erro no servidor (${res.status})`);

      setPartida(data);
    } catch (err: any) {
      setErro(`Erro ao enviar palpite: ${err.message}`);
    } finally {
      setCarregando(false);
    }
  }

  function reiniciarJogo() {
    setPartida(null);
    setJogador('');
    setErro('');
    carregarRanking();
  }

  // Se a partida começou, mostra a tela de jogo
  if (partida) {
    return (
      <JogoPage
        partida={partida}
        onLetra={enviarPalpite}
        carregando={false} // Força a desativação do bloqueio para garantir cliques
        onReiniciar={reiniciarJogo}
      />
    );
  }

  // Caso contrário, mostra a tela inicial (Home) com segurança
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#831843', fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>
        Forca Dev
      </h1>

      {erro && (
        <div style={{ backgroundColor: '#ffe4e6', border: '1px solid #fecaca', color: '#991b1b', padding: '12px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>
          Erro: {erro}
        </div>
      )}

      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #fce7f3', boxShadow: '0 4px 6px -1px rgba(219, 39, 119, 0.05)', marginBottom: '30px' }}>
        <h3 style={{ color: '#9d174d', fontSize: '18px', marginBottom: '15px', fontWeight: '600' }}>
          Iniciar Nova Partida
        </h3>

        <label style={{ display: 'block', fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>
          Apelido (3 a 20 caracteres):
        </label>

        <input
          type="text"
          value={jogador}
          onChange={(e) => setJogador(e.target.value)}
          placeholder="Seu apelido"
          style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '6px', border: '1px solid #f43f5e', marginBottom: '15px', boxSizing: 'border-box' }}
        />

        <button
          onClick={iniciarPartida}
          disabled={carregando || jogador.trim().length < 3}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: jogador.trim().length < 3 ? '#fbcfe8' : '#e11d48',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: jogador.trim().length < 3 ? 'not-allowed' : 'pointer'
          }}
        >
          {carregando ? 'Carregando...' : 'Jogar'}
        </button>
      </div>

      <Ranking ranking={ranking || []} />
    </div>
  );
}