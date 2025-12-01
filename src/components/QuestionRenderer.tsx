import { Question, UserAnswers } from '../types/questions';
import QuestionMultipleChoice from './QuestionMultipleChoice';
import QuestionTrueFalse from './QuestionTrueFalse';
import QuestionAlternative from './QuestionAlternative';
import QuestionTextInput from './QuestionTextInput';

interface QuestionRendererProps {
  question: Question;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: any) => void;
  showResults?: boolean;
}

function QuestionRenderer({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <QuestionMultipleChoice
          question={question}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
          showResults={showResults}
        />
      );
    case 'true-false':
      return (
        <QuestionTrueFalse
          question={question}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
          showResults={showResults}
        />
      );
    case 'alternative':
      return (
        <QuestionAlternative
          question={question}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
          showResults={showResults}
        />
      );
    case 'text-input':
      return (
        <QuestionTextInput
          question={question}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
          showResults={showResults}
        />
      );
    default:
      return null;
  }
}

export default QuestionRenderer;

