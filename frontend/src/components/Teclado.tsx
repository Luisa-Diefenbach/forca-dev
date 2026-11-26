// frontend/src/components/Teclado.tsx
type TecladoProps = {
  tentadas: string[];
  desabilitado: boolean;
  onLetra: (letra: string) => void;
};

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function Teclado({ tentadas, desabilitado, onLetra }: TecladoProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginTop: '20px' }}>
      {LETRAS.map((l) => {
        const jaTentada = tentadas.includes(l);
        return (
          <button
            key={l}
            type="button"
            disabled={desabilitado || jaTentada}
            // Usamos onClick e também onMouseDown para forçar o disparo imediato em qualquer navegador
            onClick={(e) => {
              e.preventDefault();
              if (!desabilitado && !jaTentada) {
                onLetra(l);
              }
            }}
            style={{
              width: '36px',
              height: '42px',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '6px',
              border: 'none',
              outline: 'none',
              cursor: desabilitado || jaTentada ? 'not-allowed' : 'pointer',
              backgroundColor: jaTentada ? '#e2e8f0' : '#f43f5e',
              color: jaTentada ? '#94a3b8' : '#ffffff',
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}