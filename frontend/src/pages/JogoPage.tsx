// frontend/src/pages/JogoPage.tsx
import { Mascara } from '../components/Mascara';
import { ForcaSvg } from '../components/ForcaSvg';
import { Teclado } from '../components/Teclado';
import type { EstadoPartida } from '../types';

type JogoPageProps = {
  partida: EstadoPartida;
  onLetra: (letra: string) => void;
  carregando: boolean;
  onReiniciar: () => void;
};

export function JogoPage({ partida, onLetra, carregando, onReiniciar }: JogoPageProps) {
  // Calcula os erros (0 a 6) para o desenho da forca
  const erros = 6 - partida.vidasRestantes;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px 20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #fce7f3', paddingBottom: '12px', marginBottom: '20px', fontSize: '14px', color: '#4b5563' }}>
        <span>Jogador: <strong style={{ color: '#831843' }}>{partida.jogador}</strong></span>
        <span>Categoria: <strong style={{ color: '#831843' }}>{partida.categoria}</strong></span>
        <span>Vidas: <strong style={{ color: '#831843' }}>{partida.vidasRestantes} / 6</strong></span>
      </div>

      <ForcaSvg erros={erros} />
      
      <Mascara mascara={partida.mascara} />

      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', margin: '15px 0' }}>
        Letras tentadas: <strong style={{ color: '#374151' }}>{partida.letrasTentadas.join(', ') || 'Nenhuma'}</strong>
      </p>

      {partida.status === 'em_andamento' && (
        <Teclado
          tentadas={partida.letrasTentadas}
          mascara={partida.mascara}
          desabilitado={false}
          onLetra={onLetra}
        />
      )}

      {partida.status !== 'em_andamento' && (
        <div style={{ 
          marginTop: '25px', 
          padding: '24px', 
          background: partida.status === 'vitoria' ? '#f0fdf4' : '#fff1f2', 
          border: `1px solid ${partida.status === 'vitoria' ? '#bbf7d0' : '#fecaca'}`,
          borderRadius: '12px',
          textAlign: 'center' 
        }}>
          <h2 style={{ color: partida.status === 'vitoria' ? '#166534' : '#991b1b', marginBottom: '10px', fontSize: '20px' }}>
            {partida.status === 'vitoria' ? 'Parabéns, você venceu!' : 'Fim de Jogo'}
          </h2>
          <p style={{ margin: '8px 0', fontSize: '14px', color: '#374151' }}>
            A palavra secreta era: <strong style={{ color: '#831843' }}>{partida.palavra}</strong>
          </p>
          <p style={{ margin: '8px 0', fontSize: '14px', color: '#374151' }}>
            Pontuação final: <strong style={{ color: '#831843' }}>{partida.pontos} pontos</strong>
          </p>
          
          <button 
            onClick={onReiniciar} 
            style={{ 
              marginTop: '15px', 
              padding: '10px 24px', 
              backgroundColor: '#e11d48', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Jogar de novo
          </button>
        </div>
      )}
    </div>
  );
}