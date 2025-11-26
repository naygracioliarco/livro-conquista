import { TrueFalseQuestion, UserAnswers } from '../types/questions';

interface QuestionTrueFalseProps {
  question: TrueFalseQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: boolean) => void;
  showResults?: boolean;
}

function QuestionTrueFalse({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionTrueFalseProps) {
  const selectedAnswer = userAnswers[question.id];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <p className="font-semibold text-slate-800 mb-4">{question.question}</p>
      <div className="flex gap-4">
        {[true, false].map((value) => {
          const label = value ? 'Verdadeiro' : 'Falso';
          const isSelected = selectedAnswer === value;

          return (
            <label
              key={String(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-colors ${
                isSelected
                  ? showResults && isCorrect
                    ? 'bg-green-200 border-2 border-green-600 text-green-800 font-semibold'
                    : showResults && !isCorrect
                    ? 'bg-red-200 border-2 border-red-600 text-red-800 font-semibold'
                    : 'bg-purple-200 border-2 border-purple-600 text-purple-900 font-semibold'
                  : 'bg-white hover:bg-gray-100 border-2 border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={String(value)}
                checked={selectedAnswer === value}
                onChange={() => onAnswerChange(question.id, value)}
                className="w-4 h-4"
                disabled={showResults}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      {showResults && selectedAnswer !== question.correctAnswer && (
        <p className="mt-3 text-sm text-red-600">
          Resposta correta: <strong>{question.correctAnswer ? 'Verdadeiro' : 'Falso'}</strong>
        </p>
      )}
    </div>
  );
}

export default QuestionTrueFalse;
