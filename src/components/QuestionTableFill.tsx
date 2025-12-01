import { UserAnswers } from '../types/questions';

interface TableRow {
  id: string;
  paragraph: string;
  text1?: string;
  text2?: string;
}

interface QuestionTableFillProps {
  questionId: string;
  title?: string;
  number?: number;
  columns: string[];
  rows: TableRow[];
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
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionTableFillProps) {
  return (
    <div className="mb-6 text-center">
      {title && (
        <p className="mb-4 font-semibold" style={{ color: 'black' }}>
          {number !== undefined && (
            <span style={{ color: '#00776E', fontWeight: 'bold' }}>{number}. </span>
          )}
          <span style={{ color: 'black' }}>{title}</span>
        </p>
      )}
      <div className="overflow-x-auto">
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
            {rows.map((row) => (
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
                  {row.paragraph}
                </td>
                {columns.slice(1).map((_, colIndex) => {
                  const fieldId = `${questionId}_${row.id}_col${colIndex + 1}`;
                  const fieldValue = colIndex === 0 ? row.text1 : row.text2;
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuestionTableFill;

