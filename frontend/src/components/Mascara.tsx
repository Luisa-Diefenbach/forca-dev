type MascaraProps = {
  mascara: string;
};

export function Mascara({ mascara }: MascaraProps) {
  const formatada = mascara.split('').join(' ');
  return (
    <div className="mascara-container" style={{ fontSize: '2rem', letterSpacing: '4px', margin: '20px 0' }}>
      <code>{formatada}</code>
    </div>
  );
}