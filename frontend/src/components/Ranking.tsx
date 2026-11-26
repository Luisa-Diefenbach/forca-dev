// frontend/src/components/Ranking.tsx
type RankingItem = {
  id: string;
  jogador: string;
  pontos: number;
  palavra: string;
  finalizadaEm: string;
};

type RankingProps = {
  ranking: RankingItem[];
};

export function Ranking({ ranking }: RankingProps) {
  return (
    <div style={{ margin: '30px auto', maxWidth: '650px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h3 style={{ textAlign: 'center', color: '#831843', fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
        Top 10 Ranking
      </h3>
      
      {ranking.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#9d174d', fontSize: '14px' }}>Nenhuma vitória registrada ainda.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(219, 39, 119, 0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#fce7f3', color: '#831843', textAlign: 'left', fontSize: '14px' }}>
              <th style={{ padding: '12px' }}>Jogador</th>
              <th style={{ padding: '12px' }}>Pontos</th>
              <th style={{ padding: '12px' }}>Palavra</th>
              <th style={{ padding: '12px' }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #fdf2f8', fontSize: '14px', color: '#4b5563' }}>
                <td style={{ padding: '12px', fontWeight: '500', color: '#1f2937' }}>{item.jogador}</td>
                <td style={{ padding: '12px' }}>{item.pontos}</td>
                <td style={{ padding: '12px', fontWeight: '600', color: '#db2777' }}>{item.palavra}</td>
                <td style={{ padding: '12px' }}>{item.finalizadaEm ? new Date(item.finalizadaEm).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}