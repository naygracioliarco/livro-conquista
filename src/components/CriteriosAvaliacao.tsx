import { UserAnswers } from '../types/questions';

interface Criterio {
  id: string;
  nome: string;
  pergunta: string;
}

interface CriteriosAvaliacaoProps {
  title?: string;
  instanceId: string; // ID único para esta instância da tabela
  criterios: Criterio[];
  userAnswers?: UserAnswers;
  onAnswerChange?: (criterioId: string, answer: boolean) => void;
}

function CriteriosAvaliacao({
  title = 'CRITÉRIOS DE AVALIAÇÃO',
  instanceId,
  criterios,
  userAnswers = {},
  onAnswerChange,
}: CriteriosAvaliacaoProps) {
  const handleAnswerChange = (criterioId: string, answer: boolean) => {
    if (onAnswerChange) {
      // Usa instanceId como prefixo para tornar o ID único
      const uniqueId = `${instanceId}_${criterioId}`;
      onAnswerChange(uniqueId, answer);
    }
  };

  return (
    <div className="my-6">
      <table
        className="w-full border-collapse"
        style={{
          border: '3px solid #0E3B5D',
          fontFamily: 'hwt-artz, sans-serif',
        }}
      >
        <thead>
          <tr>
            <th
            colSpan={2}
              className="p-3 text-left"
              style={{
                border: '3px solid #0E3B5D',
                backgroundColor: 'white',
                textAlign: 'center',
              }}
            ><h3
            className="mb-4 font-bold"
            style={{
              color: '#BF3154',
            }}
          >
            {title}
          </h3></th>
            
            <th
              className="p-3 text-center"
              style={{
                border: '3px solid #0E3B5D',
                backgroundColor: 'white',
              }}
            >
              <span style={{ fontSize: '24px' }}><img src="/images/iconeFeliz.png" alt="Sim" /></span>
            </th>
            <th
              className="p-3 text-center"
              style={{
                border: '3px solid #0E3B5D',
                backgroundColor: 'white',
              }}
            >
              <span style={{ fontSize: '24px' }}><img src="/images/iconeTriste.png" alt="Não" /></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {criterios.map((criterio) => {
            // Usa instanceId como prefixo para tornar o ID único
            const uniqueId = `${instanceId}_${criterio.id}`;
            const answer = userAnswers[uniqueId] as boolean | undefined;
            const isYes = answer === true;
            const isNo = answer === false;

            return (
              <tr key={criterio.id}>
                <td
                  className="p-3 font-semibold"
                  style={{
                    border: '3px solid #0E3B5D',
                    color: '#0E3B5D',
                    backgroundColor: 'white',
                    fontFamily: 'hwt-artz, sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {criterio.nome}
                </td>
                <td
                  className="p-3"
                  style={{
                    border: '3px solid #0E3B5D',
                    color: '#0E3B5D',
                    backgroundColor: 'white',
                    fontFamily: 'Ubuntu, sans-serif',
                  }}
                >
                  {criterio.pergunta}
                </td>
                <td
                  className="p-3 text-center"
                  style={{
                    border: '3px solid #0E3B5D',
                    backgroundColor: 'white',
                  }}
                >
                  <input
                    type="radio"
                    name={uniqueId}
                    checked={isYes}
                    onChange={() => handleAnswerChange(criterio.id, true)}
                    className="w-4 h-4"
                    style={{
                      accentColor: '#BF3154',
                    }}
                  />
                </td>
                <td
                  className="p-3 text-center"
                  style={{
                    border: '3px solid #0E3B5D',
                    backgroundColor: 'white',
                  }}
                >
                  <input
                    type="radio"
                    name={uniqueId}
                    checked={isNo}
                    onChange={() => handleAnswerChange(criterio.id, false)}
                    className="w-4 h-4"
                    style={{
                      accentColor: '#BF3154',
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CriteriosAvaliacao;

