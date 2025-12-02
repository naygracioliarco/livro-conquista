import { UserAnswers } from '../types/questions';

interface TableRow {
  id: string;
  [key: string]: string | undefined; // Permite campos dinâmicos
}

interface SubQuestion {
  letter: string;
  question: string;
  placeholder?: string;
  correctAnswer?: string;
}

interface QuestionTableFillProps {
  questionId: string;
  title?: string;
  number?: number;
  columns: string[];
  rows: TableRow[];
  subQuestions?: SubQuestion[];
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, fieldId: string, answer: string) => void;
  showResults?: boolean;
}

function QuestionTableFill({
  questionId,
  title,
  number,
  columns,
  rows,
  subQuestions,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionTableFillProps) {
  return (
    <div className="mb-6">
      {title && (
        <p className="mb-4 font-semibold text-left" style={{ color: 'black' }}>
          {number !== undefined && (
            <span style={{ color: '#00776E', fontWeight: 'bold' }}>{number}. </span>
          )}
          <span style={{ color: 'black' }}>{title}</span>
        </p>
      )}
      <div className="overflow-x-auto mb-6">
        <table
          className="w-full border-collapse"
          style={{
            border: '3px solid #0E3B5D',
          }}
        >
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="p-3 text-center font-semibold"
                  style={{
                    border: '1px solid #0E3B5D',
                    backgroundColor: 'white',
                    color: '#0E3B5D',
                    fontFamily: 'Ubuntu, sans-serif',
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              // Obtém o primeiro campo da row (primeira coluna) - pode ser 'paragraph' ou qualquer outro nome
              const firstColumnKey = Object.keys(row).find(key => key !== 'id') || 'paragraph';
              const firstColumnValue = row[firstColumnKey] || '';
              
              return (
                <tr key={row.id}>
                  <td
                    className="p-3 font-semibold"
                    style={{
                      border: '1px solid #0E3B5D',
                      backgroundColor: 'white',
                      color: '#0E3B5D',
                      fontFamily: 'Ubuntu, sans-serif',
                    }}
                  >
                    {firstColumnValue}
                  </td>
                  {columns.slice(1).map((_, colIndex) => {
                    const fieldId = `${questionId}_${row.id}_col${colIndex + 1}`;
                    // Acessa os campos dinamicamente: text1, text2, etc. ou qualquer outro nome
                    const fieldKeys = Object.keys(row).filter(key => key !== 'id' && key !== firstColumnKey);
                    const fieldValue = fieldKeys[colIndex] ? row[fieldKeys[colIndex]] : '';
                    const userAnswer = (userAnswers[fieldId] as string) || fieldValue || '';
                    
                    return (
                      <td
                        key={colIndex}
                        className="p-3"
                        style={{
                          border: '1px solid #0E3B5D',
                          backgroundColor: 'white',
                        }}
                      >
                        <textarea
                          value={userAnswer}
                          onChange={(e) => onAnswerChange(questionId, fieldId, e.target.value)}
                          placeholder="Digite aqui..."
                          disabled={showResults}
                          className="w-full p-2 border-0 rounded focus:outline-none resize-y min-h-[60px]"
                          style={{
                            fontFamily: 'Ubuntu, sans-serif',
                            color: '#0E3B5D',
                            backgroundColor: 'transparent',
                            border: 'none',
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Subquestões */}
      {subQuestions && subQuestions.length > 0 && (
        <div className="space-y-4">
          {subQuestions.map((subQ) => {
            const subQuestionId = `${questionId}_${subQ.letter}`;
            const subUserAnswer = (userAnswers[subQuestionId] as string) || '';
            
            return (
              <div key={subQ.letter} className="mb-4">
                <p className="mb-2">
                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                  <span style={{ color: 'black' }}>{subQ.question}</span>
                </p>
                <textarea
                  value={subUserAnswer}
                  onChange={(e) => onAnswerChange(questionId, subQuestionId, e.target.value)}
                  placeholder={subQ.placeholder || 'Digite sua resposta aqui...'}
                  disabled={showResults}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px] text-black"
                  style={{
                    fontFamily: 'Ubuntu, sans-serif',
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuestionTableFill;

