function DataTable() {
  const data = [
    { ano: '3000 a.C.', evento: 'Invenção da escrita', local: 'Mesopotâmia' },
    { ano: '1440', evento: 'Prensa de tipos móveis', local: 'Alemanha' },
    { ano: '1971', evento: 'Primeiro e-mail enviado', local: 'Estados Unidos' },
    { ano: '1989', evento: 'Criação da World Wide Web', local: 'Suíça' },
    { ano: '2007', evento: 'Lançamento do smartphone moderno', local: 'Estados Unidos' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-slate-700 text-white">
            <th className="py-3 px-4 text-left font-semibold">Ano</th>
            <th className="py-3 px-4 text-left font-semibold">Evento</th>
            <th className="py-3 px-4 text-left font-semibold">Local</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-slate-200 ${
                index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
              } hover:bg-slate-100 transition-colors`}
            >
              <td className="py-3 px-4 font-medium text-slate-800">{row.ano}</td>
              <td className="py-3 px-4 text-slate-700">{row.evento}</td>
              <td className="py-3 px-4 text-slate-600">{row.local}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
