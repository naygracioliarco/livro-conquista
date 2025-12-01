import { TextInputQuestion, UserAnswers } from '../types/questions';

interface QuestionTextInputProps {
  question: TextInputQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

function QuestionTextInput({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionTextInputProps) {
  const userAnswer = (userAnswers[question.id] as string) || '';

  // Se tiver subquestões, renderiza o formato com número e letras
  if (question.subQuestions && question.subQuestions.length > 0) {
    return (
      <div className="mb-6">
        {/* Título principal com número */}
        <p className="mb-4">
          {question.number !== undefined && (
            <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          <span style={{ color: 'black' }}>{question.question}</span>
        </p>
        
        {/* Subquestões */}
        <div className="space-y-4">
          {question.subQuestions.map((subQ) => {
            const subQuestionId = `${question.id}_${subQ.letter}`;
            const subUserAnswer = (userAnswers[subQuestionId] as string) || '';
            
            return (
              <div key={subQ.letter} className="mb-4">
                <p className="mb-2">
                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                  <span style={{ color: 'black' }}>{subQ.question}</span>
                </p>
                <textarea
                  value={subUserAnswer}
                  onChange={(e) => onAnswerChange(subQuestionId, e.target.value)}
                  placeholder={subQ.placeholder || 'Digite sua resposta aqui...'}
                  disabled={showResults}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px] text-black"
                  style={{
                    fontFamily: 'inherit',
                  }}
                />
                {showResults && subQ.correctAnswer && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                    <p className="font-semibold text-gray-700 mb-1">Resposta esperada:</p>
                    <p className="text-gray-600">{subQ.correctAnswer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Formato simples (sem subquestões)
  return (
    <div className="mb-6 p-4 rounded-lg">
      <p className="mb-4">
        {question.number !== undefined && (
          <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
        )}
        <span style={{ color: 'black' }}>{question.question}</span>
      </p>
      <textarea
        value={userAnswer}
        onChange={(e) => onAnswerChange(question.id, e.target.value)}
        placeholder={question.placeholder || 'Digite sua resposta aqui...'}
        disabled={showResults}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] text-black"
        style={{
          fontFamily: 'inherit',
        }}
      />
      {showResults && question.correctAnswer && (
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-1">Resposta esperada:</p>
          <p className="text-sm text-gray-600">{question.correctAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionTextInput;

