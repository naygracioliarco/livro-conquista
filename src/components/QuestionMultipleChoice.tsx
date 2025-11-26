import { MultipleChoiceQuestion, UserAnswers } from '../types/questions';

interface QuestionMultipleChoiceProps {
  question: MultipleChoiceQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: 'a' | 'b' | 'c') => void;
  showResults?: boolean;
}

function QuestionMultipleChoice({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionMultipleChoiceProps) {
  const selectedAnswer = userAnswers[question.id];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p className="font-semibold text-slate-800 mb-4">{question.question}</p>
      <div className="space-y-3">
        {(['a', 'b', 'c'] as const).map((option) => (
          <label
            key={option}
            className={`flex items-center gap-3 p-3 rounded cursor-pointer transition-colors ${
              selectedAnswer === option
                ? 'bg-blue-100 border-l-4 border-blue-600'
                : 'bg-white hover:bg-blue-50'
            } ${
              showResults && selectedAnswer === option
                ? isCorrect
                  ? 'border-l-4 border-green-600 bg-green-50'
                  : 'border-l-4 border-red-600 bg-red-50'
                : ''
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => onAnswerChange(question.id, e.target.value as 'a' | 'b' | 'c')}
              className="w-4 h-4"
              disabled={showResults}
            />
            <span className="text-slate-700">
              <strong>{option.toUpperCase()})</strong> {question.options[option]}
            </span>
            {showResults && selectedAnswer === option && (
              <span className={`ml-auto text-sm font-semibold ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}>
                {isCorrect ? '✓ Correto' : '✗ Incorreto'}
              </span>
            )}
          </label>
        ))}
      </div>
      {showResults && selectedAnswer !== question.correctAnswer && (
        <p className="mt-3 text-sm text-red-600">
          Resposta correta: <strong>{question.correctAnswer.toUpperCase()})</strong>
        </p>
      )}
    </div>
  );
}

export default QuestionMultipleChoice;
