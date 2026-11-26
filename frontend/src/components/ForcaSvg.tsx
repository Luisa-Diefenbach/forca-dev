// frontend/src/components/ForcaSvg.tsx
type ForcaSvgProps = {
  erros: number;
};

export function ForcaSvg({ erros }: ForcaSvgProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
      <svg width="120" height="140" viewBox="0 0 120 140" stroke="#2c3e50" strokeWidth="4" fill="none" strokeLinecap="round">
        {/* Estrutura da Forca */}
        <line x1="10" y1="130" x2="90" y2="130" /> {/* Base */}
        <line x1="30" y1="130" x2="30" y2="10" />  {/* Poste vertical */}
        <line x1="30" y1="10" x2="80" y2="10" />   {/* Trave horizontal */}
        <line x1="80" y1="10" x2="80" y2="30" />   {/* Corda */}

        {/* Partes do Boneco (aparecem baseadas no número de erros de 1 a 6) */}
        {erros >= 1 && <circle cx="80" cy="45" r="10" />}                    {/* Cabeça */}
        {erros >= 2 && <line x1="80" y1="55" x2="80" y2="90" />}             {/* Tronco */}
        {erros >= 3 && <line x1="80" y1="65" x2="60" y2="80" />}             {/* Braço esquerdo */}
        {erros >= 4 && <line x1="80" y1="65" x2="100" y2="80" />}            {/* Braço direito */}
        {erros >= 5 && <line x1="80" y1="90" x2="65" y2="115" />}            {/* Perna esquerda */}
        {erros >= 6 && <line x1="80" y1="90" x2="95" y2="115" />}            {/* Perna direita */}
      </svg>
    </div>
  );
}