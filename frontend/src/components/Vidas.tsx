type VidasProps = {
  vidas: number;
};

export function Vidas({ vidas }: VidasProps) {
  return (
    <div className="vidas-container">
      <span>Vidas restantes: </span>
      <strong>{'❤️'.repeat(vidas)}{'🤍'.repeat(6 - vidas)}</strong> ({vidas}/6)
    </div>
  );
}